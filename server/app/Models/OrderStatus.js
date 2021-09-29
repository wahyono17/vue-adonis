'use strict'

const Model = use('Model')

class OrderStatus extends Model {
    static get table () {
      return 'order_statuses'
    }
}

module.exports = OrderStatus