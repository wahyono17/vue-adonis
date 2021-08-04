'use strict'

const Product = use('App/Models/Product');
const Database = use('Database');

class OrderController {
    async orderById({params}){
        const id  = params.id;
        const product = Product.find(id);
        return product;
    }
}

module.exports = OrderController