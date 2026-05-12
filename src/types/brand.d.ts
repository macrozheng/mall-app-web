/**
 * 品牌相关类型 - 对应后端 PmsBrand Schema
 */

/** 品牌信息 */
export type PmsBrand = {
  /** 品牌ID */
  id: number
  /** 品牌名称 */
  name: string
  /** 品牌首字母 */
  firstLetter: string
  /** 排序 */
  sort: number
  /** 是否为厂家状态：0->不是；1->是 */
  factoryStatus: number
  /** 是否显示：0->不显示；1->显示 */
  showStatus: number
  /** 产品数量 */
  productCount: number
  /** 产品评论数量 */
  productCommentCount: number
  /** 品牌logo */
  logo: string
  /** 专区大图 */
  bigPic: string
  /** 品牌故事 */
  brandStory: string
  /** 品牌介绍 */
  brandDesc: string
  /** 创建时间 */
  createTime: string
}
