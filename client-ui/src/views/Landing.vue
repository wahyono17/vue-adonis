<template>
    <v-container>
        <v-row>
            <div v-if="dialog">
            <Basket :product="this.product" @closeDialog="closeDialog" @showMessage="showMessage"
            ></Basket>
            </div>
            <v-col v-for="product in products" :key="product.id"
                cols="12"
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
                    {{product.store_name}} / {{product.address}}
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
                <router-link :to="{ name: 'productById', params: { id: product.id }}">
                    <v-btn
                        color="primary"
                    >Beli</v-btn>
                </router-link>
                <v-btn
                    class="ml-2"
                    color="success"
                    @click="takeToBasket(product)"
                    >
                    + keranjang
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
import Basket from '../components/Basket.vue';

export default {
    components:{
        Basket,
    },
    data (){
        return {
            dialog: false,
            product:{},
        }
    },
    mounted() {
        this.fetchProducts();
    },
    computed: {
        ...mapState('landing',[
            'products',
            // 'dialog'
        ]),
        ...mapGetters('landing',[
            // 'dialog'
        ]),

    },//
    methods:{ //methods
        takeToBasket(product){
            this.product = product;
            this.dialog = true;
            // console.log(this.product.name);
        },
        closeDialog(value){
            this.dialog=value;
        },
        showMessage(message,bolStatus){
            this.$emit('showMessage',message,bolStatus);
        },
        formatPrice(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        selectProduct(product){
            console.log(product)
        },
        ...mapMutations('landing',[

        ]),
        ...mapActions('landing',[
            'fetchProducts',
            'nextPage',

        ]),
    },
};
</script>