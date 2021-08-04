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
    const { username,email, password, confirm_password } = request.all();

    const rules = {
      username: 'required',
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

    //cek jika sudah ada email dengan nama itu maka kirim error exception
    let result = await User.query().where('email',email).first();
    if(result != null && result.email == email){
      return response.status(406).json({message:"email sudah di pakai"});
    }

    await User.create({
      email,
      password,
      username,
    });
    return this.login(...arguments);
  }
}

module.exports = UserController
