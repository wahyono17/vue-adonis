<template>
<v-container>
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

          <!-- <div class="d-flex justify-space-between">
            <p> <span class="text-small ml-2">Harga :</span> Rp {{formatPrice(order.patungan_price)}}</p> 
            <p class="mr-2"> <span class="text-small">Jumlah :</span> {{order.qty}} {{order.unit}}</p>
          </div>
          <div class="d-flex justify-space-between">
            <p> <span class="text-small ml-2">Total :</span> Rp {{formatPrice(order.total)}}</p> 
            <p class="mr-2"> <span class="text-small">Pesan dari :</span> {{order.store_name}}</p>
          </div> -->
          
        </v-card>
      </v-col>  
    </v-row>
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
  .text-bold{
    font-size: 20px;
  }
  .text-small{
    font-size: 14px;
  }
</style>