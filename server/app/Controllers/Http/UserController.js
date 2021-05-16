'use strict'

const User = use('App/Models/User');
const { validate } = use('Validator');

class UserController {

  async login({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }

  async register({ request,response }) {
    const { email, password, confirm_password } = request.all();

    const rules = {
      email: 'required|email',
      password: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return response.status(406).json({message:validation.messages()[0]});
    }

    //jika password tidak sama maka tidak bisa
    if(password != confirm_password){
      return response.status(406).json({message:"password tidak sama"});
    }

    //cek jika sudah ada user dengan nama itu maka kirim error exception
    let result = await User.query().where('username',email).first();
    if(result != null && result.username == email){
      return response.status(406).json({message:"email sudah di pakai"});
    }

    await User.create({
      email,
      password,
      username: email,
    });
    return this.login(...arguments);
  }
}

module.exports = UserController
