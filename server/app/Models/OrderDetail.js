'use strict'

const Model = use('Model')

class OrderDetail extends Model {
    static get table () {
      return 'order_details'
    }
}

module.exports = OrderDetail