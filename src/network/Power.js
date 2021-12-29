import {request} from "@/network/request";

export function getRightsList(type) {
  return request({
    url: `/rights/${type}`
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

export function deleteRole(id){
  return request({
    url:`roles/${id}`,
    method:'delete'
  })
}

export function removeRights(roleID,rightsID){
  return request({
    url:`roles/${roleID}/rights/${rightsID}`,
    method:'delete'
  })
}

export function roleAuthorization(roleID,keys){
  return request({
    url:`roles/${roleID}/rights`,
    method:'post',
    data:{
      rids:keys
    }
  })
}
