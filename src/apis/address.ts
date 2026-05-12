import { http } from '@/utils/http'
import type { MemberReceiveAddress } from '@/types/address'

/** 获取收货地址列表 */
export const fetchAddressListAPI = () => {
  return http<MemberReceiveAddress[]>({
    method: 'GET',
    url: '/member/address/list',
  })
}

/** 获取收货地址详情 */
export const fetchAddressDetailAPI = (id: number) => {
  return http<MemberReceiveAddress>({
    method: 'GET',
    url: `/member/address/${id}`,
  })
}

/** 添加收货地址 */
export const addAddressAPI = (data: MemberReceiveAddress) => {
  return http({
    method: 'POST',
    url: '/member/address/add',
    data,
  })
}

/** 更新收货地址 */
export const updateAddressAPI = (data: MemberReceiveAddress) => {
  return http({
    method: 'POST',
    url: `/member/address/update/${data.id}`,
    data,
  })
}

/** 删除收货地址 */
export const deleteAddressAPI = (id: number) => {
  return http({
    method: 'POST',
    url: `/member/address/delete/${id}`,
  })
}
