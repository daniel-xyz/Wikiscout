import Vue from 'vue';
import Router from 'vue-router';
import MainLayer from '@/components/MainLayer';
import WikiEntry from '@/pages/WikiEntry';
import Imprint from '@/pages/Imprint';
import DataProtection from '@/pages/DataProtection';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/entry/:name',
      components: {
        layer: MainLayer,
      },
      children: [
        {
          path: '',
          component: WikiEntry,
        },
      ],
    },
    {
      path: '/imprint',
      components: {
        layer: MainLayer,
      },
      children: [
        {
          path: '',
          component: Imprint,
        },
      ],
    },
    {
      path: '/data',
      components: {
        layer: MainLayer,
      },
      children: [
        {
          path: '',
          component: DataProtection,
        },
      ],
    },
  ],
});
