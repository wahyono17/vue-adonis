'use strict'

/*
|--------------------------------------------------------------------------
| AccountSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class AccountSeeder {
  async run () {
    const user = await Factory
      .model('App/Models/Account')
      .createMany(1)
  }
}

module.exports = AccountSeeder
