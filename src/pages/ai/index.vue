<template>
  <div class="user-list-container">
    <t-form :data="formData" :label-width="80">
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[24, 24]">
            <t-col :span="4">
              <t-form-item label="平台" name="status">
                <t-select v-model="formData.platform" placeholder="选择平台">
                  <t-option v-for="op in USER_STATUS" :key="op.text" :label="op.text" :value="op.value"></t-option>
                </t-select>
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="用户名" name="username">
                <t-input v-model="formData.username" class="form-item-content" placeholder="输入用户名" />
              </t-form-item>
            </t-col>
          </t-row>
        </t-col>
        <t-col :span="2" class="operation-container">
          <t-button theme="primary" @click="handleQuery"> 查询 </t-button>
          <t-button theme="default" @click="handleReset"> 重置 </t-button>
        </t-col>
      </t-row>
    </t-form>
    <t-row :style="{ marginTop: 'var(--td-comp-margin-xxl)' }">
      <t-button theme="primary" @click="handleCreate"> 新建 </t-button>
    </t-row>
    <div class="table-container">

      <t-table hover :data="tableData" :columns="COLUMNS" row-key="id" :pagination="pagination" @change="onPageChange">
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
  type SelectProps,
  type PrimaryTableCol,
  type TableRowData,
  type TdBaseTableProps,
  type TableProps,
  MessagePlugin,
} from 'tdesign-vue-next';
import { reactive, onMounted, ref } from 'vue';
import { useFormatDate } from '@/hooks';

import { DEFAULT_PAGE_PARAMS, USER_STATUS } from '@/constants';
import { getAiList, delAi } from '@/api/ai';

import EditDialog from './EditDialog.vue';
interface FormData {
  username: string;
  platform: string;
}

const searchForm = {
  username: '',
  platform: ''
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
    title: '平台',
    ellipsis: true,
    colKey: 'platform',
  },
  {
    title: '用户名',
    ellipsis: true,
    colKey: 'username',
  },
  {
    title: '密码',
    ellipsis: true,
    colKey: 'password',
  },
  {
    title: '主页地址',
    ellipsis: true,
    colKey: 'homepage_url',
  },
  {
    title: '对话风格',
    ellipsis: true,
    colKey: 'conversation_style',
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

// 确认弹窗
const confirmVisible = ref(false);

const defaultOperation = {
  content: '',
  bannedStatus: 0,
  freezeStatus: 0,
};
// 弹窗名称
const operations = reactive({
  ...defaultOperation,
});

// 查询
const handleQuery = () => {
  console.log(formData.value, 'formDataformData');

  fetchDataList();
};
// 重置
const handleReset = () => {
  formData.value = { ...searchForm };
  // fetchDataList();
};

// 删除
const handleDelete = (row: TableRowData) => {
  const dialog = DialogPlugin.confirm({
    theme: 'danger',
    header: '确认删除',
    body: `您确定要删除 ${row.username} 吗？`,
    confirmBtn: '确认',
    cancelBtn: '取消',
    onConfirm: async () => {
      const res = await delAi(row.id);
      MessagePlugin.success('删除成功');
      fetchDataList();
      dialog.destroy();
    },
    onCancel: () => {
      dialog.hide();
    },
  });
};

// 分页变化
const onPageChange: TableProps['onChange'] = async (changeParams, triggerAndData) => {
  const { current } = changeParams.pagination;
  fetchDataList(current);
};

// 请求数据
const fetchDataList = async (page: number = pagination.value.defaultCurrent) => {
  let params = {
    ...formData.value,
    page,
    page_size: pagination.value.defaultPageSize,
  }
  const { data } = await getAiList(params);
  console.log(data, 'data1111');

  tableData.value = data;
  pagination.value.total = data.pagination.count;
  pagination.value.current = data.pagination.page;



};

onMounted(() => {
  fetchDataList();
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
