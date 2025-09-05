<template>
  <t-dialog v-model:visible="visible" :width="600" :header="title" confirm-btn="保存" @confirm="onConfirm"
    @cancel="onCancel">
    <t-form ref="formRef" :model="data" label-width="80px">
      <t-form-item label="AI账户" name="ai_account">
        <t-select v-model="data.ai_account" placeholder="请选择AI账户" class="demo-select-base" clearable filterable>
          <t-option v-for="(item, index) in options" :key="index" :value="item.id" :label="item.username">
            {{ item.username }}
          </t-option>
        </t-select>
      </t-form-item>

      <!-- <t-form-item label="主页地址" name="ai_account_username">
        <t-input v-model="data.ai_account_username" placeholder="输入主页地址" />
      </t-form-item> -->
      <t-form-item label="回复风格" name="reply_style">
        <t-input v-model="data.reply_style" placeholder="输入回复风格" />
      </t-form-item>
      <t-form-item label="回复提示词" name="reply_prompt">
        <t-textarea v-model="data.reply_prompt" placeholder="输入回复提示词" />
      </t-form-item>
      <t-form-item label="历史范围(条)" name="history_range">
        <t-input v-model="data.history_range" placeholder="输入历史范围" />
      </t-form-item>
      <t-form-item label="查询周期(秒)" name="query_cycle">
        <t-input v-model="data.query_cycle" placeholder="输入查询周期" />
      </t-form-item>
      <t-form-item label="是否激活" name="is_active">
        <t-switch v-model="data.is_active" :default-value="true" />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
<script setup lang="ts">
import { MessagePlugin, type DialogProps } from 'tdesign-vue-next';
import { ref } from 'vue';

import { createImConfig, getImConfigDetails, editImConfig, getAiAccountList } from '@/api/im';
const emit = defineEmits(['confirm']);
interface FormData {
  ai_account: string;
  ai_account_username: string;
  reply_style: string;
  history_range: string;
  reply_prompt: string;
  query_cycle: string;
  is_active: boolean;
}
const visible = ref(false);
const options = ref<Array<{ id: string; username: string }>>([]);
const id = ref(0);
const title = ref('新建IM提示词');
const data = ref<FormData>({
  ai_account: '',
  ai_account_username: '',
  reply_style: '',
  history_range: '',
  reply_prompt: '',

  query_cycle: '',
  is_active: true,
});

const open = (row: any) => {
  id.value = row?.id ? row.id : 0;
  title.value = row?.id ? '编辑IM提示词' : '新建IM提示词';
  if (row.id) {
    data.value = {
      ai_account: row.ai_account || '',
      ai_account_username: row.ai_account_username || '',
      reply_style: row.reply_style || '',
      history_range: row.history_range || '',
      reply_prompt: row.reply_prompt || '',
      query_cycle: row.query_cycle || '',
      is_active: typeof row.is_active === 'boolean' ? row.is_active : true,
    };
  } else {
    data.value = {
      ai_account: '',
      ai_account_username: '',
      reply_style: '',
      history_range: '',
      reply_prompt: '',
      query_cycle: '',
      is_active: true,
    };
  }
  getAiAccountList({}).then(res => {
    options.value = res.data;
    console.log(options.value, 'XUANZE');
  });
  if (row?.id) {
    getImConfigDetails(row.id).then(res => {
      data.value = res.data;
      console.log(data.value, 'DETAILS');
    });
  }
  visible.value = true;
};

const onConfirm: DialogProps['onConfirm'] = async () => {
  if (!data.value.ai_account) return MessagePlugin.error('请选择AI账户');
  if (!data.value.reply_style) return MessagePlugin.error('请输入回复风格');
  if (!data.value.reply_prompt) return MessagePlugin.error('请输入回复提示词');
  let res;
  if (id.value > 0) {
    res = await editImConfig(id.value, data.value);
  } else {
    res = await createImConfig(data.value);
  }
  console.log(res, 'RES');
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
