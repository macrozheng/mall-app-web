/**
 * 会员品牌关注相关类型
 */

/** 会员品牌关注 - 对应后端 MemberBrandAttention Schema */
export type MemberBrandAttention = {
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
  /** 品牌ID */
  brandId?: number
  /** 品牌名称 */
  brandName?: string
  /** 品牌Logo */
  brandLogo?: string
  /** 品牌城市 */
  brandCity?: string
}
