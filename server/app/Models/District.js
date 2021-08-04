'use strict'

const Model = use('Model')

class District extends Model {
    static get table () {
        return 'districts'
    }
}

module.exports = District