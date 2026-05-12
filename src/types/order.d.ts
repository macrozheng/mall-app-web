/**
 * 订单相关类型
 */

import type { MemberReceiveAddress } from './address'
import type { SmsCoupon } from './coupon'

/** 购物车促销项 */
export type CartPromotionItem = {
  /** ID */
  id: number
  /** 商品ID */
  productId: number
  /** 商品名称 */
  productName: string
  /** 商品主图 */
  productPic: string
  /** 商品销售属性 JSON 字符串 */
  productAttr: string
  /** 商品品牌 */
  productBrand: string
  /** 商品分类ID */
  productCategoryId: number
  /** 商品SKU条码 */
  productSkuCode: string
  /** 商品SKU ID */
  productSkuId: number
  /** 商品编号 */
  productSn: string
  /** 商品副标题（卖点） */
  productSubTitle: string
  /** 促销活动信息 */
  promotionMessage: string
  /** 商品价格 */
  price: number
  /** 购买数量 */
  quantity: number
  /** 促销活动减去的金额 */
  reduceAmount: number
  /** 剩余库存-锁定库存 */
  realStock: number
  /** 购买商品赠送积分 */
  integration: number
  /** 购买商品赠送成长值 */
  growth: number
  /** 会员ID */
  memberId: number
  /** 会员昵称 */
  memberNickname: string
  /** 创建时间 */
  createDate: string
  /** 修改时间 */
  modifyDate: string
  /** 是否删除 */
  deleteStatus: number
}

/** 计算金额 */
export type CalcAmount = {
  /** 商品合计金额 */
  totalAmount: number
  /** 运费 */
  freightAmount: number
  /** 活动优惠金额 */
  promotionAmount: number
  /** 应付金额 */
  payAmount: number
}

/** 积分消费设置 */
export type UmsIntegrationConsumeSetting = {
  /** ID */
  id: number
  /** 是否可以和优惠券同用；0->不可以；1->可以 */
  couponStatus: number
  /** 每一元需要抵扣的积分数量 */
  deductionPerAmount: number
  /** 每笔订单最高抵用百分比 */
  maxPercentPerOrder: number
  /** 每次使用积分最小单位100 */
  useUnit: number
}

/** 优惠券历史详情 */
export type SmsCouponHistoryDetail = {
  /** ID */
  id: number
  /** 优惠券ID */
  couponId: number
  /** 优惠券码 */
  couponCode: string
  /** 会员ID */
  memberId: number
  /** 领取人昵称 */
  memberNickname: string
  /** 优惠券信息 */
  coupon: SmsCoupon
  /** 获取类型：0->后台赠送；1->主动获取 */
  getType: number
  /** 使用状态：0->未使用；1->已使用；2->已过期 */
  useStatus: number
  /** 使用时间 */
  useTime: string
  /** 创建时间 */
  createTime: string
  /** 订单编号 */
  orderId: number
  /** 订单号码 */
  orderSn: string
}

/** 确认订单返回结果 */
export type ConfirmOrderResult = {
  /** 收货地址列表 */
  memberReceiveAddressList: MemberReceiveAddress[]
  /** 购物车促销商品列表 */
  cartPromotionItemList: CartPromotionItem[]
  /** 用户可用优惠券列表 */
  couponHistoryDetailList: SmsCouponHistoryDetail[]
  /** 计算金额 */
  calcAmount: CalcAmount
  /** 积分消费设置 */
  integrationConsumeSetting: UmsIntegrationConsumeSetting
  /** 会员持有的积分 */
  memberIntegration: number
}

/** 创建订单请求参数（对应API文档 OrderParam） */
export type OrderParam = {
  /** 支付方式：0->未支付；1->支付宝；2->微信 */
  payType: number
  /** 优惠券ID */
  couponId?: number
  /** 被选中的购物车商品ID列表 */
  cartIds: number[]
  /** 收货地址ID */
  memberReceiveAddressId?: number
  /** 使用的积分数 */
  useIntegration: number
}

/** 生成订单返回结果（对应后端 OrderResult） */
export type GenerateOrderResult = {
  /** 订单信息 */
  order: OmsOrderDetail
  /** 订单商品列表 */
  orderItemsList: OmsOrderItem[]
}

