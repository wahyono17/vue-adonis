'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const OrderStatus = use('App/Models/OrderStatus')

class FillOrderStatusSchema extends Schema {
  async up () {
    // this.table('fill_order_statuses', (table) => {
    //   // alter table
    // })
    let arr = [
      {id:1,name:"Belum dibayar"},
      {id:2,name:"Dibayar"},
      {id:3,name:"Konfirmasi"},
      {id:4,name:"Siap diambil"},
      {id:5,name:"Selesai"},
    ]
    for(let i in arr){
      let each = arr[i]

      await OrderStatus.create({
        status_id:each.id,
        name:each.name
      })
    }
    
  }

  down () {
    this.table('fill_order_statuses', (table) => {
      // reverse alternations
    })
  }
}

module.exports = FillOrderStatusSchema
