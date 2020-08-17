require('./bootstrap');

import VueRouter from 'vue-router';
import VueMask from 'v-mask';
import money from 'v-money';

window.Vue = require('vue');

Vue.use(VueRouter);
Vue.use(VueMask);
Vue.use(money, { precision: 2 });

import router from './routes';
import store from './store';
import Index from './Index';

const app = new Vue({
    el: '#app',
    router,
    store,
    components: { index: Index }
});
