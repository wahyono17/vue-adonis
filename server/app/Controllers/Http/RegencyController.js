'use strict'

const Regency = use('App/Models/Regency');
const Database = use('Database');

class RegencyController {
    async index({params,request}){
        const id  = params.id;
        return await Regency.query().select(['regency_id','province_id','name']).where('province_id',id).fetch();
    }
}

module.exports = RegencyController
