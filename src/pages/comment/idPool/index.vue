<template>
  <div class="user-list-container">
    <t-form :data="formData" :label-width="80">
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[24, 24]">
            <t-col :span="4">
              <t-form-item label="用户名" name="phone">
                <t-input
                  v-model="formData.phone"
                  class="form-item-content"
                  placeholder="输入用户名"
                />
              </t-form-item>
            </t-col>
          </t-row>
        </t-col>
        <t-col :span="2" class="operation-container">
          <t-button theme="primary" @click="handleQuery"> 查询 </t-button>
          <t-button theme="default" @click="handleReset"> 重置 </t-button>
        </t-col>
        <input ref="fileInputRef" type="file" style="display: none" @change="handleFileChange" />
      </t-row>
    </t-form>
    <t-row :style="{ marginTop: 'var(--td-comp-margin-xxl)' }">
      <t-button theme="primary" @click="handleCreate"> 新建 </t-button>
      <t-button theme="primary" @click="handleImport"> 导入 </t-button>
      <input ref="fileInputRef" type="file" style="display: none" @change="handleFileChange" />
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
import { getUserList, editUserStatus } from '@/api/user';

import EditDialog from './EditDialog.vue';
const fileInputRef = ref<HTMLInputElement | null>(null);

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
//点击导入
const handleImport = () => {
  fileInputRef.value?.click();
};
//导入处理
const handleFileChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  console.log('导入文件:', files);
  if (files && files.length > 0) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target?.result;
      MessagePlugin.success('文件导入成功');
      // 这里可以处理文件内容或上传到后端
    };
    reader.readAsText(file);
  }
};
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
  // fetchDataList();
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

// 分页变化
// const onPageChange: TableProps['onChange'] = async (changeParams, triggerAndData) => {
//   //   const { current } = changeParams.pagination;
//   //   fetchDataList(current);
// };

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
