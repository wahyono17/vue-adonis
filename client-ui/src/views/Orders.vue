<template>
<v-container>
  <div style="margin-top:10px">
     <v-row v-for="order in orders" :key="order.id">
      <v-col>
        <v-card
        >
        <div>
          <div class="float-right">
            <v-chip class="ml-0 mr-2 black--text"
            label small
            >
                <span class="">Belum dibayar</span>
            </v-chip>
          </div>
        </div>
          <v-row>
            <v-col cols="12" md="6">
              <p><span class="text-small ml-2">Beli dari </span>
                <span class="text-bold ml-2">{{order.store_name}} </span>  <br>
                <span class="text-small ml-2">Tanggal {{moment(order.created_at)}}</span>
              </p>
            </v-col>
            <v-col cols="12" md="6">
              <p>
                <span class="text-small ml-2">Total Transaksi Rp {{formatPrice(order.sub_total)}}</span> <br>
                <span class="text-small ml-2">Yang harus dibayar </span>
                <span class="text-bold ml-2">Rp {{formatPrice(order.payment_amount)}} </span>
              </p>
            </v-col>
          </v-row>
          <div>
            <div class="d-flex flex-row-reverse">
              <v-btn small class="mr-2 mb-2 primary">Metode pembayaran</v-btn>
              <router-link :to="{ name: 'order', params: { id: order.id }}">
                <v-btn small class="mr-2 mb-2">Detail</v-btn>
              </router-link>  
            </div>
          </div>
        </v-card>
      </v-col>  
    </v-row>
  </div>  
</v-container>
</template>

<script>
import HTTP from '../http';
import moment from 'moment';
moment.locale('id');

export default {
    data () {
      return {
        orders:[],
      }
    },
    mounted() {
      HTTP().get('/orders')
      .then(({data})=>{
        this.orders = data
      })
    },
    methods:{
      moment: function (date) {
        return moment(date).format('Do MMMM YY');
      },
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
    }

}
</script>

<style lang="scss">
  
</style>