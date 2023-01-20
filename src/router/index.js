import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ApiDetailsView from '../views/EventDetails.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/admin/home',
    name: 'AdminHome',
    component: () => import('../views/ApiView.vue')
  },
  {
    path: '/user/:id',
    name: 'UserDetails',
    component: () => import('../views/UserDetails.vue'),
    props: true,
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    component: () => import('../views/EventDetails.vue'),
    props: true,
  },
  {
    path: '/mics/:id',
    name: 'MicDetails',
    component: () => import('../views/RecordingDeviceDetails.vue'),
    props: true,
  },
  {
    path: '/groups/:id',
    name: 'GroupDetails',
    component: () => import('../views/RecordingDeviceDetails.vue'),
    props: true,
  },
  {
    path: '/shouldRedirectToApi',
    redirect: '/api',
  },
  // catchAll 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
});

export default router;
