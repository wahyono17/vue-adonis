<template>
<v-container>
    <v-sheet elevation="6">
      <v-tabs
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
        show-arrows
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab
          class="non-transform"
          v-for="tab in tabs"
          :key="tab.id"
          @click="getByStatus(tab.id)"
        >
          {{ tab.name }} <span><v-chip>{{tab.count}}</v-chip></span>
        </v-tab>
      </v-tabs>
    </v-sheet>

    <div style="margin-top:20px">
    <v-row v-for="order in orders" :key="order.id">
      <v-col>
        <v-card
        >
        <div>
          <div class="float-right">
            <v-chip class="ml-0 mr-2 mt-2 black--text"
            label
            >
                <span class="">Belum dibayar</span>
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
              <router-link :to="{name:'accounts'}">
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
    mounted() {
      HTTP().get('/orders')
      .then(({data})=>{
        this.orders = data.data
        this.tabs = data.tabs
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
      getByStatus(id){
        // console.log(id)
        HTTP().get('/orders'+'?status='+id)
        .then(({data})=>{
          console.log(data)
          this.orders = data.data
        })
      }
    }

}
</script>

<style lang="scss">
  
</style>