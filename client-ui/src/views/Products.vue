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
                @click="reserve"
            >
                Pesan sekarang
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>

import { mapActions, mapState } from 'vuex';
export default {
    mounted() {
        this.fetchProducts();
    },
    // created(){
    //     this.fetchProjects();
    // },
    // created(){ //pertama kali component ini di click maka akan panggil untuk menerima list todo
    //   this.$store.dispatch('fetchProducts').product // kalau dispatch di store harus di terima di actions
    // },
    computed: {
        ...mapState('products',[
            'products',
        ]),
    },//
    methods:{ //methods
        formatPrice(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        // fetchProducts(){

        // }
        // testProduct(){

        // },
        ...mapActions('products',[
            'fetchProducts'
        ]),
    },
};
</script>