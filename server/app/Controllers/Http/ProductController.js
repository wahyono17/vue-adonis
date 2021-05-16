'use strict'

const Project = use('App/Models/Product');
const { validate } = use('Validator');


class ProductController {
    async create({auth, request}){
        return "ok";
        const { name, description, price, patungan_price, unit, quantity, quota_patungan } = request.all();

        const rules = {
            name: 'required',
            description: 'required',
            price: 'required|number',
            patungan_price: 'required|number',
            unit: 'required',
            quantity: 'required|number',
            quantity_patungan: 'required|number',
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
        return response.status(406).json({message:validation.messages()[0]});
        }

        const user = await auth.getUser();
        return user.id;

    }
}

module.exports = ProductController