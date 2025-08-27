import { LogoutIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';

import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/configuration',
    name: 'configuration',
    component: Layout,
    redirect: '/configuration/IMPromptWord',
    meta: { title: '配置', icon: 'logo-android', orderNo: 2 },
    children: [
      {
        path: 'IMPromptWord',
        name: 'IMPromptWord',
        component: () => import('@/pages/configuration/im/index.vue'),
        meta: { title: 'IM提示词' },
      },
      {
        path: 'dynamicPromptWord',
        name: 'dynamicPromptWord',
        component: () => import('@/pages/configuration/dynamic/index.vue'),
        meta: { title: '动态提示词' },
      },
    ],
  },
];
