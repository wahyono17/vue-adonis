'use strict'

const Province = use('App/Models/Province');
const Database = use('Database');

class ProvinceController {
    async index(){
        return await Province.query().select(['provincy_id','name']).fetch();
    }
}

module.exports = ProvinceController
