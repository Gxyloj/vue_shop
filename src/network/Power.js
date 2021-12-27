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
