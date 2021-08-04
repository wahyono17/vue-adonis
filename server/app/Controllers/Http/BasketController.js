'use strict'

const Basket = use('App/Models/Basket');
const Database = use('Database');

class BasketController {
    async index({auth}){
        const user = await auth.getUser();
        return await user.baskets()
                .where('make_order',null)
                .where('deleted_at',null)
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
}

module.exports = BasketController