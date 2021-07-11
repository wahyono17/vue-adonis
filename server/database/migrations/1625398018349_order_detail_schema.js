'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderDetailSchema extends Schema {
  up () {
    this.create('order_details', (table) => {
      table.increments()
      table.integer('order_id')
      table.integer('product_id')
      table.integer('qty')
      table.float('patungan_price')
      table.string('unit',50)
      table.float('amount')
      table.datetime('deleted_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('order_details')
  }
}

module.exports = OrderDetailSchema
