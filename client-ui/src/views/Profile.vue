<template>
    <v-container>
        <v-text-field
          v-model="profile.username"
          label="Nama"
          hint="wajib di isi"
          :error="username_error"
        ></v-text-field>

        <v-text-field
          label="Ponsel"
          v-model="profile.mobile"
          hint="wajib di isi"
          :error="mobile_error"
        ></v-text-field>

        <v-combobox
          v-model="profile.as_name"
          :items="loginAs"
          label="Sebagai"
          outlined
          dense
          hint="wajib di isi"
          @change="selectAsId(profile.as_name)"
        ></v-combobox>

        <v-combobox
          v-model="profile.provice_name"
          :items="province"
          label="Provinsi"
          outlined
          dense
          hint="wajib di isi"
          @change="selectRegency(profile.provice_name)"
        ></v-combobox>

        <v-combobox
          v-model="profile.regency_name"
          :items="regency"
          label="Kabupaten/Kota"
          outlined
          dense
          hint="wajib di isi"
          @change="selectDistrict(profile.regency_name)"
        ></v-combobox>

        <v-combobox
          v-model="profile.district_name"
          :items="district"
          label="Kecamatan"
          outlined
          dense
          hint="wajib di isi"
          :error="district_error"
        ></v-combobox>

        <v-text-field
          label="Alamat"
          v-model="profile.address"
        ></v-text-field>

        <v-btn
        depressed
        color="primary"
        @click="saveProfile"
        >
        Simpan
        </v-btn>
    </v-container>
</template>

<script>
import HTTP from '../http';

export default {
    data(){
        return {
            profile : {},
            radios: null,
            loginAs:[
                {'value':1,'text':"Pembeli"},
                {'value':2,'text':"Penjual"}
            ],
            province:[],
            regency:[],
            district:[],
            as_id:null,
            district_id:null,
            mobile_error:false,
            username_error:false,
            district_error:false,
        }
    },
    mounted(){
        HTTP().get('/profile')
        .then(({data})=>{
            this.profile = data
            // console.log(this.profile)
        })
        HTTP().get('/province')
        .then(({data})=>{
            data.forEach(element => {
                this.province.push({
                    'value':element.provincy_id,
                    'text':element.name
                })
            });
        })
    },
    methods:{
        // hide_alert(){
        //     window.setInterval(() => {
        //         this.alert = false;
        //     }, 1000)
        // },
        selectAsId(as){
            this.as_id=as.value
        },
        selectRegency(province){
            HTTP().get('/regency/'+province.value)
            .then(({data})=>{
                data.forEach(element => {
                    this.regency.push({
                        'value':element.regency_id,
                        'text':element.name
                    })
                });
            })
        },
        selectDistrict(regency){
            HTTP().get('/district/'+regency.value)
            .then(({data})=>{
                data.forEach(element => {
                    this.district.push({
                        'value':element.district_id,
                        'text':element.name
                    })
                    //simpan ke data
                    this.district_id=element.district_id;
                });
            })
        },
        saveProfile(){
            HTTP().post('/profile',{
                username:this.profile.username,
                mobile:this.profile.mobile,
                district_id:this.district_id != null ? this.district_id : this.profile.district_id,
                as_id:this.as_id != null ? this.as_id : this.profile.as_id,
                address:this.profile.address,
            })
            .then(({data})=>{
                // this.message = data.message
                // this.alert = true
                // this.hide_alert()
                //munculkan pesan sukses di snackbar
                this.$emit('showMessage',data.message,true);
            })
            .catch((e)=>{
                if(e.response && e.response.status === 406){
                    if(e.response.data.message.field == "mobile"){
                        this.mobile_error = true
                    }
                    if(e.response.data.message.field == "district_id"){
                        this.district_error = true
                    }
                    if(e.response.data.message.field == "username"){
                        this.username_error = true
                    }

                }
            })
        }
    }

}
</script>