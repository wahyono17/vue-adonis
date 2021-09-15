'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountSchema extends Schema {
  up () {
    this.create('accounts', (table) => {
      table.increments()
      table.string('bank')
      table.string('name')
      table.string('number')
      table.timestamps()
    })
  }

  down () {
    this.drop('accounts')
  }
}

module.exports = AccountSchema
