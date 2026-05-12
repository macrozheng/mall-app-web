import { http } from '@/utils/http'
import type { SmsCoupon } from '@/types/coupon'

/** 商品优惠券列表 */
export const getProductCouponListAPI = (productId: string) => {
  return http<SmsCoupon[]>({
    method: 'GET',
    url: `/member/coupon/listByProduct/${productId}`,
  })
}

/** 领取优惠券 */
export const addMemberCouponAPI = (couponId: string) => {
  return http({
    method: 'POST',
    url: `/member/coupon/add/${couponId}`,
  })
}

/** 我的优惠券列表 */
export const getMemberCouponListAPI = (useStatus: number) => {
  return http<SmsCoupon[]>({
    method: 'GET',
    url: '/member/coupon/list',
    params: { useStatus },
  })
}
