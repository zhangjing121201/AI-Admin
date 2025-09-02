import { HomeIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';

import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/home',
    component: Layout,
    redirect: '/home',
    name: 'homepage',
    meta: {
      title: 'AI列表',
      icon: shallowRef(HomeIcon),
      orderNo: 0,
      single: true,
    },
    children: [
      {
        path: '',
        name: 'aiList',
        component: () => import('@/pages/ai/index.vue'),
        meta: {},
      },
    ],
  },
];
