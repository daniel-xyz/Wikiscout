import Vue from 'vue';
import Router from 'vue-router';
import Map from '@/components/Map';
import WikiEntry from '@/components/WikiEntry';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/entry/:name',
      components: {
        layer: WikiEntry,
        main: Map,
      },
    },
    {
      path: '/',
      components: {
        main: Map,
      },
    },
  ],
});
