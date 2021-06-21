// import Vue from 'vue';
import HTTP from '../http';

export default {
    namespaced: true,
    state:{
        products: [],
        // id:"604dba99dead94fee94d2824",
        singleProduct:{},
    },
    //lemparan dari method dan create
    actions: {
        fetchproducts({ commit }) {
            console.log("sampai sini");
            return HTTP().get('/product')
                .then(({ data }) => {
                console.log(data);
                commit('setProducts', data);
            });
        },
    },
    getters: {
        // products(state){
        //     return state.products
        // }
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
    }

}