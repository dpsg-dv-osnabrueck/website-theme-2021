import Vue from 'vue';
import storageHelper from '@/helper/storageHelper';
import storageNames from '@/data/storageNames';
import { mapActions } from 'vuex';
import cachingHelper from '@/helper/cachingHelper';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Save vuex store to local storage
store.subscribe((mutation, state) => {
  storageHelper.write(cachingHelper.write(state), storageNames.VUEX_STORE);
});

new Vue({
  router,
  store,
  methods: {
    ...mapActions(['initializeState']),
  },
  mounted() {
    this.initializeState();
  },
  render: (h) => h(App),
}).$mount('#app');
