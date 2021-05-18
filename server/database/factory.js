'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')


Factory.blueprint('App/Models/Product', (faker) => {
  return {
    store_id:1,
    name: faker.username(),
    description: faker.sentence(),
    price:10000,
    patungan_price:7000,
    unit:"kilogram",
    quota_patungan:20,
  }
})

