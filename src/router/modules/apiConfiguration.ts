import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/apiConfiguration',
    component: Layout,

    name: 'api',
    meta: {
      title: 'API配置',
      icon: 'bifurcate',
      orderNo: 3,
      single: true,
    },
    children: [
      {
        path: '',
        name: 'apiConfiguration',
        component: () => import('@/pages/configuration/api/index.vue'),
        meta: {},
      },
    ],
  },
];
