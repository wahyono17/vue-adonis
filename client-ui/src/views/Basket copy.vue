<template>
  <v-container>

    <div class="d-flex justify-space-between" style="max-height:50px">
      <h3>Total : Rp {{formatPrice(this.totalValue)}}</h3>

      <v-checkbox 
        v-model="checkAll"
        @change="isCheckAll"
      ></v-checkbox>
      <v-btn 
        @click="makeOrder"
        class="primary">Pesan
      </v-btn>
      
    </div>
    <v-row v-for="basket in baskets" :key="basket.id">;
      <v-col>
        <v-card
        >
          <div class="d-flex justify-space-between">
            <p><span class="text-bold ml-2">{{basket.name}} </span>  <br>
              <span class="text-small ml-2">{{basket.description}}</span>
            </p>
            <v-checkbox
              v-model="basket.checkbox" @change="calculateTotal(basket)"
            ></v-checkbox>
          </div>
          <div class="d-flex justify-space-between">
            <p> <span class="text-small ml-2">Harga :</span> Rp {{formatPrice(basket.patungan_price)}}</p> 
            <p class="mr-2"> <span class="text-small">Jumlah :</span> {{basket.qty}} {{basket.unit}}</p>
          </div>
          <div class="d-flex justify-space-between">
            <p> <span class="text-small ml-2">Total :</span> Rp {{formatPrice(basket.total)}}</p> 
            <p class="mr-2"> <span class="text-small">Pesan dari :</span> {{basket.store_name}}</p>
          </div>
          
        </v-card>
      </v-col>  
    </v-row>

    
    
    
  </v-container>
</template>

<script>
import HTTP from '../http';
  export default {
    data () {
      return {
        baskets:[],
        checkAll:false,
        totalValue:0,
        value: 'recent'
      }
    },
    mounted() {
      HTTP().get('/basket')
      .then(({data})=>{
        this.baskets = data
      })
    },
    methods:{
      calculateTotal(value){
        if(value.checkbox == true){
          this.totalValue += value.total;
        }else{
          this.totalValue -= value.total;
        }
      },
      isCheckAll(){
        if(this.checkAll == true){
          this.totalValue = 0; //reset terlebih dahulu
          for(let i=0; i<this.baskets.length; i++){
            this.baskets[i].checkbox = true;
            this.totalValue += this.baskets[i].total;
          }
        }else{
          this.totalValue = 0; //reset terlebih dahulu
          for(let i=0; i<this.baskets.length; i++){
            this.baskets[i].checkbox = false;
          }
        }
      },
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      makeOrder(){
        this.baskets.forEach((e)=>{
          if(e.checkbox == true){
            //post to backend
            console.log(e)
          }
        });

        
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
  div.btn__content {
    padding: 0;
  }
</style>