<template>
    <v-container>
        <v-row>
            <v-col v-for="product in products" :key="product.id"
                cols="6"
                sm="4"
                md="3"
            >
            <v-card
                class="pa-2"
                outlined
                tile
            >
                <v-img
                height="250"
                v-bind:src="product.images"
                ></v-img>

                <v-card-title>{{product.name}}</v-card-title>

                <v-card-text>
                <v-row
                    align="center"
                    class="mx-0"
                >
                    <div class="grey--text ms-4">
                    {{product.store_name}} / {{product.store_address}}
                    </div>
                </v-row>

                <div class="my-4 text-subtitle-1">
                    <span class="text-decoration-line-through">Rp {{formatPrice(product.price)}}</span>
                    <br>
                    <span class="font-weight-bold">Rp {{formatPrice(product.patungan_price)}}</span>
                </div>

                <div>{{product.description}}</div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-actions>
                <v-btn
                    color="deep-purple lighten-2"
                >
                    Beli
                </v-btn>
                

                </v-card-actions>
                
            </v-card>
            </v-col>
        </v-row>
        <v-btn
            color="green"
            @click="nextPage"
        >
            Tampilkan lebih
        </v-btn>
    </v-container>
</template>

<script>

import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
// import Basket from '../components/Basket.vue';

export default {
    components:{
        // Basket,//
    },
    // data () {
    //   return {
    //     dialog: false,
    //   }
    // },
    mounted() {
        this.fetchProducts();
    },
    computed: {
        ...mapState('products',[
            'products',
            // 'dialog'
        ]),
        ...mapGetters('products',[
            // 'dialog'
        ]),
        
    },//
    methods:{ //methods
        // closeCard(){
        //     this.dialog=false;
        // },
        formatPrice(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        ...mapMutations('products',[
            
        ]),
        ...mapActions('products',[
            'fetchProducts',
            'nextPage',
            // 'closeCard'
        ]),
    },
};
</script>