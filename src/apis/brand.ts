import { http } from '@/utils/http'
import type { PmsBrand } from '@/types/brand'
import type { PmsProduct } from '@/types/product'
import type { CommonPage, PageParam } from '@/types/common'

/** 获取品牌详情 */
export const getBrandDetailAPI = (id: number) => {
  return http<PmsBrand>({
    method: 'GET',
    url: `/brand/detail/${id}`,
  })
}

/** 品牌商品列表请求参数 */
export type BrandProductListParam = PageParam & {
  /** 品牌ID */
  brandId: number
}

/** 获取品牌商品列表 */
export const getBrandProductListAPI = (params: BrandProductListParam) => {
  return http<CommonPage<PmsProduct>>({
    method: 'GET',
    url: '/brand/productList',
    params,
  })
}

/** 获取推荐品牌列表 */
export const getBrandRecommendListAPI = (params?: PageParam) => {
  return http<PmsBrand[]>({
    method: 'GET',
    url: '/brand/recommendList',
    params,
  })
}
