import { http } from '@/utils/http'
import type { MemberBrandAttention } from '@/types/memberBrandAttention'
import type { CommonPage, PageParam } from '@/types/common'

/** 添加品牌关注 */
export const createBrandAttentionAPI = (data: MemberBrandAttention) => {
  return http({
    method: 'POST',
    url: '/member/attention/add',
    data,
  })
}

/** 取消品牌关注 */
export const deleteBrandAttentionAPI = (brandId: number) => {
  return http({
    method: 'POST',
    url: '/member/attention/delete',
    params: { brandId },
  })
}

/** 获取品牌关注列表 */
export const fetchBrandAttentionListAPI = (params?: PageParam) => {
  return http<CommonPage<MemberBrandAttention>>({
    method: 'GET',
    url: '/member/attention/list',
    params,
  })
}

/** 获取品牌关注详情 */
export const getBrandAttentionDetailAPI = (brandId: number) => {
  return http<MemberBrandAttention>({
    method: 'GET',
    url: '/member/attention/detail',
    params: { brandId },
  })
}

/** 清空品牌关注 */
export const clearBrandAttentionAPI = () => {
  return http({
    method: 'POST',
    url: '/member/attention/clear',
  })
}
