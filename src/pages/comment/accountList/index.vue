<template>
  <div class="user-list-container">
    <t-row :style="{ marginTop: 'var(--td-comp-margin-xxl)' }">
      <t-button theme="primary" @click="handleCreate"> 新建 </t-button>
    </t-row>
    <div class="table-container">
      <t-table hover :data="tableData" :columns="COLUMNS" row-key="id" :pagination="pagination">
        <template #operation="{ row }">
          <t-space>
            <t-link theme="primary" @click="handleEdit(row)">编辑</t-link>
            <t-link theme="primary" @click="handleDelete(row)">删除</t-link>
          </t-space>
        </template>
      </t-table>
    </div>
    <edit-dialog ref="editDialogRef" @confirm="fetchDataList" />
  </div>
</template>
<script lang="tsx" setup>
import {
  DialogPlugin,
  type PrimaryTableCol,
  type TableRowData,
  type TdBaseTableProps,
} from 'tdesign-vue-next';
import { reactive, onMounted, ref } from 'vue';

import { DEFAULT_PAGE_PARAMS, USER_STATUS } from '@/constants';
// import { getUserList, editUserStatus } from '@/api/user';

import EditDialog from './EditDialog.vue';
interface FormData {
  id: string;
  username: string;
  phone: string;
  status: string;
}

const searchForm = {
  id: '',
  username: '',
  phone: '',
  status: '',
};
const formData = ref<FormData>({ ...searchForm });
const editDialogRef = ref<InstanceType<typeof EditDialog>>();

// 更新操作 id
const editId = ref(0);
// 表格
const COLUMNS: PrimaryTableCol[] = [
  {
    title: '序号',
    fixed: 'left',
    ellipsis: true,
    colKey: 'id',
  },
  {
    title: '对话风格',
    ellipsis: true,
    colKey: 'id',
  },
  {
    title: '博主账号',
    ellipsis: true,
    colKey: 'username',
  },
  {
    title: '评论数量',
    ellipsis: true,
    colKey: 'status',
  },
  {
    title: '点赞数量',
    ellipsis: true,
    colKey: 'channelCode',
  },
  {
    title: '评论规则',
    ellipsis: true,
    colKey: 'channelCode',
  },
  {
    title: '操作',
    width: 150,
    colKey: 'operation',
  },
];
const pagination = ref<TdBaseTableProps['pagination']>({
  ...DEFAULT_PAGE_PARAMS,
  onChange: (pageInfo: { current: number; pageSize: number }) => {
    // fetchDataList(pageInfo.current);
  },
});

const tableData = ref<TableRowData[]>([{ id: 1, status: '已开启' }, { status: '未开启' }]);
const handleCreate = (row: TableRowData) => {
  // 新建逻辑
  editDialogRef.value.open(row);
};
const handleEdit = (row: TableRowData) => {
  // 编辑逻辑
  editDialogRef.value.open(row);
};

// 查询
const handleQuery = () => {
  // fetchDataList();
};

// 删除
const handleDelete = (row: TableRowData) => {
  const dialog = DialogPlugin.confirm({
    theme: 'danger',
    header: '确认删除',
    body: `您确定要删除 ${row.name} 吗？`,
    confirmBtn: '确认',
    cancelBtn: '取消',
    onConfirm: async () => {
      // 执行删除操作
      console.log('删除分类:', row);
      //   const res = await delCategory({ id: row?.id });
      //   MessagePlugin.success(res.message);
      //   fetchDataList();
      dialog.destroy();
    },
    onCancel: () => {
      dialog.hide();
    },
  });
};

// 请求数据
const fetchDataList = async (page: number = pagination.value.defaultCurrent) => {
  // const { data } = await getUserList({
  //   ...formData.value,
  //   page,
  //   size: pagination.value.defaultPageSize,
  // });
  // tableData.value = data.data;
  // pagination.value.total = data.total;
  // pagination.value.current = page;
};

onMounted(() => {
  // fetchDataList();
});
</script>

<style lang="less" scoped>
.user-list-container {
  background-color: var(--td-bg-color-container);
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  border-radius: var(--td-radius-medium);

  .table-container {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.operation-container {
  text-align: right;
}
</style>
