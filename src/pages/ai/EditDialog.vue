<template>
  <t-dialog
    v-model:visible="visible"
    :width="600"
    :header="title"
    confirm-btn="保存"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <t-form ref="formRef" :model="data" label-width="80px">
      <t-form-item label="平台" name="contentType">
        <t-select v-model="data.name" placeholder="选择平台">
          <t-option v-for="val in Options" :key="val.value" :value="val.value" :label="val.label" />
        </t-select>
      </t-form-item>
      <t-form-item label="用户名" name="name">
        <t-input v-model="data.name" placeholder="输入用户名" />
      </t-form-item>
      <t-form-item label="密码" name="name">
        <t-input v-model="data.name" placeholder="输入密码" />
      </t-form-item>
      <t-form-item label="主页地址" name="name">
        <t-input v-model="data.name" placeholder="输入主页地址" />
      </t-form-item>
      <t-form-item label="对话风格" name="name">
        <t-input v-model="data.name" placeholder="输入对话风格" />
      </t-form-item>
      <t-form-item label="补充提示词" name="name">
        <t-input v-model="data.name" placeholder="输入补充提示词" />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
<script setup lang="ts">
import { MessagePlugin, type DialogProps } from 'tdesign-vue-next';
import { ref } from 'vue';

// import { categoryDetail, createCategory, updateCategory, categoryTree } from '@/api/content';
const emit = defineEmits(['confirm']);
interface FormData {
  name: string;
  description: string;

  iconUrl: string;
  parentId: string;
  sortOrder: number;
  status: 'ACTIVE';
}
const visible = ref(false);
// const options = ref();
const Options = [
  { label: '未更新', value: 'not_updated' },
  { label: '已更新', value: 'updated' },
];
const id = ref(0);
const title = ref('新建');
const data = ref<FormData>({
  name: '',
  description: '123455667',
  iconUrl: '',
  parentId: '',
  sortOrder: 1,
  status: 'ACTIVE',
});

const open = (row: any) => {
  id.value = row?.id ? row.id : 0;
  title.value = row?.id ? '编辑' : '新建';
  if (row.id) {
    data.value = row;
  } else {
    data.value = {
      name: '',
      description: '123455667',
      iconUrl: '',
      parentId: '',
      sortOrder: 1,
      status: 'ACTIVE',
    };
  }
  // categoryTree().then(res => {
  //   options.value = res.data;
  // });
  // if (row?.id) {
  //   categoryDetail(row.id).then(res => {
  //     data.value = res.data;
  //   });
  // }
  visible.value = true;
};

const onConfirm: DialogProps['onConfirm'] = async () => {
  // if (!data.value.sortOrder) return MessagePlugin.error('请输入分类排序')
  // if (!data.value.name) return MessagePlugin.error('请输入分类名称');
  // if (!data.value.iconUrl) return MessagePlugin.error('请输入分类icon');
  // const fn = id.value > 0 ? updateCategory : createCategory;
  // const res = await fn(data.value);
  // MessagePlugin.success(res.message);
  visible.value = false;
  emit('confirm');
};

const onCancel: DialogProps['onCancel'] = () => {
  visible.value = false;
};

defineExpose({
  open,
});
</script>
<style lang="less" scoped></style>
