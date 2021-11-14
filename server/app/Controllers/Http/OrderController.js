'use strict'

const Order = use('App/Models/Order');
const OrderDetail = use('App/Models/OrderDetail');
const Basket = use('App/Models/Basket');
const Profile = use('App/Models/Profile');
const Database = use('Database');

class OrderController {
    async changeStatus({auth,request,response}){
        const user = await auth.getUser();
        const {id,next_status} = request.all();

        //cari berdasarkan id
        const order = await Order.query()
                .where('user_id',user.id)
                .where('deleted_at',null)
                .where('id',id)
                .first();

        order.status_id = next_status
        order.save()

        return response.status(200).json({message:"Berhasil"});
    }

    async countOrders({auth, response}){
        const user = await auth.getUser();

        //cek ke table profile
        const profile = await await Profile.query()
                .where('user_id',user.id)
                .first()
        let arr_status = [];
        if(profile!=null && profile.as_id==1){
            arr_status = [1,2,3];//dibuat,dibayar,konfirmasi
        }else arr_status = [2,4];//dibayar,siap diambil

        const data = await Order.query()
                .where('user_id',user.id)
                .where('deleted_at',null)
                .whereIn('status_id',arr_status)
                .count();

        const count =  data[0]['count(*)'];
        return response.status(200).json({count_orders:count});
    }

    async countReady({auth, response}){
        const user = await auth.getUser();
        const data = await Order.query()
                .where('user_id',user.id)
                .where('deleted_at',null)
                .where('status_id',4)//untuk sementara 123 dulu
                .count();

        const count =  data[0]['count(*)'];
        return response.status(200).json({count_orders:count});
    }

    async createFromBasket({auth,request,response}){
        const user = await auth.getUser();
        let arr = request.all();

        let store_id = 0;
        const arr_store = [];
        let totalOrder = 0;
        for(let i in arr){
            let header = arr[i];

            //jika store id tdk sama dengan yg ada di looping maka buat order baru
            if(store_id != header.store_id){
                const order = await Order.create({
                    user_id:user.id,
                    store_id:header.store_id,
                });

                arr_store.push({
                    "store_id" : header.store_id,
                    "order_id" : order.id
                });
                store_id = header.store_id;
                totalOrder ++;
            }
        }

        //buat order detailnya
        for(let a in arr_store){
            let amount = 0;
            for(let b in arr){
                if(arr_store[a].store_id == arr[b].store_id){
                    const order_detail = await OrderDetail.create({
                      order_id : arr_store[a].order_id,
                      product_id : arr[b].product_id,
                      qty : arr[b].qty,
                      patungan_price : arr[b].patungan_price,
                      unit : arr[b].unit,
                      amount : arr[b].total
                    });

                    //update basket
                    const basket = await Basket.find(arr[b].id);
                    basket.make_order = 1;
                    basket.save();

                    amount += order_detail.amount;
                }
            }

            //masukan nilai total amount
            arr_store[a].amount = amount;
        }

        // update ke sales header
        for(let i in arr_store){
            const order = await Order.find(arr_store[i].order_id);
            let base_uniq = 900
            if(arr_store[i].amount < 10000){
                base_uniq = 400;
            }
            const uniq = base_uniq + order.id + order.user_id;

            order.sub_total = arr_store[i].amount;
            order.uniq_payment = uniq;
            order.status_id = 1;//1 adalah pertam order di buat
            order.save();
        }

        return response.status(201).json({
            addOrder:totalOrder,
            message:"pesanan berhasil dibuat"
        });
    }

    async groupOrder({auth}){
        const user = await auth.getUser();

        //cek ke table profile
        const profile = await await Profile.query()
                .where('user_id',user.id)
                .first()

        if(profile != null && profile.as_id==2){
            return await Order.query()
                .select(['status_id'])
                .where('orders.user_id',user.id)
                .where('orders.deleted_at',null)
                .whereIn('orders.status_id',[2,3,4,5])
                .groupBy('status_id')
                .orderBy('status_id')
                .first();
        }else{
            return await Order.query()
                .select(['status_id'])
                .where('orders.user_id',user.id)
                .where('orders.deleted_at',null)
                .whereIn('orders.status_id',[1,2,3,4,5])
                .groupBy('status_id')
                .orderBy('status_id')
                .first();
        }


    }

