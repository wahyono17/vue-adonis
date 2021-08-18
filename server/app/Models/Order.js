'use strict'

const Model = use('Model')

class Order extends Model {
    details(){
        return this.hasMany('App/Models/OrderDetail')
    }
}

module.exports = Order