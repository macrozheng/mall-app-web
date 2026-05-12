/**
 * 购物车项
 * 对应后端 OmsCartItem 类型
 */
export type CartItem = {
  /** 购物车项 ID */
  id: string
  /** 会员 ID */
  memberId: string
  /** 会员昵称 */
  memberNickname: string
  /** 商品 ID */
  productId: number
  /** 商品 SKU ID */
  productSkuId: number
  /** 商品 SKU 编码 */
  productSkuCode: string
  /** 商品分类 ID */
  productCategoryId: number
  /** 商品名称 */
  productName: string
  /** 商品副标题 */
  productSubTitle: string
  /** 商品品牌 */
  productBrand: string
  /** 商品主图 */
  productPic: string
  /** 商品价格 */
  price: number
  /** 商品数量 */
  quantity: number
  /** 商品属性 JSON 字符串 */
  productAttr: string
  /** 商品编号 */
  productSn: string
  /** 创建时间 */
  createDate: string
  /** 修改时间 */
  modifyDate: string
  /** 是否删除 */
  deleteStatus: number
  /** 前端扩展字段：选中状态 */
  checked?: boolean
  /** 前端扩展字段：图片加载状态 */
  loaded?: string
  /** 前端扩展字段：属性文字 */
  spDataStr?: string
}
