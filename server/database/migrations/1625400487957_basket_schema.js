'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BasketSchema extends Schema {
  up () {
    this.create('baskets', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('store_id').unsigned().references('id').inTable('users')
      table.integer('product_id')
      table.integer('qty')
      table.float('patungan_price')
      table.string('unit',50)
      table.float('amount')
      table.tinyint('make_order')
      table.datetime('deleted_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('baskets')
  }
}

module.exports = BasketSchema
