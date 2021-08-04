'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DistrictSchema extends Schema {
  up () {
    this.create('districts', (table) => {
      table.increments()
      table.integer('district_id')
      table.integer('regency_id')
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('districts')
  }
}

module.exports = DistrictSchema
