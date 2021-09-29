'use strict'

const Account = use('App/Models/Account');

class AccountController {
    async index(){
        return await Account.query().select(['id','bank','name','number']).fetch();
    }
}

module.exports = AccountController
