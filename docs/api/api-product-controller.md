# PmsPortalProductController - 商品管理接口文档

> 数据来源：[Swagger UI](https://portal-api.macrozheng.com/swagger-ui/) - PmsPortalProductController
>
> 通用模型定义见 [api-common-models.md](./api-common-models.md)（CommonResult、CommonPage、PageParam）

---

## 接口列表

| #   | 方法 | 路径                        | 说明                       |
| --- | ---- | --------------------------- | -------------------------- |
| 1   | GET  | `/product/categoryTreeList` | 以树形结构获取所有商品分类 |
| 2   | GET  | `/product/detail/{id}`      | 获取前台商品详情           |
| 3   | GET  | `/product/search`           | 综合搜索、筛选、排序       |

---

## 1. 以树形结构获取所有商品分类

**GET** `/product/categoryTreeList`

### 请求参数

无

### 响应结果

`CommonResult<List<PmsProductCategoryNode>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [PmsProductCategoryNode](#pmsproductcategorynode)[]

---

## 2. 获取前台商品详情

**GET** `/product/detail/{id}`

### 请求参数

Path 参数：

| 参数名 | 类型           | 必填 | 说明    |
| ------ | -------------- | ---- | ------- |
| id     | number (int64) | 是   | 商品 ID |

### 响应结果

`CommonResult<PmsPortalProductDetail>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [PmsPortalProductDetail](#pmsportalproductdetail)

---

## 3. 综合搜索、筛选、排序

**GET** `/product/search`

支持按关键字搜索、按分类筛选、按品牌筛选、多种排序方式。

### 请求参数

Query 参数：

| 参数名            | 类型           | 必填 | 说明                                                                          |
| ----------------- | -------------- | ---- | ----------------------------------------------------------------------------- |
| keyword           | string         | 否   | 搜索关键字                                                                    |
| brandId           | number (int64) | 否   | 品牌 ID                                                                       |
| productCategoryId | number (int64) | 否   | 商品分类 ID                                                                   |
| sort              | number (int32) | 否   | 排序字段：0→ 按相关度；1→ 按新品；2→ 按销量；3→ 价格从低到高；4→ 价格从高到低 |
| pageNum           | number (int32) | 否   | 页码                                                                          |
| pageSize          | number (int32) | 否   | 每页数量                                                                      |

### 响应结果

`CommonResult<CommonPage<PmsProduct>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 CommonPage\<[PmsProduct](#pmsproduct)\>

---

## 数据模型

### PmsProduct

商品，对应后端 `PmsProduct` 模型

| 字段名                     | 类型               | 说明                                                                                                     |
| -------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------- |
| id                         | number (int64)     | 商品 ID                                                                                                  |
| name                       | string             | 商品名称                                                                                                 |
| pic                        | string             | 商品图片                                                                                                 |
| productSn                  | string             | 货号                                                                                                     |
| brandId                    | number (int64)     | 品牌 ID                                                                                                  |
| brandName                  | string             | 品牌名称                                                                                                 |
| productCategoryId          | number (int64)     | 商品分类 ID                                                                                              |
| productCategoryName        | string             | 商品分类名称                                                                                             |
| productAttributeCategoryId | number (int64)     | 商品属性分类 ID                                                                                          |
| price                      | number             | 商品价格                                                                                                 |
| originalPrice              | number             | 市场价                                                                                                   |
| promotionPrice             | number             | 促销价格                                                                                                 |
| promotionType              | number (int32)     | 促销类型：0→ 没有促销使用原价；1→ 使用促销价；2→ 使用会员价；3→ 使用阶梯价格；4→ 使用满减价格；5→ 限时购 |
| promotionStartTime         | string (date-time) | 促销开始时间                                                                                             |
| promotionEndTime           | string (date-time) | 促销结束时间                                                                                             |
| promotionPerLimit          | number (int32)     | 活动限购数量                                                                                             |
| subTitle                   | string             | 副标题                                                                                                   |
| description                | string             | 商品描述                                                                                                 |
| unit                       | string             | 单位                                                                                                     |
| weight                     | number             | 商品重量，默认为克                                                                                       |
| sort                       | number (int32)     | 排序                                                                                                     |
| sale                       | number (int32)     | 销量                                                                                                     |
| stock                      | number (int32)     | 库存                                                                                                     |
| lowStock                   | number (int32)     | 库存预警值                                                                                               |
| keywords                   | string             | 关键字                                                                                                   |
| note                       | string             | 备注                                                                                                     |
| albumPics                  | string             | 画册图片，连产品图片限制为 5 张，以逗号分割                                                              |
| detailTitle                | string             | 详情标题                                                                                                 |
| detailDesc                 | string             | 详情描述                                                                                                 |
| detailHtml                 | string             | 产品详情网页内容                                                                                         |
| detailMobileHtml           | string             | 移动端网页详情                                                                                           |
| publishStatus              | number (int32)     | 上架状态：0→ 下架；1→ 上架                                                                               |
| newStatus                  | number (int32)     | 新品状态：0→ 不是新品；1→ 新品                                                                           |
| recommandStatus            | number (int32)     | 推荐状态：0→ 不推荐；1→ 推荐                                                                             |
| verifyStatus               | number (int32)     | 审核状态：0→ 未审核；1→ 审核通过                                                                         |
| previewStatus              | number (int32)     | 是否为预告商品：0→ 不是；1→ 是                                                                           |
| deleteStatus               | number (int32)     | 删除状态：0→ 未删除；1→ 已删除                                                                           |
| giftGrowth                 | number (int32)     | 赠送的成长值                                                                                             |
| giftPoint                  | number (int32)     | 赠送的积分                                                                                               |
| usePointLimit              | number (int32)     | 限制使用的积分数                                                                                         |
| feightTemplateId           | number (int64)     | 运费模板 ID                                                                                              |
| serviceIds                 | string             | 以逗号分割的产品服务：1→ 无忧退货；2→ 快速退款；3→ 免费包邮                                              |

### PmsPortalProductDetail

商品详情聚合，对应后端 `PmsPortalProductDetail` 模型

| 字段名                    | 类型                                                           | 说明                       |
| ------------------------- | -------------------------------------------------------------- | -------------------------- |
| product                   | [PmsProduct](#pmsproduct)                                      | 商品信息                   |
| brand                     | [PmsBrand](./api-brand-controller.md#pmsbrand)                 | 商品品牌                   |
| productAttributeList      | array\<[PmsProductAttribute](#pmsproductattribute)\>           | 商品属性与参数             |
| productAttributeValueList | array\<[PmsProductAttributeValue](#pmsproductattributevalue)\> | 手动录入的商品属性与参数值 |
| skuStockList              | array\<[PmsSkuStock](#pmsskustock)\>                           | 商品的 SKU 库存信息        |
| productLadderList         | array\<[PmsProductLadder](#pmsproductladder)\>                 | 商品阶梯价格设置           |
| productFullReductionList  | array\<[PmsProductFullReduction](#pmsproductfullreduction)\>   | 商品满减价格设置           |
| couponList                | array\<[SmsCoupon](./api-coupon-controller.md#smscoupon)\>     | 商品可用优惠券             |

### PmsProductCategory

商品分类，对应后端 `PmsProductCategory` 模型

| 字段名       | 类型           | 说明                                 |
| ------------ | -------------- | ------------------------------------ |
| id           | number (int64) | 分类 ID                              |
| parentId     | number (int64) | 上级分类的编号：0 表示一级分类       |
| name         | string         | 分类名称                             |
| level        | number (int32) | 分类级别：0→1 级；1→2 级             |
| icon         | string         | 图标                                 |
| productCount | number (int32) | 产品数量                             |
| productUnit  | string         | 产品单位                             |
| navStatus    | number (int32) | 是否显示在导航栏：0→ 不显示；1→ 显示 |
| showStatus   | number (int32) | 显示状态：0→ 不显示；1→ 显示         |
| sort         | number (int32) | 排序                                 |
| keywords     | string         | 关键字                               |
| description  | string         | 描述                                 |

### PmsProductCategoryNode

商品分类树节点，对应后端 `PmsProductCategoryNode` 模型

继承 PmsProductCategory 的所有字段，并新增：

| 字段名   | 类型                                                       | 说明       |
| -------- | ---------------------------------------------------------- | ---------- |
| children | array\<[PmsProductCategoryNode](#pmsproductcategorynode)\> | 子分类集合 |

### PmsProductAttribute

商品属性，对应后端 `PmsProductAttribute` 模型

| 字段名                     | 类型           | 说明                                            |
| -------------------------- | -------------- | ----------------------------------------------- |
| id                         | number (int64) | 属性 ID                                         |
| productAttributeCategoryId | number (int64) | 属性分类 ID                                     |
| name                       | string         | 属性名称                                        |
| type                       | number (int32) | 属性的类型：0→ 规格；1→ 参数                    |
| sort                       | number (int32) | 排序字段：最高的可以单独上传图片                |
| selectType                 | number (int32) | 属性选择类型：0→ 唯一；1→ 单选；2→ 多选         |
| inputType                  | number (int32) | 属性录入方式：0→ 手工录入；1→ 从列表中选取      |
| inputList                  | string         | 可选值列表，以逗号隔开                          |
| filterType                 | number (int32) | 分类筛选样式：0→ 普通；1→ 颜色                  |
| searchType                 | number (int32) | 检索类型：0→ 不需要；1→ 关键字检索；2→ 范围检索 |
| relatedStatus              | number (int32) | 相同属性产品是否关联：0→ 不关联；1→ 关联        |
| handAddStatus              | number (int32) | 是否支持手动新增：0→ 不支持；1→ 支持            |

### PmsProductAttributeValue

商品属性值，对应后端 `PmsProductAttributeValue` 模型

| 字段名             | 类型           | 说明                                                     |
| ------------------ | -------------- | -------------------------------------------------------- |
| id                 | number (int64) | 记录 ID                                                  |
| productId          | number (int64) | 商品 ID                                                  |
| productAttributeId | number (int64) | 属性 ID                                                  |
| value              | string         | 手动添加规格或参数的值，参数单值，规格有多个时以逗号隔开 |

### PmsSkuStock

SKU 库存，对应后端 `PmsSkuStock` 模型

| 字段名         | 类型           | 说明                    |
| -------------- | -------------- | ----------------------- |
| id             | number (int64) | 记录 ID                 |
| productId      | number (int64) | 商品 ID                 |
| skuCode        | string         | SKU 编码                |
| price          | number         | 价格                    |
| promotionPrice | number         | 单品促销价格            |
| stock          | number (int32) | 库存                    |
| lockStock      | number (int32) | 锁定库存                |
| lowStock       | number (int32) | 预警库存                |
| sale           | number (int32) | 销量                    |
| spData         | string         | 商品销售属性，JSON 格式 |
| pic            | string         | 展示图片                |

### PmsProductLadder

商品阶梯价格，对应后端 `PmsProductLadder` 模型

| 字段名    | 类型           | 说明           |
| --------- | -------------- | -------------- |
| id        | number (int64) | 记录 ID        |
| productId | number (int64) | 商品 ID        |
| count     | number (int32) | 满足的商品数量 |
| discount  | number         | 折扣           |
| price     | number         | 折后价格       |

### PmsProductFullReduction

商品满减价格，对应后端 `PmsProductFullReduction` 模型

| 字段名      | 类型           | 说明     |
| ----------- | -------------- | -------- |
| id          | number (int64) | 记录 ID  |
| productId   | number (int64) | 商品 ID  |
| fullPrice   | number         | 满足金额 |
| reducePrice | number         | 减免金额 |
