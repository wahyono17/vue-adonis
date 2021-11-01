<template>
<div>
<v-container>
  <div style="margin-top:15px">
    <div v-if="dialog">
    <finish-order :order="this.order" @showMessage="showMessage" @closeDialog="closeDialog"></finish-order>
    </div>
    <v-row v-for="order in orders" :key="order.id">
      <v-col>
        <v-card
        >
        <div>
          <div class="float-right">
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
              <v-btn color="#f5b8d6" class="mr-2 mb-2" @click="finisCofirmation(order)"
              >Konfirmasi Terima Barang</v-btn>

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
import FinishOrder from '../components/FinishOrder.vue';
moment.locale('id');

export default {
  components: { FinishOrder },
  data () {
    return {
      orders:[],
      order:{},
      tabs:[],
      dialog:false,
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
    moment: function (date) {
      return moment(date).format('Do MMMM YY');
    },
    formatPrice(value) {
      let val = (value/1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    showMessage(message,bolStatus,order){
      this.$emit('showMessage',message,bolStatus);

      //hapus index di frontend
      this.orders.splice(this.orders.indexOf(order),1)

      //kurangi jumlah di toolbar
      this.$store.dispatch('authentication/addFinishOrder',-1);
    },
    closeDialog(value){
      this.dialog=value;
    },
    finisCofirmation(value){
      this.order=value;
      this.dialog=true;
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