import router from '../router';
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    registerEmail: null,
    registerPassword: null,
    reRegisterPassword: null,
    registerError: null,
    loginEmail: null,
    loginPassword: null,
    loginError: null,
    token: null,
  },
  actions: {
    logout({ commit }) {
      commit('setToken', null);
      router.push('/login');
    },
    register({ commit, state }) {
      commit('setRegisterError', null);
      return HTTP().post('/auth/register', {
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
          commit('setToken', data.token);
          router.push('/');
        })
        .catch((e) => {
          if(e.response && e.response.status == 401){
            commit('setLoginError', e.response.data[0].message);
          }else{
            commit('setLoginError', e);
          }
        });
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setRegisterError(state, error) {
      state.registerError = error;
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
