import Vue from 'vue';
import VueRouter from 'vue-router';
import Page from '@/views/Page.vue';
import Home from '@/views/Home.vue';
import Post from '@/views/Post.vue';
import Events from '@/views/Events.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/page/:slug',
    name: 'page',
    component: Page,
  },
  {
    path: '/post/:slug',
    name: 'post',
    component: Post,
  },
  {
    path: '/events',
    name: 'events',
    component: Events,
  },
  {
    path: '*',
    name: 'NotFound',
    redirect: { name: 'page', params: { slug: 'not-found' } },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
