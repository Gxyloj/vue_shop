import {request} from "@/network/request";

export function getUserList(queryInfo) {
  return request({
    url: '/users',
    method: 'get',
    params: {
      query: queryInfo.query,
      pagenum: queryInfo.pagenum,
      pagesize: queryInfo.pagesize
    }
  })
}

export function setUserState(userinfo) {
  return request({
    url: `users/${userinfo.id}/state/${userinfo.mg_state}`,
    method: 'put'
  })
}

export function addUser(userForm) {
  return request({
    url: '/users',
    method: 'post',
    data: {
      username:userForm.username,
      password:userForm.password,
      email:userForm.email,
      mobile:userForm.mobile
    }
  })
}
//根据ID查询用户
export function selectID(id){
  return request({
    url:`users/${id}`
  })
}

//编辑用户提交
export function editUser(userInfo){
  return request({
    url:`users/${userInfo.id}`,
    method:'put',
    data:{
      id:userInfo.id,
      email: userInfo.email,
      mobile: userInfo.mobile
    }
  })
}

export function deleteUser(id){
  return request({
    url:`users/${id}`,
    method:'delete',
    data:{
      id:id
    }
  })
}


