'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.integer('store_id').unsigned().references('id').inTable('users')
      table.string('name',100)
      table.string('description',255)
      table.float('price')
      table.float('patungan_price')
      table.string('unit',50)
      table.integer('quota_patungan')
      table.datetime('deleted_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
