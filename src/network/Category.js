import {request} from "@/network/request";




export function getCategoryList(queryInfo){
  return request({
    url:'categories',
    method:'get',
    params:{
      type:queryInfo.type,
      pagesize:queryInfo.pagesize,
      pagenum:queryInfo.pagenum
    }
  })
}

export function editCategory(cateInfo) {
  return request({
    url:`categories/${cateInfo.cat_id}`,
    method:'put',
    data:{
      cat_name:cateInfo.cat_name
    }
  })
}
