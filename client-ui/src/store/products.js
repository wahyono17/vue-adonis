// import router from '../router';
import HTTP from '../http';

export default {
    namespaced: true,
    state:{
        products: [],
        singleProduct:{},
        page:1,
    },
    //lemparan dari method dan create
    actions: {
        fetchProducts({ commit }) {
            return HTTP().get('/products')
                .then(({ data }) => {
                commit('setProducts', data);
                commit('resetPage');
            });
        },
        nextPage({commit,state}){
            const newPage = state.page+1;
            return HTTP().get('/products'+'?page='+newPage)
                .then( ({data})=>{
                    commit('setProducts',data);
                    commit('nextPage');     
                });
        },
        
    },
    getters: {
        // dialog(state){
        //     return state.dialog;
        // }
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
        nextPage(state){
            state.page++
        },
        resetPage(state){
            state.page=1;
        },
    }

}