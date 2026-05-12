import { http } from '@/utils/http'
import type { MemberReadHistory } from '@/types/memberReadHistory'
import type { CommonPage, PageParam } from '@/types/common'

/** 创建浏览记录 */
export const createReadHistoryAPI = (data: MemberReadHistory) => {
  return http({
    method: 'POST',
    url: '/member/readHistory/create',
    data,
  })
}

/** 删除浏览记录 */
export const deleteReadHistoryAPI = (params: { ids: string[] }) => {
  return http({
    method: 'POST',
    url: '/member/readHistory/delete',
    params,
  })
}

/** 获取浏览记录列表 */
export const fetchReadHistoryListAPI = (params: PageParam) => {
  return http<CommonPage<MemberReadHistory>>({
    method: 'GET',
    url: '/member/readHistory/list',
    params,
  })
}

/** 清空浏览记录 */
export const clearReadHistoryAPI = () => {
  return http({
    method: 'POST',
    url: '/member/readHistory/clear',
  })
}
