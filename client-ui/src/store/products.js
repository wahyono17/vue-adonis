// import router from '../router';
import HTTP from '../http';

export default {
    namespaced: true,
    state:{
        products: [],
        singleProduct:{},
    },
    //lemparan dari method dan create
    actions: {
        fetchProducts({ commit }) {
            console.log("sampai sini");
            return HTTP().get('/product')
                .then(({ data }) => {
                console.log(data);
                commit('setProducts', data);
            });
        },
    },
    getters: {
        products(state){
            return state.products
        }
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
    }

}