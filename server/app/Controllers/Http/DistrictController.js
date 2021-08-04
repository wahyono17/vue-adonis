'use strict'

const District = use('App/Models/District');
const Database = use('Database');

class DistrictController {
    async index({params,request}){
        const id  = params.id;
        return await District.query().select(['district_id','regency_id','name']).where('regency_id',id).fetch();
    }
}

module.exports = DistrictController
