// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
    public async login({ request, auth }) {
        const email = request.input('email')
        const password = request.input('password')

        const token = await auth
            .use('api') // 👈 using API guard
            .attempt(email, password)

        return token
    }

    public async register({request,auth,response}){
        const { email, password, confirm_password } = request.all();

        const newPostSchema = schema.create({
            email: schema.string({},[
                rules.email()
            ]),
            password: schema.string({}),
            confirm_password: schema.string({}),
        })

        /**
         * Validate request body against the schema
         */
        await request.validate({ schema: newPostSchema })

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
        });

        auth.use("api").login(email,password);
        return response.status(200).json({message:"register berhasil"});
    }
}
