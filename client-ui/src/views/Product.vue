<template>
    <v-container>
    <v-row class="text-xs-left">
        <v-col cols="12" md="8" class="text-xs-left">
            <p>{{product.name}} <br>
                {{product.description}}
            </p>
            <p>Rp {{formatPrice(product.patungan_price)}} / {{product.unit}}</p>
            <v-row>
                <v-col cols="6" md="3">
                    <p><span class="grey--text text-darken-1 mb-2">masukan <br> jumlah pesanan</span></p> 
                </v-col>
                <v-col>
                    <PlusMinusField
                    @recOrderQty="recOrderQty"
                    ></PlusMinusField>
                </v-col>
            </v-row>
            <v-card
            class="d-flex justify-space-between mb-6"
            flat
            tile
            >
                <p>
                Total : 
                <span class="font-weight-bold">Rp {{formatPrice(total)}}</span>
                </p>
                <v-btn
                    depressed
                    color="primary"
                    ma-md-4
                >
                    Konfirmasi
                </v-btn>
            </v-card>
        </v-col>
        <v-col cols="12" md="4">
            <p>{{product.store_name}}<br>
                {{product.address}}
            </p>
        </v-col>
    </v-row>    
    </v-container> 
</template>

<script>
import HTTP from '../http';
import PlusMinusField from '../components/PlusMinusField.vue'

export default {
    components: {
        PlusMinusField
    },
    data(){
        return {
            product : [],
            orderQty :0,
            total:0,
        }
    }, 
    mounted(){
        const url = this.$route.path;
        HTTP().get(`${url}`)
        .then(({data})=>{
            this.product = data;

            if(this.total == 0){
                this.total = data.patungan_price;
            }
        });
    },
    methods:{
        recOrderQty(value){
          this.orderQty = value;  
          this.total = this.orderQty * this.product.patungan_price

        //   console.log(this.total);
        },
        formatPrice(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
    }
}
</script>
