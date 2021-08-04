'use strict'

const Profile = use('App/Models/Profile');
const Database = use('Database');
const { validate } = use('Validator');

class ProfileController {
    async profileById({auth,response}){
        const user = await auth.getUser();
        return await Profile.query()
            .select([
                'profiles.*','users.username'
                ,'districts.name as district_name'
                ,'regencies.regency_id','regencies.name as regency_name'
                ,'provinces.provincy_id','provinces.name as provice_name'
            ])
            .join('users','profiles.user_id','users.id')
            .leftJoin('districts','profiles.district_id','districts.district_id')
            .leftJoin('regencies','districts.regency_id','regencies.regency_id')
            .leftJoin('provinces','regencies.province_id','provinces.provincy_id')
            .where('user_id',user.id).first();
    }

    async create({auth, request, response}){
        
        const {username,mobile,district_id,address} = request.all();
        
        const rules = {
            username:'required',
            mobile: 'required|number',
            district_id: 'required',
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.status(406).json({message:validation.messages()[0]});
        }

        const user = await auth.getUser();

        //update ke table user
        user.username=username
        user.save()

        const profile = await Profile.query().where('user_id',user.id).first();
        if(profile == null){
            const newProfile = new Profile();
            
            newProfile.user_id=user.id
            newProfile.mobile=mobile
            newProfile.district_id=district_id
            newProfile.address=address
            
            newProfile.save()
        }else{
            profile.user_id=user.id
            profile.mobile=mobile
            profile.district_id=district_id
            profile.address=address
            
            profile.save()
        }

        return response.status(201).json({message:"update profile berhasil"});
    }
}

module.exports = ProfileController