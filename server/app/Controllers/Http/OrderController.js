'use strict'

const Order = use('App/Models/Order');
const OrderDetail = use('App/Models/OrderDetail');
const Basket = use('App/Models/Basket');
const Database = use('Database');

class OrderController {
    async createFromBasket({auth,request,response}){
        const user = await auth.getUser();
        let arr = request.all();

        let store_id = 0;
        const arr_store = [];
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
            order.save();
        }

        return response.status(201).json({message:"pesanan berhasil dibuat"});
    }

    async index({auth,request,response}){
        const user = await auth.getUser();

        return await Order.query()
                    .select(['orders.*','users.username as store_name',Database.raw('sub_total + uniq_payment as payment_amount')])
                    .join('users','orders.store_id','users.id')
                    .where('user_id',user.id)
                    .fetch();
    }
}

module.exports = OrderController