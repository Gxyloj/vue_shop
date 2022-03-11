import {request} from "@/network/request";

export function getGoodsList(queryInfo){
  return request({
    url:'goods',
    methods:'get',
    params:{
      query:queryInfo.query,
      pagenum:queryInfo.pagenum,
      pagesize:queryInfo.pagesize
    }
  })
}
