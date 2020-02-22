import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter';
import { VuelidatePlugin } from '@vuelidate/core';
import messagePlugin from '@/utils/message.plugin';
import titlePlugin from '@/utils/title.plugin';
import VueMeta from 'vue-meta';
import tooltipDirective from '@/directives/tooltip.directive';
import Loader from '@/components/app/Loader.vue';
import Paginate from 'vuejs-paginate';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import App from './App.vue';
import router from './router';
import store from './store';

import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

firebase.initializeApp({
  apiKey: 'AIzaSyB_at9hotBHdefwVmUqZqPyERVJOT4aGz4',
  authDomain: 'crm-composition-api.firebaseapp.com',
  databaseURL: 'https://crm-composition-api.firebaseio.com',
  projectId: 'crm-composition-api',
  storageBucket: 'crm-composition-api.appspot.com',
  messagingSenderId: '15467340700',
  appId: '1:15467340700:web:65f8921b5921b762aa1e59',
  measurementId: 'G-KX00TN59KC',
});

Vue.config.productionTip = false;
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.use(VueCompositionAPI);
Vue.use(VuelidatePlugin);
Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(VueMeta);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
