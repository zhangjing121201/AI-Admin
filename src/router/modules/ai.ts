import { LogoutIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';

import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/ai',
    name: 'aiList',
    component: Layout,
    meta: { title: 'AI管理', icon: 'member', orderNo: 1 },
    children: [
      {
        path: 'list',
        component: () => import('@/pages/ai/index.vue'),
        meta: { title: 'AI列表' },
      },
    ],
  },
];
