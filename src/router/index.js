import Vue from 'vue';
import Router from 'vue-router';
import { Add, Dashboard, MarketingPage, Print } from '~/components';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/',
      name: 'MarketingPage',
      component: MarketingPage
    },
    {
      path: '/print',
      name: 'Print',
      component: Print
    }
  ]
});
