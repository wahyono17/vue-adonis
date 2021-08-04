'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BasketSchema extends Schema {
  up () {
    this.alter('baskets', (table) => {
      // alter table
      table.dropColumn('patungan_price')
      table.dropColumn('unit')
      table.dropColumn('amount')
    })
  }

  down () {
    this.alter('baskets', (table) => {
      // reverse alternations
    })
  }
}

module.exports = BasketSchema
