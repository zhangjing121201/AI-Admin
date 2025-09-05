import { request } from '@/utils/request';

const Api = {
  ai:'/aiaccount/api/ai-accounts',
  opera:'/aiaccount/api/ai-accounts/'
};

//  获取AI账户列表
export function getAiList(params: any) {
  console.log(params,'params```````');

 return request.get({
     url: Api.ai,
     params,
   });
}

//增加ai账户
export function addAi(data: any) {
 return request.post({
     url: Api.opera,
     data,
   });
}

//删除ai账户
export function delAi(data: any) {
  console.log(data,'data');

 return request.delete({
     url: Api.opera + data + '/',
     data,
   });
}

//获取详情
export function detailsAi(data: any) {
 return request.get({
     url: Api.opera + data,
     data,
   });
}

//修改ai账户
export function updateAi(data: any) {
 return request.put({
     url: Api.opera,
     data,
   });
}
