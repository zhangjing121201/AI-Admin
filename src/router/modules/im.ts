import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/imPromptWord',
    component: Layout,
    // redirect: '/home',
    name: 'im',
    meta: {
      title: 'IM提示词',
      icon: 'logo-android',
      orderNo: 1,
      single: true,
    },
    children: [
      {
        path: '',
        name: 'imPromptWord',
        component: () => import('@/pages/configuration/im/index.vue'),
        meta: {},
      },
    ],
  },
];