/** 订单商品项 */
export type OmsOrderItem = {
  /** ID */
  id: number
  /** 订单ID */
  orderId: number
  /** 订单编号 */
  orderSn: string
  /** 商品ID */
  productId: number
  /** 商品名称 */
  productName: string
  /** 商品主图 */
  productPic: string
  /** 商品销售属性 JSON 字符串 */
  productAttr: string
  /** 商品品牌 */
  productBrand: string
  /** 商品分类ID */
  productCategoryId: number
  /** 商品SKU ID */
  productSkuId: number
  /** 商品SKU条码 */
  productSkuCode: string
  /** 商品编号 */
  productSn: string
  /** 销售价格 */
  productPrice: number
  /** 购买数量 */
  productQuantity: number
  /** 商品促销名称 */
  promotionName: string
  /** 商品促销分解金额 */
  promotionAmount: number
  /** 优惠券优惠分解金额 */
  couponAmount: number
  /** 积分优惠分解金额 */
  integrationAmount: number
  /** 该商品经过优惠后的分解金额 */
  realAmount: number
  /** 购买商品赠送积分 */
  giftIntegration: number
  /** 购买商品赠送成长值 */
  giftGrowth: number
}

/** 订单详情（对应API文档 OmsOrderDetail） */
export type OmsOrderDetail = {
  /** 订单ID */
  id: number
  /** 订单编号 */
  orderSn: string
  /** 会员ID */
  memberId: number
  /** 用户帐号 */
  memberUsername: string
  /** 订单总金额 */
  totalAmount: number
  /** 运费金额 */
  freightAmount: number
  /** 促销优化金额 */
  promotionAmount: number
  /** 优惠券抵扣金额 */
  couponAmount: number
  /** 积分抵扣金额 */
  integrationAmount: number
  /** 应付金额 */
  payAmount: number
  /** 支付方式：0->未支付；1->支付宝；2->微信 */
  payType: number
  /** 订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->无效订单 */
  status: number
  /** 订单类型：0->正常订单；1->秒杀订单 */
  orderType: number
  /** 订单来源：0->PC订单；1->app订单 */
  sourceType: number
  /** 活动信息 */
  promotionInfo: string
  /** 可以获得的积分 */
  integration: number
  /** 可以活动的成长值 */
  growth: number
  /** 下单时使用的积分 */
  useIntegration: number
  /** 优惠券ID */
  couponId: number
  /** 订单备注 */
  note: string
  /** 提交时间 */
  createTime: string
  /** 支付时间 */
  paymentTime: string
  /** 发货时间 */
  deliveryTime: string
  /** 评价时间 */
  commentTime: string
  /** 确认收货状态：0->未确认；1->已确认 */
  confirmStatus: number
  /** 删除状态：0->未删除；1->已删除 */
  deleteStatus: number
  /** 收货人姓名 */
  receiverName: string
  /** 收货人电话 */
  receiverPhone: string
  /** 省份/直辖市 */
  receiverProvince: string
  /** 城市 */
  receiverCity: string
  /** 区 */
  receiverRegion: string
  /** 详细地址 */
  receiverDetailAddress: string
  /** 收货人邮编 */
  receiverPostCode: string
  /** 物流公司 */
  deliveryCompany: string
  /** 物流单号 */
  deliverySn: string
  /** 管理员后台调整订单使用的折扣金额 */
  discountAmount: number
  /** 自动确认时间（天） */
  autoConfirmDay: number
  /** 发票类型：0->不开发票；1->电子发票；2->纸质发票 */
  billType: number
  /** 发票抬头 */
  billHeader: string
  /** 发票内容 */
  billContent: string
  /** 收票人电话 */
  billReceiverPhone: string
  /** 收票人邮箱 */
  billReceiverEmail: string
  /** 订单商品列表 */
  orderItemList: OmsOrderItem[]
}

/** 退货申请请求参数 */
export type OmsOrderReturnApplyParam = {
  /** 订单ID */
  orderId: number
  /** 订单编号 */
  orderSn: string
  /** 会员用户名 */
  memberUsername: string
  /** 退货商品ID */
  productId: number
  /** 商品名称 */
  productName: string
  /** 商品图片 */
  productPic: string
  /** 商品销售属性 */
  productAttr: string
  /** 商品品牌 */
  productBrand: string
  /** 商品单价 */
  productPrice: number
  /** 商品实际支付单价 */
  productRealPrice: number
  /** 退货数量 */
  productCount: number
  /** 原因 */
  reason: string
  /** 描述 */
  description: string
  /** 凭证图片，以逗号隔开 */
  proofPics: string
  /** 退货人姓名 */
  returnName: string
  /** 退货人电话 */
  returnPhone: string
}
