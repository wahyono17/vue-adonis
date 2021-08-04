<template>
    <v-dialog 
        v-model="dialog"
        width="500"
        >
        <v-card>
          <v-icon color="pink" class="float-end" @click="closeDialog">cancel</v-icon>
          <v-card-title>{{this.product.name}}</v-card-title>
          
          <v-card-text>
            <div>{{this.product.description}}</div>

            <v-alert
              :value="alert"
              dense
              text
              type="success"
              >
              {{this.message}}
            </v-alert>

          </v-card-text>
          <div class="d-flex justify-space-between">
            <p><span class="grey--text text-darken-1 ma-2">jumlah pesanan</span></p> 
            <div class="">
              <PlusMinusField
              @recOrderQty="recOrderQty"
              ></PlusMinusField>
            </div>
          </div>
          
          <v-card-actions class="d-flex justify-space-between">
          <p>total harga : 
            <span class="font-weight-bold"> Rp {{formatPrice(this.patungan_price)}}</span></p>  
          <v-btn
            color="primary"
            @click="confirm"
          >
            Konfirmasi
          </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>    
</template>

<script>
import PlusMinusField from './PlusMinusField.vue'
import HTTP from '../http';

export default {
    components: {
      PlusMinusField
    },
    props:{
      product:{
        type: Object,
        required: true,
      }
    },
    data(){
      return{
        dialog:true,
        patungan_price:this.product.patungan_price,
        orderQty:1,
        message:"",
        alert: false,
      }
    }, 
    methods:{
      hide_alert(){
        window.setInterval(() => {
          this.alert = false;
        }, 1000)    
      },
      closeDialog_afterTime(){
        window.setInterval(()=>{
          this.$emit('closeDialog',false);
        },1500)
      },
      recOrderQty(value){
        this.orderQty = value;  
        this.patungan_price = this.orderQty * this.product.patungan_price;
      },
      confirm(){
        this.$store.dispatch('authentication/addCountBasket',this.orderQty);
        //masukan ke table basket harga tdk usah di ikutkan
        HTTP().post('/basket',{
          store_id:this.product.store_id,
          product_id:this.product.id,
          qty:this.orderQty,
        })
        .then(({data}) => {
          //tampilkan pesan
          this.alert = true;
          this.message = data.message;
          this.hide_alert();
          // this.$store.dispatch('addCountBasket',this.orderQty).authentication;
          
          this.closeDialog_afterTime();
        }).catch((err) => {
          console.log(err)
          this.$emit('closeDialog',false);
        });
        
      },    
      closeDialog(){
        this.$emit('closeDialog',false);
      },
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
    },
}
</script>