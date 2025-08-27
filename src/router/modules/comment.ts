import Blank from '@/layouts/blank.vue';
import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/comment',
    name: 'comment',
    component: Layout,
    redirect: '/comment/idPool',
    meta: { title: '评论', icon: 'pantone', orderNo: 4 },
    children: [
      {
        path: 'idPool',
        name: 'idPool',
        component: () => import('@/pages/comment/idPool/index.vue'),
        meta: { title: 'id池' },
      },
      {
        path: 'accountList',
        name: 'accountList',
        component: () => import('@/pages/comment/accountList/index.vue'),
        meta: { title: '账户列表' },
      },
    ],
  },
];
