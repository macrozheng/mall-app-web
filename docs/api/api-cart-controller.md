# OmsCartItemController - 购物车管理接口文档

> 数据来源：[Swagger UI](https://portal-api.macrozheng.com/swagger-ui/) - OmsCartItemController
>
> 所有接口均需 Authorization 请求头（Bearer Token 认证）
>
> 通用模型定义见 [api-common-models.md](./api-common-models.md)（CommonResult、CommonPage、PageParam）

---

## 接口列表

| #   | 方法 | 路径                           | 说明                                     |
| --- | ---- | ------------------------------ | ---------------------------------------- |
| 1   | POST | `/cart/add`                    | 添加商品到购物车                         |
| 2   | POST | `/cart/clear`                  | 清空当前会员的购物车                     |
| 3   | POST | `/cart/delete`                 | 删除购物车中的指定商品                   |
| 4   | GET  | `/cart/getProduct/{productId}` | 获取购物车中指定商品的规格，用于重选规格 |
| 5   | GET  | `/cart/list`                   | 获取当前会员的购物车列表                 |
| 6   | GET  | `/cart/list/promotion`         | 获取当前会员的购物车列表，包括促销信息   |
| 7   | POST | `/cart/update/attr`            | 修改购物车中商品的规格                   |
| 8   | GET  | `/cart/update/quantity`        | 修改购物车中指定商品的数量               |

---

## 1. 添加商品到购物车

**POST** `/cart/add`

### 请求参数

Content-Type: `application/json`

| 参数名   | 类型 | 必填 | 说明                                     |
| -------- | ---- | ---- | ---------------------------------------- |
| cartItem | body | 是   | 购物车项，见 [OmsCartItem](#omscartitem) |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 2. 清空当前会员的购物车

**POST** `/cart/clear`

### 请求参数

无

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 3. 删除购物车中的指定商品

**POST** `/cart/delete`

### 请求参数

Query 参数：

| 参数名 | 类型                    | 必填 | 说明                                   |
| ------ | ----------------------- | ---- | -------------------------------------- |
| ids    | array\<number\> (int64) | 是   | 购物车项 ID 列表，格式：`?ids=1&ids=2` |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 4. 获取购物车中指定商品的规格

**GET** `/cart/getProduct/{productId}`

用于重选规格时获取商品信息。

### 请求参数

Path 参数：

| 参数名    | 类型           | 必填 | 说明    |
| --------- | -------------- | ---- | ------- |
| productId | number (int64) | 是   | 商品 ID |

### 响应结果

`CommonResult<CartProduct>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [CartProduct](#cartproduct)

---

## 5. 获取当前会员的购物车列表

**GET** `/cart/list`

### 请求参数

无

### 响应结果

`CommonResult<List<OmsCartItem>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [OmsCartItem](#omscartitem)[]

---

## 6. 获取当前会员的购物车列表（含促销信息）

**GET** `/cart/list/promotion`

### 请求参数

Query 参数：

| 参数名  | 类型                    | 必填 | 说明                                                           |
| ------- | ----------------------- | ---- | -------------------------------------------------------------- |
| cartIds | array\<number\> (int64) | 否   | 购物车项 ID 列表，格式：`?cartIds=1&cartIds=2`，为空时返回全部 |

### 响应结果

`CommonResult<List<CartPromotionItem>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [CartPromotionItem](#cartpromotionitem)[]

---

## 7. 修改购物车中商品的规格

**POST** `/cart/update/attr`

### 请求参数

Content-Type: `application/json`

| 参数名   | 类型 | 必填 | 说明                                     |
| -------- | ---- | ---- | ---------------------------------------- |
| cartItem | body | 是   | 购物车项，见 [OmsCartItem](#omscartitem) |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 8. 修改购物车中指定商品的数量

**GET** `/cart/update/quantity`

### 请求参数

Query 参数：

| 参数名   | 类型           | 必填 | 说明         |
| -------- | -------------- | ---- | ------------ |
| id       | number (int64) | 是   | 购物车项 ID  |
| quantity | number (int32) | 是   | 修改后的数量 |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 数据模型

### OmsCartItem

购物车项，对应后端 `OmsCartItem` 模型

| 字段名            | 类型               | 说明                                                                                   |
| ----------------- | ------------------ | -------------------------------------------------------------------------------------- |
| id                | number (int64)     | 购物车项 ID                                                                            |
| memberId          | number (int64)     | 会员 ID                                                                                |
| memberNickname    | string             | 会员昵称                                                                               |
| productId         | number (int64)     | 商品 ID                                                                                |
| productName       | string             | 商品名称                                                                               |
| productPic        | string             | 商品主图                                                                               |
| productSkuId      | number (int64)     | 商品 SKU ID                                                                            |
| productSkuCode    | string             | 商品 SKU 条码                                                                          |
| productSn         | string             | 商品货号                                                                               |
| productSubTitle   | string             | 商品副标题（卖点）                                                                     |
| productBrand      | string             | 商品品牌                                                                               |
| productCategoryId | number (int64)     | 商品分类                                                                               |
| productAttr       | string             | 商品销售属性，JSON 格式：`[{'key':'颜色','value':'颜色'},{'key':'容量','value':'4G'}]` |
| price             | number             | 添加到购物车的价格                                                                     |
| quantity          | number (int32)     | 购买数量                                                                               |
| deleteStatus      | number (int32)     | 是否删除                                                                               |
| createDate        | string (date-time) | 创建时间                                                                               |
| modifyDate        | string (date-time) | 修改时间                                                                               |

### CartProduct

购物车商品信息，对应后端 `CartProduct` 模型

| 字段名                     | 类型                         | 说明                                                                                                    |
| -------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| id                         | number (int64)               | 商品 ID                                                                                                 |
| name                       | string                       | 商品名称                                                                                                |
| pic                        | string                       | 商品图片                                                                                                |
| productSn                  | string                       | 货号                                                                                                    |
| brandId                    | number (int64)               | 品牌 ID                                                                                                 |
| brandName                  | string                       | 品牌名称                                                                                                |
| productCategoryId          | number (int64)               | 商品分类 ID                                                                                             |
| productCategoryName        | string                       | 商品分类名称                                                                                            |
| productAttributeCategoryId | number (int64)               | 商品属性分类 ID                                                                                         |
| price                      | number                       | 商品价格                                                                                                |
| originalPrice              | number                       | 市场价                                                                                                  |
| promotionPrice             | number                       | 促销价格                                                                                                |
| promotionType              | number (int32)               | 促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购 |
| promotionStartTime         | string (date-time)           | 促销开始时间                                                                                            |
| promotionEndTime           | string (date-time)           | 促销结束时间                                                                                            |
| promotionPerLimit          | number (int32)               | 活动限购数量                                                                                            |
| subTitle                   | string                       | 副标题                                                                                                  |
| description                | string                       | 商品描述                                                                                                |
| unit                       | string                       | 单位                                                                                                    |
| weight                     | number                       | 商品重量，默认为克                                                                                      |
| sort                       | number (int32)               | 排序                                                                                                    |
| sale                       | number (int32)               | 销量                                                                                                    |
| stock                      | number (int32)               | 库存                                                                                                    |
| lowStock                   | number (int32)               | 库存预警值                                                                                              |
| keywords                   | string                       | 关键字                                                                                                  |
| note                       | string                       | 备注                                                                                                    |
| albumPics                  | string                       | 画册图片，连产品图片限制为 5 张，以逗号分割                                                             |
| detailTitle                | string                       | 详情标题                                                                                                |
| detailDesc                 | string                       | 详情描述                                                                                                |
| detailHtml                 | string                       | 产品详情网页内容                                                                                        |
| detailMobileHtml           | string                       | 移动端网页详情                                                                                          |
| publishStatus              | number (int32)               | 上架状态：0->下架；1->上架                                                                              |
| newStatus                  | number (int32)               | 新品状态:0->不是新品；1->新品                                                                           |
| recommandStatus            | number (int32)               | 推荐状态；0->不推荐；1->推荐                                                                            |
| verifyStatus               | number (int32)               | 审核状态：0->未审核；1->审核通过                                                                        |
| previewStatus              | number (int32)               | 是否为预告商品：0->不是；1->是                                                                          |
| deleteStatus               | number (int32)               | 删除状态：0->未删除；1->已删除                                                                          |
| giftGrowth                 | number (int32)               | 赠送的成长值                                                                                            |
| giftPoint                  | number (int32)               | 赠送的积分                                                                                              |
| usePointLimit              | number (int32)               | 限制使用的积分数                                                                                        |
| feightTemplateId           | number (int64)               | 运费模板 ID                                                                                             |
| serviceIds                 | string                       | 以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮                                             |
| productAttributeList       | array\<PmsProductAttribute\> | 商品属性列表                                                                                            |
| skuStockList               | array\<PmsSkuStock\>         | 商品 SKU 库存列表                                                                                       |

### CartPromotionItem

购物车促销项，对应后端 `CartPromotionItem` 模型

继承 OmsCartItem 的所有字段，并新增以下促销相关字段：

| 字段名               | 类型               | 说明                             |
| -------------------- | ------------------ | -------------------------------- |
| id                   | number (int64)     | 购物车项 ID                      |
| memberId             | number (int64)     | 会员 ID                          |
| memberNickname       | string             | 会员昵称                         |
| productId            | number (int64)     | 商品 ID                          |
| productName          | string             | 商品名称                         |
| productPic           | string             | 商品主图                         |
| productSkuId         | number (int64)     | 商品 SKU ID                      |
| productSkuCode       | string             | 商品 SKU 条码                    |
| productSn            | string             | 商品货号                         |
| productSubTitle      | string             | 商品副标题（卖点）               |
| productBrand         | string             | 商品品牌                         |
| productCategoryId    | number (int64)     | 商品分类                         |
| productAttr          | string             | 商品销售属性，JSON 格式          |
| price                | number             | 添加到购物车的价格               |
| quantity             | number (int32)     | 购买数量                         |
| deleteStatus         | number (int32)     | 是否删除                         |
| createDate           | string (date-time) | 创建时间                         |
| modifyDate           | string (date-time) | 修改时间                         |
| **promotionMessage** | string             | 促销活动信息                     |
| **reduceAmount**     | number             | 促销活动减去的金额，针对每个商品 |
| **realStock**        | number (int32)     | 剩余库存-锁定库存                |
| **integration**      | number (int32)     | 购买商品赠送积分                 |
| **growth**           | number (int32)     | 购买商品赠送成长值               |

> **加粗字段**为 CartPromotionItem 相较于 OmsCartItem 新增的促销相关字段
