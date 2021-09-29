'use strict'

const DatabaseFactory = require('@adonisjs/lucid/src/Factory/DatabaseFactory')

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Account = use('App/Models/Account');

class FillAccountSchema extends Schema {
  up () {
    Account.create({
      bank:"BCA",
      name:"wahyono test",
      number:"090876321333"
    })
    Account.create({
      bank:"BNI",
      name:"wahyono test",
      number:"090876321333"
    })
    Account.create({
      bank:"MANDIRI",
      name:"wahyono test",
      number:"12376321333"
    })
  }

  down () {
    this.table('fill_accounts', (table) => {
      // reverse alternations
    })
  }
}

module.exports = FillAccountSchema
