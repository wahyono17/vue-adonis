<template>
<v-container>
     <v-row v-for="order in orders" :key="order.id">
      <v-col>
        <v-card
        >
          <v-row>
            <v-col cols="10">
              <p><span class="text-bold ml-2">{{order.store_name}} </span>  <br>
                <span class="text-small ml-2">{{moment(order.created_at)}}</span>
              </p>
            </v-col>
            <v-col cols="2">
              <!-- <div class="d-flex justify-end">
                <v-icon @click="remove(order)" color="#4042b3">delete</v-icon>
                <v-checkbox
                  v-model="order.checkbox" @change="calculateTotal(order)"
                ></v-checkbox>
              </div> -->
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
      console.log(moment.locale()); 
    },
    methods:{
      moment: function (date) {
        return moment(date).format('MMMM Do YY');
      }
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