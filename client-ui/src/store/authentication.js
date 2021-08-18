import router from '../router';
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    registerUser: null,
    registerEmail: null,
    registerPassword: null,
    reRegisterPassword: null,
    registerError: null,
    loginEmail: null,
    loginPassword: null,
    loginError: null,
    token: null,
    count_basket:0,
  },//
  actions: {
    //lemparan dari basket view
    reSetCountBasket({commit},value){
      commit('setCountBasket',value)
    },
    //leparan dari basket component
    addCountBasket({commit},value){
      commit('addCountBasket',value);
    },
    logout({ commit }) {
      commit('setToken', null);
      commit('setLoginEmail',null);
      commit('setLoginPassword',null);
      router.push('/login');
    },
    register({ commit, state }) {
      commit('setRegisterError', null);
      return HTTP().post('/auth/register', {
        username:state.registerUser,
        email: state.registerEmail,
        password: state.registerPassword,
        confirm_password : state.reRegisterPassword,
      })
        .then(({ data }) => {
          commit('setToken', data.token);
          router.push('/');
        })
        .catch((e) => {
          if(e.response && e.response.status == 406){
            commit('setRegisterError', e.response.data.message);
          }else{
            commit('setRegisterError',e);
          }
        });
    },
    login({ commit, state }) {
      commit('setLoginError', null);
      return HTTP().post('/auth/login', {
        email: state.loginEmail,
        password: state.loginPassword,
      })
        .then(({ data }) => {
          console.log("login");
          commit('setToken', data.token);
          router.push('/');
          HTTP().get('/basket/count')
          .then(({data})=>{
            commit('setCountBasket',data.count_basket);
          })
        })
        .catch((e) => {
          if(e.response && e.response.status == 401){
            commit('setLoginError', e.response.data[0].message);
          }else{
            commit('setLoginError', e);
          }
        });
    },
    fetchCountBasket({commit}){
      HTTP().get('/basket/count')
      .then(({data})=>{
        commit('setCountBasket',data.count_basket);
      })
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
  mutations: {
    addCountBasket(state,value){
      state.count_basket += value;
    },
    setCountBasket(state,count_basket){
      state.count_basket = count_basket;
    },
    setToken(state, token) {
      state.token = token;
    },
    setRegisterError(state, error) {
      state.registerError = error;
    },
    setRegisterUser(state, user) {
      state.registerUser = user;
    },
    setRegisterEmail(state, email) {
      state.registerEmail = email;
    },
    setRegisterPassword(state, password) {
      state.registerPassword = password;
    },
    setReRegisterPassword(state, confirm_password) {
      state.reRegisterPassword = confirm_password;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    setLoginEmail(state, email) {
      state.loginEmail = email;
    },
    setLoginPassword(state, password) {
      state.loginPassword = password;
    },
  },
};
