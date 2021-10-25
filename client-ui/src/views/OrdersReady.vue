<template>
<div>
<v-container>
  <div style="margin-top:15px">
    <v-row v-for="order in orders" :key="order.id">
      <v-col>
        <v-card
        >
        <div>
          <div class="float-right">
            <v-icon v-if="order.status_id==1" @click="remove(order)" color="#4042b3">delete</v-icon>
            <v-chip class="ml-0 mr-2 mt-2"
            :color="order.status_id===1?'#ba11ed':'#42c5f5'"
            label
            text-color="white"
            >
              <span class="">{{order.order_status}}</span>
            </v-chip>
          </div>
        </div>
          <v-row>
            <v-col cols="12" md="6">
              <p><span class="font-weight-regular ml-2">Beli dari </span>
                <span class="font-weight-bold">{{order.store_name}} </span>
              </p>
              <div class="ml-2">
                <span class="">{{order.address}}</span> <br>
                <span class="">Tanggal {{moment(order.created_at)}}</span>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <p>
                <span class=" ml-2">Total Transaksi Rp {{formatPrice(order.sub_total)}}</span> <br>
                <span class=" ml-2">Yang harus dibayar </span>
                <v-chip
                  color="#42c5f5"
                >
                  <span class="text-bold ml-2 white--text">Rp {{formatPrice(order.payment_amount)}} </span>
                </v-chip>
              </p>
            </v-col>
          </v-row>
          <div>
            <div class="d-flex flex-row-reverse">
              <router-link :to="{name:'accounts'}" v-if="order.status_id==1">
                <v-btn class="primary mr-2 mb-2">Metode pembayaran</v-btn>
              </router-link>
              <router-link :to="{ name: 'order', params: { id: order.id }}">
                <v-btn class="mr-2 mb-2">Detail</v-btn>
              </router-link>  
            </div>
          </div>
        </v-card>
      </v-col>  
    </v-row>
  </div>  
</v-container>
</div>
</template>

<script>
import HTTP from '../http';
import moment from 'moment';
moment.locale('id');

export default {
    data () {
      return {
        orders:[],
        tabs:[],
      }
    },
    mounted(){
      HTTP().get('/orders'+'?status=4')
      .then(({data})=>{
        this.orders = data.data
        this.tabs = data.tabs
      })
    },
    methods:{
      remove(order){
        HTTP().delete('/order/' + order.id)
        .then(({data})=>{
          //remove order array
          this.orders.splice(this.orders.indexOf(order),1);
          //tampilkan pesan di snackbar
          this.$emit('showMessage',data.message,true);
          //kurangi jumlah order di toolbar
          this.$store.dispatch('authentication/addCountOrders',-1);
          //kurangi di vtabs
          this.tabs.forEach(element=>{
            if(element.id==order.status_id){
              element.count -= 1
            }
          });

        })
      },
      moment: function (date) {
        return moment(date).format('Do MMMM YY');
      },
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      }
    }

}
</script>

<style lang="scss">
  .second-bar{
    position:fixed;
    z-index:200;
    width: 100%;
  }
  
</style>