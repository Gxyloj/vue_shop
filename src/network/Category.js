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

export function getParentCategoryList(listType){
  return request({
    url:'categories',
    method:'get',
    params:{
      type:listType
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



export function deleteCategory(cateID){
  return request({
    url:`categories/${cateID}`,
    method:'delete'
  })
}

export function addCategory(cateInfo){
  return request({
    url:'categories',
    method:'post',
    data:{
      cat_pid:cateInfo.cat_pid,
      cat_name:cateInfo.cat_name,
      cat_level: cateInfo.cat_level
    }
  })
}

export function getCategoryAttributes(ID,type){
  return request({
    url:`categories/${ID}/attributes`,
    method:'get',
    params:{
      sel:type
    }
  })
}

export function addParams(data){
  return request({
    url:`categories/${data.cat_id}/attributes`,
    method:'post',
    data:{
      attr_name:data.attr_name,
      attr_sel:data.attr_sel,

    }
  })
}

export function deleteParams(data){
  return request({
    url:`categories/${data.cat_id}/attributes/${data.attr_id}`,
    method:'delete'
  })
}

export function editParams(data){
  return request({
    url:`categories/${data.cat_id}/attributes/${data.attr_id}`,
    method:'put',
    data:{
      attr_name:data.attr_name,
      attr_sel:data.attr_sel,
      // attr_vals:data.attr_vals
      attr_vals:typeof data.attr_vals === 'string' ?
        data.attr_vals : data.attr_vals.toString()
    }
  })
}
