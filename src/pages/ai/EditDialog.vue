<template>
  <t-dialog v-model:visible="visible" :width="600" :header="title" confirm-btn="保存" @confirm="onConfirm"
    @cancel="onCancel">
    <t-form ref="formRef" :model="data" label-width="80px">
      <t-form-item label="平台" name="contentType">
        <t-select v-model="data.platform" placeholder="选择平台">
          <t-option v-for="val in Options" :key="val.value" :value="val.value" :label="val.label" />
        </t-select>
      </t-form-item>
      <t-form-item label="用户名" name="name">
        <t-input v-model="data.username" placeholder="输入用户名" />
      </t-form-item>
      <t-form-item label="密码" name="name">
        <t-input v-model="data.password" placeholder="输入密码" />
      </t-form-item>
      <t-form-item label="主页地址" name="name">
        <t-input v-model="data.homepage_url" placeholder="输入主页地址" />
      </t-form-item>
      <t-form-item label="对话风格" name="name">
        <t-input v-model="data.conversation_style" placeholder="输入对话风格" />
      </t-form-item>
      <t-form-item label="补充提示词" name="name">
        <t-input v-model="data.additional_prompt" placeholder="输入补充提示词" />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
<script setup lang="ts">
import { MessagePlugin, type DialogProps } from 'tdesign-vue-next';
import { ref } from 'vue';
import { detailsAi } from '@/api/ai';
import { addAi, updateAi } from '@/api/ai';
const emit = defineEmits(['confirm']);
interface FormData {
  platform: string;
  username: string;
  password: string;
  homepage_url: string;
  conversation_style: string,
  additional_prompt: string
}
const visible = ref(false);
// const options = ref();
const Options = [
  { label: '闪圈', value: 'shanquan' },
  { label: 'TikTok', value: 'TikTok' },
  { label: 'Twitter', value: 'Twitter' },
  { label: 'Instagram', value: 'Instagram' },
  { label: '其他', value: 'other' }
];
const id = ref(0);
const title = ref('新建');
const data = ref<FormData>({
  platform: '',
  username: '',
  password: '',
  homepage_url: '',
  conversation_style: '',
  additional_prompt: ''
});

const open = (row: any) => {
  id.value = row?.id ? row.id : 0;
  title.value = row?.id ? '编辑' : '新建';
  if (row?.id) {
    detailsAi(row.id).then(res => {
      data.value = res.data;
    });
  } else {
    data.value = {
      platform: '',
      username: '',
      password: '',
      homepage_url: '',
      conversation_style: '',
      additional_prompt: ''
    }
  }
  visible.value = true;
};

const onConfirm: DialogProps['onConfirm'] = async () => {
  // if (!data.value.sortOrder) return MessagePlugin.error('请输入分类排序')
  // if (!data.value.name) return MessagePlugin.error('请输入分类名称');
  // if (!data.value.iconUrl) return MessagePlugin.error('请输入分类icon');
  const fn = id.value > 0 ? updateAi : addAi
  const res = await fn(data.value);
  MessagePlugin.success(res.message);
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
