<template>
  <v-container>
    <div class="d-flex justify-end" style="margin-top:-20px">
      <v-checkbox v-if="checkboxElement"
        v-model="checkAll"
        @change="isCheckAll"
      ></v-checkbox>
    </div>
    
    <v-row v-for="basket in baskets" :key="basket.id">
      <v-col>
        <v-card
        >
          <v-row>
            <v-col cols="10">
              <p><span class="text-bold ml-2">{{basket.name}} </span>  <br>
                <span class="text-small ml-2">{{basket.description}}</span>
              </p>
            </v-col>
            <v-col cols="2">
              <div class="d-flex justify-end">
                <v-icon @click="remove(basket)" color="#4042b3">delete</v-icon>
                <v-checkbox
                  v-model="basket.checkbox" @change="calculateTotal(basket)"
                ></v-checkbox>
              </div>
            </v-col>
          </v-row>

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
    
    <v-row class="fixed">
      <v-col>
        <div class="d-flex justify-space-between">
          <div class="ml-4">
            <h3>Total : Rp {{formatPrice(this.totalValue)}}</h3>
          </div>
          <v-btn 
            @click="makeOrder"
            class="primary mr-2">Pesan
          </v-btn>
        </div>
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
        checkboxElement:false
      }
    },
    mounted() {
      HTTP().get('/basket')
      .then(({data})=>{
        this.baskets = data
        //jika ada basekets maka munculkan opsi chekall
        if(this.baskets.length > 0){
          this.checkboxElement = true;
        }
      })
    },
    methods:{
      remove(basket){
        HTTP().delete('/basket/' + basket.id)
        .then(()=>{
          //remove basket array
          this.baskets.splice(this.baskets.indexOf(basket),1)
        })
      },
      calculateTotal(value){
        if(value.checkbox == true){
          this.totalValue += value.total;
        }else{
          this.totalValue -= value.total;
        }
        // console.log(this.baskets);
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
        const itemOrder = this.baskets.filter((el)=>{
          return el.checkbox == true
        });

        HTTP().post('/order',itemOrder)//pembagian order bedasarkan toko dikerjakan dari backend
        .then(({data})=>{ 
          //hapus data di index, sisakan yg belum di click saja
          this.baskets = this.baskets.filter(b=> b.checkbox==false || b.checkbox == null);
          //tampilkan pesan berhasil di snackbar
          this.$emit('showMessage',data.message,true);
          this.checkAll = false;
          //totalvalue reset jadikan nol lagi
          this.totalValue = 0;
          //hitung ulang untuk basket counter
          this.$store.dispatch('authentication/reSetCountBasket',this.baskets.length);
          //tambahkan total order ke toolbar
          this.$store.dispatch('authentication/addCountOrders',data.addOrder);
        });
      }
      
    }
  }
</script>

<style lang="scss">
  .fixed {
    position: fixed;
    bottom: 0;
    left:0;
    right:0;
    width: 100%;
    background-color: honeydew;
  }
  
  
</style>