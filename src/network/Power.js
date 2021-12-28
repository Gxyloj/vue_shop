import {request} from "@/network/request";

export function getRightsList() {
  return request({
    url: '/rights/list'
  })
}

export function getRolesList() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function addRole(roleInfo) {
  return request({
    url: 'roles',
    method: 'post',
    data: {
      roleName: roleInfo.roleName,
      roleDesc: roleInfo.roleDesc
    }
  })
}

export function selectRoleID(id){
  return request({
    url:`roles/${id}`,
    method:'get',

  })
}

export function editRole(roleInfo){
  return request({
    url:`roles/${roleInfo.roleId}`,
    method:'put',
    data:{
      roleName:roleInfo.roleName,
      roleDesc:roleInfo.roleDesc
    }
  })
}
