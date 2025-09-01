import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/dynamicPromptWord',
    component: Layout,

    name: 'dynamic',
    meta: {
      title: '动态提示词',
      icon: 'shutter',
      orderNo: 2,
      single: true,
    },
    children: [
      {
        path: '',
        name: 'dynamicPromptWord',
        component: () => import('@/pages/configuration/dynamic/index.vue'),
        meta: {},
      },
    ],
  },
];
