import { http } from '@/utils/http'
import type { MemberProductCollection } from '@/types/memberProductCollection'
import type { CommonPage, PageParam } from '@/types/common'

/** 创建商品收藏 */
export const createProductCollectionAPI = (data: MemberProductCollection) => {
  return http({
    method: 'POST',
    url: '/member/productCollection/add',
    data,
  })
}

/** 删除商品收藏 */
export const deleteProductCollectionAPI = (params: { productId: number }) => {
  return http({
    method: 'POST',
    url: '/member/productCollection/delete',
    params,
  })
}

/** 获取商品收藏列表 */
export const fetchProductCollectionListAPI = (params: PageParam) => {
  return http<CommonPage<MemberProductCollection>>({
    method: 'GET',
    url: '/member/productCollection/list',
    params,
  })
}

/** 查询商品收藏详情 */
export const getProductCollectionDetailAPI = (params: { productId: number }) => {
  return http<MemberProductCollection>({
    method: 'GET',
    url: '/member/productCollection/detail',
    params,
  })
}

/** 清空商品收藏 */
export const clearProductCollectionAPI = () => {
  return http({
    method: 'POST',
    url: '/member/productCollection/clear',
  })
}
