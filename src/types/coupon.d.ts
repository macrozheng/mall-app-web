/**
 * 优惠券相关类型 - 对应后端 SmsCoupon Schema
 */

/** 优惠券信息 */
export type SmsCoupon = {
  /** ID */
  id: number
  /** 优惠券类型：0->全场赠券；1->会员赠券；2->购物赠券；3->注册赠券 */
  type: number
  /** 名称 */
  name: string
  /** 使用平台：0->全部；1->移动；2->PC */
  platform: number
  /** 数量 */
  count: number
  /** 金额 */
  amount: number
  /** 每人限领张数 */
  perLimit: number
  /** 使用门槛；0表示无门槛 */
  minPoint: number
  /** 开始时间 */
  startTime: string
  /** 结束时间 */
  endTime: string
  /** 使用类型：0->全场通用；1->指定分类；2->指定商品 */
  useType: number
  /** 优惠券码 */
  code: string
  /** 可领取的会员类型：0->无限 */
  memberLevel: number
  /** 发行数量 */
  publishCount: number
  /** 已领取数量 */
  receiveCount: number
  /** 已使用数量 */
  useCount: number
  /** 领取时间 */
  receiveTime: string
  /** 可用时间 */
  enableTime: string
  /** 创建时间 */
  createTime: string
}
