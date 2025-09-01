<template>
  <div class="user-list-container">
    <t-form ref="form" :data="formData" :colon="true" @submit="onSubmit" style="width: 350px">
      <t-form-item label="平台" name="name">
        <t-select
          v-model="formData.name"
          placeholder="请选择平台"
          class="demo-select-base"
          clearable
          filterable
        >
          <t-option
            v-for="(item, index) in options"
            :key="index"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}m
          </t-option>
        </t-select>
      </t-form-item>
      <t-form-item label="ID" name="id">
        <t-input v-model="formData.id" placeholder="请输入ID"></t-input>
      </t-form-item>
      <t-form-item label="Key" name="Key">
        <t-input v-model="formData.Key" placeholder="请输入Key"></t-input>
      </t-form-item>

      <t-form-item>
        <t-space size="small">
          <t-button theme="primary" type="submit">保 存</t-button>
          <t-button theme="default" variant="base" type="reset">重置</t-button>
          <!-- 下方示例代码，有效，勿删 -->

          <!--<t-button theme="default" @click="submitForm">实例方法提交</t-button>-->
          <!--<t-button theme="default" variant="base" @click="resetForm">实例方法重置</t-button>-->
          <!--<t-button theme="default" variant="base" @click="validateOnly">仅校验</t-button>-->
        </t-space>
      </t-form-item>
    </t-form>
  </div>
</template>
<script lang="tsx" setup>
import { MessagePlugin } from 'tdesign-vue-next';
import { reactive, onMounted, ref } from 'vue';

interface FormData {
  id: string;
  name: string;
  Key: string;
}

const searchForm = {
  id: '',
  name: '',
  Key: '',
};
const formData = ref<FormData>({ ...searchForm });

const options = [
  { label: '计算机学院', value: '1' },
  { label: '软件学院', value: '2' },
  { label: '物联网学院', value: '3' },
  { label: '信息安全学院', value: '4' },
  { label: '人工智能学院', value: '5' },
  { label: '网络空间安全学院', value: '6' },
];
const onSubmit = ({
  validateResult,
  firstError,
}: {
  validateResult: boolean | object;
  firstError?: string;
}) => {
  if (validateResult === true) {
    console.log('submit', formData.value);
    MessagePlugin.success('提交成功');
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
    MessagePlugin.warning(firstError || '校验失败');
  }
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
