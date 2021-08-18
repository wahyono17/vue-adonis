'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.table('orders', (table) => {
      // alter table
      table.dropColumn('basket_id')
      table.integer('uniq_payment').after('sub_total')
    })
  }

  down () {
    this.table('orders', (table) => {
      // reverse alternations
    })
  }
}

module.exports = OrderSchema
