import type { LoginForm } from '@/api/model/userModel';
import { request } from '@/utils/request';

const Api = {
  ImConfigList: '/imconfig/api/im-configs/',
  CreateImConfig: '/imconfig/api/im-configs/',
  ImConfigDetails: '/imconfig/api/im-configs/',
  EditImConfig: '/imconfig/api/im-configs/',
  deleteImConfig: '/imconfig/api/im-configs/',
  AIAccountsList: '/aiaccount/api/ai-accounts/',
};

//获取IM配置列表
export function getImConfigList(data: any) {
  return request.get({
    url: Api.ImConfigList,
    data,
  });
}
// 创建IM配置
export function createImConfig(data: any) {
  return request.post({
    url: Api.CreateImConfig,
    data,
  });
}
// 获取单个IM配置详情
export function getImConfigDetails(id: any) {
  return request.get({
    url: Api.ImConfigDetails + id,
  });
}

// 编辑IM配置
export function editImConfig(id: any, data: any) {
  return request.put({
    url: Api.EditImConfig + id + '/',
    data,
  });
}
//删除IM配置
export function deleteImConfig(id: any) {
  return request.delete({
    url: Api.deleteImConfig + id + '/',
  });
}
//获取AI账户列表
export function getAiAccountList(data: any) {
  return request.get({
    url: Api.AIAccountsList,
    data,
  });
}
