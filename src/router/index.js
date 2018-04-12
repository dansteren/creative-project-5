import Vue from 'vue';
import Router from 'vue-router';

import store from '~/store';
import { Add, Root, Print } from '~/components';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/add',
      name: 'Add',
      component: Add,
      beforeEnter: (to, from, next) => {
        if (store.state.loggedIn) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/',
      name: 'Root',
      component: Root,
    },
    {
      path: '/print',
      name: 'Print',
      component: Print,
    },
  ],
});
