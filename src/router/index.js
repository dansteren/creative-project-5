import Vue from 'vue';
import Router from 'vue-router';

import store from '~/store';
import { Add, Root, Edit } from '~/components';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/add',
      name: 'Add',
      component: Add,
      beforeEnter: (to, from, next) => {
        if (store.getters.loggedIn) {
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
      path: '/edit',
      name: 'Edit',
      component: Edit,
      props: true,
    },
  ],
});
