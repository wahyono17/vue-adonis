'use strict'

const Model = use('Model')

class Province extends Model {
    static get table () {
      return 'provinces'
    }
}

module.exports = Province