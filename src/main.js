import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';
import storageHelper from '@/helper/storageHelper';
import storageNames from '@/data/storageNames';
import { mapActions } from 'vuex';
import cachingHelper from '@/helper/cachingHelper';
import GridContainer from '@/components/atoms/Grid/GridContainer.vue';
import GridRow from '@/components/atoms/Grid/GridRow.vue';
import GridCell from '@/components/atoms/Grid/GridCell.vue';
import Title from '@/components/atoms/Title/Title.vue';
import Button from '@/components/atoms/Button/Button.vue';
import Icon from '@/components/atoms/Icon/Icon.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import '@/assets/styles/block-library.min.css';
import 'swiper/swiper.min.css';

Vue.component('GridContainer', GridContainer);
Vue.component('GridRow', GridRow);
Vue.component('GridCell', GridCell);
Vue.component('Title', Title);
Vue.component('Button', Button);
Vue.component('Icon', Icon);

Vue.use(Vue2TouchEvents);

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
