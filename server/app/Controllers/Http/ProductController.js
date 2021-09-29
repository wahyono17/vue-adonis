'use strict'

const Product = use('App/Models/Product');
const Database = use('Database');
const { validate } = use('Validator');


class ProductController {
    async create({auth, request, response}){
        const { name, description, price, patungan_price, unit, quota_patungan } = request.all();

        const rules = {
            name: 'required',
            description: 'required',
            price: 'required|number',
            patungan_price: 'required|number',
            unit: 'required',
            quota_patungan: 'required|number',
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.status(406).json({message:validation.messages()[0]});
        }

        const user = await auth.getUser();

        //jika sudah ada dengan nama yang sama maka reject
        let result = await Product.query().where('name',name).where('store_id',user.id).where('deleted_at',null).first();
        if(result != null && result.name == name){
            return response.status(406).json({message:"sudah ada product tersebut"});
        }

        //tulis ke database
        Product.create({
            store_id:user.id,
            name,
            description,
            price,
            patungan_price,
            unit,
            quota_patungan,
        });

        return response.status(201).json({message:"pembuatan product berhasil"});
    }

    async myProductIndex({auth,request,response}){
        const user = await auth.getUser();

        // const result = await Product.query().where('store_id',user.id).where('deleted_at',null)
        //         .forPage(1,10);

        const result = await Database.select([ 'products.*' ,Database.raw('concat("http://localhost:3333/images/aple.jpg") as images') ])
                .from('products')
                .where('store_id',user.id).where('deleted_at',null)
                .forPage(1,10);

        return result;
    }

    //ini adalah all product
    async index({request}){
        const {page} = request.all();

        const result = await Database
                .select([ 'products.*'
                ,Database.raw('concat("http://localhost:3333/images/aple.jpg") as images')
                ,'users.username as store_name'
                ,Database.raw('concat(profiles.address," ",districts.name," ",regencies.name," ",provinces.name) as address')
                ])
                .from('products')
                .leftJoin('users','products.store_id','users.id')
                .leftJoin('profiles','products.store_id','profiles.user_id')
                .leftJoin('districts','profiles.district_id','districts.district_id')
                .leftJoin('regencies','districts.regency_id','regencies.regency_id')
                .leftJoin('provinces','regencies.province_id','provinces.provincy_id')
                .where('deleted_at',null)
                .forPage(page,12);

        return result;
    }

    //ini adalah all product setelah login
    async indexAfterLogin({auth,request}){
        const user = await auth.getUser();
        const {page} = request.all();

        const result = await Database
                .select([ 'products.*'
                ,Database.raw('concat("http://localhost:3333/images/aple.jpg") as images')
                ,'users.username as store_name'
                ,Database.raw('concat(profiles.address," ",districts.name," ",regencies.name," ",provinces.name) as address')
                ])
                .from('products')
                .leftJoin('users','products.store_id','users.id')
                .leftJoin('profiles','products.store_id','profiles.user_id')
                .leftJoin('districts','profiles.district_id','districts.district_id')
                .leftJoin('regencies','districts.regency_id','regencies.regency_id')
                .leftJoin('provinces','regencies.province_id','provinces.provincy_id')
                .where('store_id','<>',user.id)
                .where('deleted_at',null)
                .forPage(page,12);

        return result;
    }

    //ini adalah product select untuk order
    async productById({params}){
        const id  = params.id;

        // const product = await Product.find(id);
        const product = await Database
            .select([ 'products.*'
            ,'users.username as store_name'
            ,Database.raw('concat(profiles.address," ",districts.name," ",regencies.name," ",provinces.name) as address')
            ])
            .from('products')
            .leftJoin('users','products.store_id','users.id')
            .leftJoin('profiles','products.store_id','profiles.user_id')
            .leftJoin('districts','profiles.district_id','districts.district_id')
            .leftJoin('regencies','districts.regency_id','regencies.regency_id')
            .leftJoin('provinces','regencies.province_id','provinces.provincy_id')
            .where('deleted_at',null)
            .where('products.id',id)
            .first();
        return product;
    }

}

module.exports = ProductController