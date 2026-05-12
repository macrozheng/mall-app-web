/**
 * 商品相关类型
 */

import type { PmsBrand } from './brand'
import type { SmsCoupon } from './coupon'
import type { PageParam } from './common'

/** 商品信息 */
export type PmsProduct = {
  /** 商品ID */
  id: number
  /** 品牌ID */
  brandId: number
  /** 品牌名称 */
  brandName: string
  /** 分类ID */
  productCategoryId: number
  /** 分类名称 */
  productCategoryName: string
  /** 商品名称 */
  name: string
  /** 图片 */
  pic: string
  /** 画册图片 */
  albumPics: string
  /** 上架状态：0->下架；1->上架 */
  publishStatus: number
  /** 新品状态：0->不是新品；1->新品 */
  newStatus: number
  /** 推荐状态：0->不推荐；1->推荐 */
  recommandStatus: number
  /** 审核状态：0->未审核；1->审核通过 */
  verifyStatus: number
  /** 排序 */
  sort: number
  /** 价格 */
  price: number
  /** 原价 */
  originalPrice: number
  /** 销量 */
  sale: number
  /** 库存 */
  stock: number
  /** 促销价格 */
  promotionPrice: number
  /** 促销类型：0->无促销；1->单品优惠；2->会员优惠；3->多买优惠；4->满减优惠；5->限时优惠 */
  promotionType: number
  /** 促销开始时间 */
  promotionStartTime: string
  /** 促销结束时间 */
  promotionEndTime: string
  /** 副标题 */
  subTitle: string
  /** 商品描述 */
  description: string
  /** 详情标题 */
  detailTitle: string
  /** 详情描述（移动端HTML） */
  detailMobileHtml: string
  /** 商品编码 */
  productSn: string
  /** 服务ID列表 */
  serviceIds: string
  /** 创建时间 */
  createTime: string
  /** 更新时间 */
  updateTime: string
  /** 秒杀价格 */
  flashPromotionPrice?: number
  /** 秒杀数量 */
  flashPromotionCount?: number
  /** 秒杀限购数量 */
  flashPromotionLimit?: number
}

/** 商品分类信息 - 对应后端 PmsProductCategory Schema */
export type PmsProductCategory = {
  /** ID */
  id: number
  /** 上级分类的编号：0表示一级分类 */
  parentId: number
  /** 分类名称 */
  name: string
  /** 分类级别：0->1级；1->2级 */
  level: number
  /** 排序 */
  sort: number
  /** 图标 */
  icon: string
  /** 商品数量 */
  productCount: number
  /** 商品单位 */
  productUnit: string
  /** 是否显示在导航栏：0->不显示；1->显示 */
  navStatus: number
  /** 显示状态：0->不显示；1->显示 */
  showStatus: number
  /** 描述 */
  description: string
  /** 关键字 */
  keywords: string
  /** 创建时间 */
  createTime: string
}

/** 商品分类树节点 */
export type CategoryTreeNode = {
  /** 分类ID */
  id: number
  /** 分类名称 */
  name: string
  /** 子分类列表 */
  children?: CategoryTreeNode[]
}

/** 商品列表搜索请求参数 */
export type ProductListParam = PageParam & {
  /** 商品分类ID */
  productCategoryId?: number
  /** 排序方式：0->综合排序；2->销量；3->价格从低到高；4->价格从高到低 */
  sort: number
}

/** 商品属性 - 对应后端 PmsProductAttribute Schema */
export type PmsProductAttribute = {
  /** 属性ID */
  id: number
  /** 属性名称 */
  name: string
  /** 属性的类型；0->规格；1->参数 */
  type: number
  /** 是否支持手动新增；0->不支持；1->支持 */
  handAddStatus: number
  /** 可选值列表，以逗号隔开 */
  inputList: string
  /** 属性分类ID */
  productAttributeCategoryId: number
  /** 检索类型；0->不需要进行检索；1->关键字检索；2->范围检索 */
  searchType: number
  /** 属性选择类型：0->唯一；1->单选；2->多选 */
  selectType: number
  /** 相同属性产品是否关联；0->不关联；1->关联 */
  relatedStatus: number
  /** 排序字段：最高的可以单独上传图片 */
  sort: number
}

/** 商品属性值 - 对应后端 PmsProductAttributeValue Schema */
export type PmsProductAttributeValue = {
  /** ID */
  id: number
  /** 属性ID */
  productAttributeId: number
  /** 商品ID */
  productId: number
  /** 手动添加规格或参数的值，参数单值，规格有多个时以逗号隔开 */
  value: string
}

/** 商品SKU库存 - 对应后端 PmsSkuStock Schema */
export type PmsSkuStock = {
  /** SKU ID */
  id: number
  /** sku编码 */
  skuCode: string
  /** 价格 */
  price: number
  /** 库存 */
  stock: number
  /** 单品促销价格 */
  promotionPrice?: number
  /** 商品销售属性，json格式 */
  spData: string
  /** 锁定库存 */
  lockStock: number
  /** 预警库存 */
  lowStock: number
  /** 展示图片 */
  pic: string
  /** 商品ID */
  productId: number
  /** 销量 */
  sale: number
}

/** 商品满减价格 - 对应后端 PmsProductFullReduction Schema */
export type PmsProductFullReduction = {
  /** ID */
  id: number
  /** 商品ID */
  productId: number
  /** 满金额 */
  fullPrice: number
  /** 减金额 */
  reducePrice: number
}

/** 商品阶梯价格 - 对应后端 PmsProductLadder Schema */
export type PmsProductLadder = {
  /** ID */
  id: number
  /** 商品ID */
  productId: number
  /** 满足的商品数量 */
  count: number
  /** 折扣 */
  discount: number
  /** 折后价格 */
  price: number
}

/** 商品详情响应结果 - 对应后端 PmsPortalProductDetail Schema */
export type PmsPortalProductDetail = {
  /** 商品信息 */
  product: PmsProduct
  /** 品牌信息 */
  brand: PmsBrand
  /** 商品属性与参数 */
  productAttributeList: PmsProductAttribute[]
  /** 手动录入的商品属性与参数值 */
  productAttributeValueList: PmsProductAttributeValue[]
  /** 商品的sku库存信息 */
  skuStockList: PmsSkuStock[]
  /** 商品满减价格设置 */
  productFullReductionList: PmsProductFullReduction[]
  /** 商品阶梯价格设置 */
  productLadderList: PmsProductLadder[]
  /** 商品可用优惠券 */
  couponList: SmsCoupon[]
}

/** 规格选项（前端专用） */
export type SpecOption = {
  /** 规格ID */
  pid: number
  /** 规格名称 */
  pname: string
  /** 规格值 */
  name: string
  /** 是否选中 */
  selected?: boolean
}

/** 服务项（前端专用） */
export type ServiceItem = {
  /** 服务ID */
  id: number
  /** 服务名称 */
  name: string
}

/** 分享项（前端专用） */
export type ShareItem = {
  /** 分享类型 */
  type: number
  /** 图标 */
  icon: string
  /** 文字 */
  text: string
}