    async indexForBuyer(request,user){
        const status = request.input('status',1);//1 dibuat

        const result =  await Order.query()
                    .select(['orders.*','users.username as store_name'
                    ,Database.raw('sub_total + uniq_payment as payment_amount')
                    ,Database.raw('concat(profiles.address," ",districts.name," ",regencies.name," ",provinces.name) as address')
                    ,'order_statuses.name as order_status'
                    ])
                    .join('users','orders.store_id','users.id')
                    .leftJoin('order_statuses','orders.status_id','order_statuses.status_id')
                    .leftJoin('profiles','orders.store_id','profiles.user_id')
                    .leftJoin('districts','profiles.district_id','districts.district_id')
                    .leftJoin('regencies','districts.regency_id','regencies.regency_id')
                    .leftJoin('provinces','regencies.province_id','provinces.provincy_id')
                    .where('orders.user_id',user.id)
                    .where('orders.status_id',status)
                    .where('orders.deleted_at',null)
                    .fetch();
                    // .paginate(page, limit);

        //hitung subtotalnya
        const subtotal = await Order.query()
                    .select(['status_id as id'
                    ,Database.raw('CASE WHEN status_id = 1 THEN "Belum dibayar" WHEN status_id = 2 THEN "Dibayar" WHEN status_id = 3 THEN "Konfirmasi" WHEN status_id = 4 THEN "Siap diambil" WHEN status_id = 5 THEN "Selesai" END as name')
                    ,Database.raw('count(orders.id) as count')
                    ])
                    .join('users','orders.store_id','users.id')
                    .where('orders.user_id',user.id)
                    .where('orders.deleted_at',null)
                    .whereIn('orders.status_id',[1,2,3,5]) //5 selesai 4 dikecualikan
                    .groupBy('status_id')
                    .get();

        return {
            data:result,
            tabs:subtotal
        }
    }

    async indexForSeller(request,user){
        const status = request.input('status',2);//2 dibayar

        const result =  await Order.query()
                    .select(['orders.*','users.username as store_name'
                    ,Database.raw('sub_total + uniq_payment as payment_amount')
                    ,Database.raw('concat(profiles.address," ",districts.name," ",regencies.name," ",provinces.name) as address')
                    ,'order_statuses.name as order_status'
                    ])
                    .join('users','orders.store_id','users.id')
                    .leftJoin('order_statuses','orders.status_id','order_statuses.status_id')
                    .leftJoin('profiles','orders.store_id','profiles.user_id')
                    .leftJoin('districts','profiles.district_id','districts.district_id')
                    .leftJoin('regencies','districts.regency_id','regencies.regency_id')
                    .leftJoin('provinces','regencies.province_id','provinces.provincy_id')
                    .where('orders.store_id',user.id)
                    .where('orders.status_id',status)
                    .where('orders.deleted_at',null)
                    .fetch();
                    // .paginate(page, limit);

        //hitung subtotalnya
        const subtotal = await Order.query()
                    .select(['status_id as id'
                    ,Database.raw('CASE WHEN status_id = 1 THEN "Belum dibayar" WHEN status_id = 2 THEN "Dibayar" WHEN status_id = 3 THEN "Konfirmasi" WHEN status_id = 4 THEN "Siap diambil" WHEN status_id = 5 THEN "Selesai" END as name')
                    ,Database.raw('count(orders.id) as count')
                    ])
                    .join('users','orders.store_id','users.id')
                    .where('orders.store_id',user.id)
                    .where('orders.deleted_at',null)
                    .whereIn('orders.status_id',[2,3,4,5]) //dibayar,konfirmasi,siap diambil,selesai
                    .groupBy('status_id')
                    .get();

        return {
            data:result,
            tabs:subtotal
        }
    }

    async index({auth,request,response}){
        const user = await auth.getUser();

        //cek ke table profile
        const profile = await await Profile.query()
                .where('user_id',user.id)
                .first()

        if(profile != null && profile.as_id==2){
            // return "disini";
            return this.indexForSeller(request,user);
        }else{
            // return "disitu";
            return this.indexForBuyer(request,user);
        }
    }

    async detail({auth,params}){
        const user = await auth.getUser();
        const {id} = params

        return await OrderDetail.query()
            .select(['order_details.*','products.name'])
            .join('orders','order_details.order_id','orders.id')
            .join('products','order_details.product_id','=','products.id')
            .where('user_id',user.id)
            .where('order_id',id)
            .where('order_details.deleted_at',null)
            .fetch();
    }

    async destroy({auth,params,response}){
        const user = await auth.getUser();
        const {id} = params

        const order = await Order.query().where('id',id).where('user_id',user.id).where('status_id',1).first()

        if(order==null) return response.status(405).json({message:"anda tidak dijinkan untuk melakukan transaksi ini"});

        const time = new Date(Date.now());
        order.deleted_at = time;
        order.save();

        return response.status(200).json({message:"hapus pesanan berhasil"});
    }
}

module.exports = OrderController