'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfilesSchema extends Schema {
  up () {
    this.table('profiles', (table) => {
      // alter table
      table.integer('as_id').default('1').after('address');//1 buyer 2 seller
    })
  }

  down () {
    this.table('profiles', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ProfilesSchema
