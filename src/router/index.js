import Vue from 'vue';
import VueRouter from 'vue-router';
import Page from '@/views/Page.vue';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:slug',
    name: 'Page',
    component: Page,
  },
  {
    path: '/:slug/:subSlug',
    component: Page,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
