import Vue from 'vue';
import Router from 'vue-router';
import { Hello, About, LineChartExample, AxisExample } from '../components';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/examples',
      name: 'Examples',
      component: About,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/axis',
      name: 'Axis Example',
      component: AxisExample,
    },
    {
      path: '/line',
      name: 'Line Chart Example',
      component: LineChartExample,
    },
  ],
});
