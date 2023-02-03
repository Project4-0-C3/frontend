import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ApiDetailsView from '../views/events/EventDetails.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },

  // GROUPS AND THEIR USERS
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  
  // ADMIN
  {
    path: '/events',
    name: 'AdminHome',
    component: () => import('../views/AdminView.vue'),
  },
  {
    path: '/myEvents',
    name: 'MyEvents',
    component: () => import('../views/events/MyEvents.vue'),
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: () => import('../views/users/UsersView.vue'),
  },
  {
    path: '/user/:id',
    name: 'UserDetails',
    component: () => import('../views/users/UserDetails.vue'),
    props: true,
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    component: () => import('../views/events/EventDetails.vue'),
    props: true,
  },

  // DEVICES
  {
    path: '/mics/:id',
    name: 'MicDetails',
    component: () => import('../views/events/RecordingDeviceDetails.vue'),
    props: true,
  },

  // GROUPS AND THEIR USERS
  {
    path: '/groups/:id',
    name: 'GroupDetails',
    component: () => import('../views/events/GroupDetails.vue'),
    props: true,
  },

  // OTHER
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
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
  linkActiveClass: 'active',
});

export default router;
