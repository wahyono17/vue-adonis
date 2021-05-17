'use strict'

const Product = use('App/Models/Product');
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

        return "done";

    }

}

module.exports = ProductController