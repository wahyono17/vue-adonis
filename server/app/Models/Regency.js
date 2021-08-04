'use strict'

const Model = use('Model')

class Regency extends Model {
    static get table () {
        return 'regencies'
    }
}

module.exports = Regency