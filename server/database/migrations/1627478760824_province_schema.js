'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProvinceSchema extends Schema {
  up () {
    this.create('provinces', (table) => {
      table.increments()
      table.integer('provincy_id')
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('provinces')
  }
}

module.exports = ProvinceSchema
