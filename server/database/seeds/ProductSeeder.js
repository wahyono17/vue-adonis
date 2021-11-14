'use strict'

/*
|--------------------------------------------------------------------------
| ProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ProductSeeder {
  async run () {
    const user = await Factory
      .model('App/Models/Product')
      .createMany(50)
  }
}

module.exports = ProductSeeder
