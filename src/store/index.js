import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import userInfo from './userInfo';
import category from './category';
import record from './record';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchCurrency() {
      // const key = process.env.VUE_APP_FIXER;
      // const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`);
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            timestamp: 1582384207,
            base: 'EUR',
            date: '2020-02-22',
            rates: {
              USD: 1.084705,
              EUR: 1,
              RUB: 69.501721,
            },
          });
        }, 1000);
      });

      return res;
    },
  },
  getters: {
    error: (state) => state.error,
  },
  modules: {
    auth, userInfo, category, record,
  },
});
