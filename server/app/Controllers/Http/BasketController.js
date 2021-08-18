'use strict'

const Basket = use('App/Models/Basket');
const Database = use('Database');

class BasketController {
    async index({auth}){
        const user = await auth.getUser();
        return await user.baskets()
                .select(['baskets.*','users.username as store_name','products.name','products.unit'
                ,'products.patungan_price','products.description',Database.raw('baskets.qty * products.patungan_price as total')])
                .join('users','baskets.store_id','=','users.id')
                .join('products','baskets.product_id','=','products.id')
                .where('make_order',null)
                .where('baskets.deleted_at',null)
                .orderBy('baskets.store_id')
                .orderBy('baskets.id')
                .fetch();
    }

    async countBasket({auth, response}){
        const user = await auth.getUser();
        const data = await user.baskets()
                .where('make_order',null)
                .where('deleted_at',null)
                .count();
        const count =  data[0]['count(*)'];

        return response.status(200).json({count_basket:count});        
    }

    async create({auth, request, response}){
        const {store_id,product_id,qty} = request.all();
        const user = await auth.getUser();

        Basket.create({
            user_id:user.id,
            store_id:store_id,
            product_id:product_id,
            qty:qty
        });

        return response.status(201).json({message:"penambahan ke basket berhasil"});
    }

    async destroy({auth,params,response}){
        const user = await auth.getUser();
        const {id} = params

        const basket = await user.baskets().where('id',id).first()

        const time = new Date(Date.now());
        basket.deleted_at = time;
        basket.save();
        
        return response.status(200).json({message:"hapus basket berhasil"});
    }
}

module.exports = BasketController