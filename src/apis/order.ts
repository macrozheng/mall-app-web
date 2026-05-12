import { http } from '@/utils/http'
import type {
  ConfirmOrderResult,
  GenerateOrderResult,
  OrderParam,
  OmsOrderDetail,
  OmsOrderReturnApplyParam,
} from '@/types/order'
import type { CommonPage, PageParam } from '@/types/common'

/** 生成确认单信息 */
export const generateConfirmOrderAPI = (cartIds: number[]) => {
  return http<ConfirmOrderResult>({
    method: 'POST',
    url: '/order/generateConfirmOrder',
    data: cartIds,
  })
}

/** 生成订单 */
export const generateOrderAPI = (data: OrderParam) => {
  return http<GenerateOrderResult>({
    method: 'POST',
    url: '/order/generateOrder',
    data,
  })
}

/** 按状态分页获取用户订单列表 */
export const getOrderListAPI = (params: PageParam & { status: number }) => {
  return http<CommonPage<OmsOrderDetail>>({
    method: 'GET',
    url: '/order/list',
    params,
  })
}

/** 根据ID获取订单详情 */
export const getOrderDetailAPI = (orderId: number) => {
  return http<OmsOrderDetail>({
    method: 'GET',
    url: `/order/detail/${orderId}`,
  })
}

/** 用户取消订单 */
export const cancelUserOrderAPI = (orderId: number) => {
  return http({
    method: 'POST',
    url: '/order/cancelUserOrder',
    params: { orderId },
  })
}

/** 用户确认收货 */
export const confirmReceiveOrderAPI = (orderId: number) => {
  return http({
    method: 'POST',
    url: '/order/confirmReceiveOrder',
    params: { orderId },
  })
}

/** 用户删除订单 */
export const deleteOrderAPI = (orderId: number) => {
  return http({
    method: 'POST',
    url: '/order/deleteOrder',
    params: { orderId },
  })
}

/** 支付成功回调 */
export const payOrderSuccessAPI = (params: { orderId: number; payType: number }) => {
  return http({
    method: 'POST',
    url: '/order/paySuccess',
    params,
  })
}

/** 支付宝交易状态查询 */
export const fetchAliapyStatusAPI = (params: { outTradeNo: string }) => {
  return http<string>({
    method: 'GET',
    url: '/alipay/query',
    params,
  })
}

/** 申请退货 */
export const createReturnApplyAPI = (data: OmsOrderReturnApplyParam) => {
  return http({
    method: 'POST',
    url: '/returnApply/create',
    data,
  })
}
