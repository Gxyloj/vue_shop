import {request} from "@/network/request";

export function getCategoryList(queryInfo){
  return request({
    url:'categories',
    method:'get',
    params:{
      queryInfo
    }
  })
}
