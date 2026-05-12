/**
 * 会员浏览记录相关类型
 */

/** 会员浏览记录 - 对应后端 MemberReadHistory Schema */
export type MemberReadHistory = {
  /** ID */
  id?: string
  /** 创建时间 */
  createTime?: string
  /** 会员头像 */
  memberIcon?: string
  /** 会员ID */
  memberId?: number
  /** 会员昵称 */
  memberNickname?: string
  /** 商品ID */
  productId: number
  /** 商品名称 */
  productName: string
  /** 商品图片 */
  productPic: string
  /** 商品价格 */
  productPrice: string
  /** 商品副标题 */
  productSubTitle: string
}
