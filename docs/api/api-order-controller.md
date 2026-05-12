# OmsPortalOrderController - 订单管理接口文档

> 数据来源：[Swagger UI](https://portal-api.macrozheng.com/swagger-ui/) - OmsPortalOrderController
>
> 所有接口均需 Authorization 请求头（Bearer Token 认证）
>
> 通用模型定义见 [api-common-models.md](./api-common-models.md)（CommonResult、CommonPage、PageParam）

---

## 接口列表

| #   | 方法 | 路径                          | 说明                       |
| --- | ---- | ----------------------------- | -------------------------- |
| 1   | POST | `/order/cancelOrder`          | 取消单个超时订单           |
| 2   | POST | `/order/cancelTimeOutOrder`   | 自动取消超时订单           |
| 3   | POST | `/order/cancelUserOrder`      | 用户取消订单               |
| 4   | POST | `/order/confirmReceiveOrder`  | 用户确认收货               |
| 5   | POST | `/order/deleteOrder`          | 用户删除订单               |
| 6   | GET  | `/order/detail/{orderId}`     | 根据 ID 获取订单详情       |
| 7   | POST | `/order/generateConfirmOrder` | 根据购物车信息生成确认单   |
| 8   | POST | `/order/generateOrder`        | 根据购物车信息生成订单     |
| 9   | GET  | `/order/list`                 | 按状态分页获取用户订单列表 |
| 10  | POST | `/order/paySuccess`           | 用户支付成功的回调         |

---

## 1. 取消单个超时订单

**POST** `/order/cancelOrder`

### 请求参数

Query 参数：

| 参数名  | 类型           | 必填 | 说明    |
| ------- | -------------- | ---- | ------- |
| orderId | number (int64) | 否   | 订单 ID |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 2. 自动取消超时订单

**POST** `/order/cancelTimeOutOrder`

系统自动取消超过支付时间的订单。

### 请求参数

无

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 3. 用户取消订单

**POST** `/order/cancelUserOrder`

用户主动取消未支付的订单。

### 请求参数

Query 参数：

| 参数名  | 类型           | 必填 | 说明    |
| ------- | -------------- | ---- | ------- |
| orderId | number (int64) | 否   | 订单 ID |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 4. 用户确认收货

**POST** `/order/confirmReceiveOrder`

### 请求参数

Query 参数：

| 参数名  | 类型           | 必填 | 说明    |
| ------- | -------------- | ---- | ------- |
| orderId | number (int64) | 否   | 订单 ID |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 5. 用户删除订单

**POST** `/order/deleteOrder`

### 请求参数

Query 参数：

| 参数名  | 类型           | 必填 | 说明    |
| ------- | -------------- | ---- | ------- |
| orderId | number (int64) | 否   | 订单 ID |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 6. 根据 ID 获取订单详情

**GET** `/order/detail/{orderId}`

### 请求参数

Path 参数：

| 参数名  | 类型           | 必填 | 说明    |
| ------- | -------------- | ---- | ------- |
| orderId | number (int64) | 是   | 订单 ID |

### 响应结果

`CommonResult<OmsOrderDetail>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [OmsOrderDetail](#omsorderdetail)

---

## 7. 根据购物车信息生成确认单

**POST** `/order/generateConfirmOrder`

下单前获取确认单信息，包含收货地址、优惠信息、金额计算等。

### 请求参数

Content-Type: `application/json`

| 参数名  | 类型                  | 必填 | 说明                       |
| ------- | --------------------- | ---- | -------------------------- |
| cartIds | body (array\<int64\>) | 是   | 被选中的购物车商品 ID 列表 |

### 响应结果

`CommonResult<ConfirmOrderResult>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [ConfirmOrderResult](#confirmorderresult)

---

## 8. 根据购物车信息生成订单

**POST** `/order/generateOrder`

### 请求参数

Content-Type: `application/json`

| 参数名     | 类型 | 必填 | 说明                                   |
| ---------- | ---- | ---- | -------------------------------------- |
| orderParam | body | 是   | 订单参数，见 [OrderParam](#orderparam) |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 9. 按状态分页获取用户订单列表

**GET** `/order/list`

### 请求参数

Query 参数：

| 参数名   | 类型           | 必填 | 说明                                                                      |
| -------- | -------------- | ---- | ------------------------------------------------------------------------- |
| status   | number (int32) | 是   | 订单状态：-1→ 全部；0→ 待付款；1→ 待发货；2→ 已发货；3→ 已完成；4→ 已关闭 |
| pageNum  | number (int32) | 否   | 页码                                                                      |
| pageSize | number (int32) | 否   | 每页数量                                                                  |

### 响应结果

`CommonResult<CommonPage<OmsOrderDetail>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 CommonPage\<[OmsOrderDetail](#omsorderdetail)\>

---

## 10. 用户支付成功的回调

**POST** `/order/paySuccess`

### 请求参数

Query 参数：

| 参数名  | 类型           | 必填 | 说明     |
| ------- | -------------- | ---- | -------- |
| orderId | number (int64) | 是   | 订单 ID  |
| payType | number (int32) | 是   | 支付方式 |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 数据模型

### OmsOrderDetail

订单详情，对应后端 `OmsOrderDetail` 模型

| 字段名                | 类型                                   | 说明                                                                         |
| --------------------- | -------------------------------------- | ---------------------------------------------------------------------------- |
| id                    | number (int64)                         | 订单 ID                                                                      |
| orderSn               | string                                 | 订单编号                                                                     |
| memberId              | number (int64)                         | 会员 ID                                                                      |
| memberUsername        | string                                 | 用户帐号                                                                     |
| totalAmount           | number                                 | 订单总金额                                                                   |
| payAmount             | number                                 | 应付金额（实际支付金额）                                                     |
| freightAmount         | number                                 | 运费金额                                                                     |
| promotionAmount       | number                                 | 促销优化金额（促销价、满减、阶梯价）                                         |
| integrationAmount     | number                                 | 积分抵扣金额                                                                 |
| couponAmount          | number                                 | 优惠券抵扣金额                                                               |
| discountAmount        | number                                 | 管理员后台调整订单使用的折扣金额                                             |
| payType               | number (int32)                         | 支付方式：0→ 未支付；1→ 支付宝；2→ 微信                                      |
| status                | number (int32)                         | 订单状态：0→ 待付款；1→ 待发货；2→ 已发货；3→ 已完成；4→ 已关闭；5→ 无效订单 |
| orderType             | number (int32)                         | 订单类型：0→ 正常订单；1→ 秒杀订单                                           |
| couponId              | number (int64)                         | 优惠券 ID                                                                    |
| promotionInfo         | string                                 | 活动信息                                                                     |
| integration           | number (int32)                         | 可以获得的积分                                                               |
| growth                | number (int32)                         | 可以活动的成长值                                                             |
| useIntegration        | number (int32)                         | 下单时使用的积分                                                             |
| confirmStatus         | number (int32)                         | 确认收货状态：0→ 未确认；1→ 已确认                                           |
| deleteStatus          | number (int32)                         | 删除状态：0→ 未删除；1→ 已删除                                               |
| sourceType            | number (int32)                         | 订单来源：0→PC 订单；1→app 订单                                              |
| billType              | number (int32)                         | 发票类型：0→ 不开发票；1→ 电子发票；2→ 纸质发票                              |
| billHeader            | string                                 | 发票抬头                                                                     |
| billContent           | string                                 | 发票内容                                                                     |
| billReceiverPhone     | string                                 | 收票人电话                                                                   |
| billReceiverEmail     | string                                 | 收票人邮箱                                                                   |
| receiverName          | string                                 | 收货人姓名                                                                   |
| receiverPhone         | string                                 | 收货人电话                                                                   |
| receiverPostCode      | string                                 | 收货人邮编                                                                   |
| receiverProvince      | string                                 | 省份/直辖市                                                                  |
| receiverCity          | string                                 | 城市                                                                         |
| receiverRegion        | string                                 | 区                                                                           |
| receiverDetailAddress | string                                 | 详细地址                                                                     |
| note                  | string                                 | 订单备注                                                                     |
| deliveryCompany       | string                                 | 物流公司（配送方式）                                                         |
| deliverySn            | string                                 | 物流单号                                                                     |
| createTime            | string (date-time)                     | 提交时间                                                                     |
| paymentTime           | string (date-time)                     | 支付时间                                                                     |
| deliveryTime          | string (date-time)                     | 发货时间                                                                     |
| receiveTime           | string (date-time)                     | 确认收货时间                                                                 |
| modifyTime            | string (date-time)                     | 修改时间                                                                     |
| commentTime           | string (date-time)                     | 评价时间                                                                     |
| autoConfirmDay        | number (int32)                         | 自动确认时间（天）                                                           |
| orderItemList         | array\<[OmsOrderItem](#omsorderitem)\> | 订单商品列表                                                                 |

### OmsOrderItem

订单商品项，对应后端 `OmsOrderItem` 模型

| 字段名            | 类型           | 说明                                                |
| ----------------- | -------------- | --------------------------------------------------- |
| id                | number (int64) | 记录 ID                                             |
| orderId           | number (int64) | 订单 ID                                             |
| orderSn           | string         | 订单编号                                            |
| productId         | number (int64) | 商品 ID                                             |
| productName       | string         | 商品名称                                            |
| productPic        | string         | 商品图片                                            |
| productPrice      | number         | 销售价格                                            |
| productQuantity   | number (int32) | 购买数量                                            |
| productSkuId      | number (int64) | 商品 SKU 编号                                       |
| productSkuCode    | string         | 商品 SKU 条码                                       |
| productSn         | string         | 商品货号                                            |
| productBrand      | string         | 商品品牌                                            |
| productCategoryId | number (int64) | 商品分类 ID                                         |
| productAttr       | string         | 商品销售属性：`[{'key':'颜色','value':'颜色'},...]` |
| promotionName     | string         | 商品促销名称                                        |
| promotionAmount   | number         | 商品促销分解金额                                    |
| couponAmount      | number         | 优惠券优惠分解金额                                  |
| integrationAmount | number         | 积分优惠分解金额                                    |
| realAmount        | number         | 该商品经过优惠后的分解金额                          |
| giftIntegration   | number (int32) | 赠送积分                                            |
| giftGrowth        | number (int32) | 赠送成长值                                          |

### OrderParam

下单参数，对应后端 `OrderParam` 模型

| 字段名                 | 类型                    | 必填 | 说明                       |
| ---------------------- | ----------------------- | ---- | -------------------------- |
| cartIds                | array\<number\> (int64) | 是   | 被选中的购物车商品 ID 列表 |
| memberReceiveAddressId | number (int64)          | 否   | 收货地址 ID                |
| couponId               | number (int64)          | 否   | 优惠券 ID                  |
| useIntegration         | number (int32)          | 否   | 使用的积分数               |
| payType                | number (int32)          | 否   | 支付方式                   |

### ConfirmOrderResult

确认单结果，对应后端 `ConfirmOrderResult` 模型

| 字段名                    | 类型                                                                                    | 说明                     |
| ------------------------- | --------------------------------------------------------------------------------------- | ------------------------ |
| cartPromotionItemList     | array\<[CartPromotionItem](./api-cart-controller.md#cartpromotionitem)\>                | 包含优惠信息的购物车信息 |
| memberReceiveAddressList  | array\<[UmsMemberReceiveAddress](./api-address-controller.md#umsmemberreceiveaddress)\> | 用户收货地址列表         |
| couponHistoryDetailList   | array\<[SmsCouponHistoryDetail](./api-coupon-controller.md#smscouponhistorydetail)\>    | 用户可用优惠券列表       |
| integrationConsumeSetting | [UmsIntegrationConsumeSetting](#umsintegrationconsumesetting)                           | 积分使用规则             |
| calcAmount                | [CalcAmount](#calcamount)                                                               | 计算的金额               |
| memberIntegration         | number (int32)                                                                          | 会员持有的积分           |

### CalcAmount

金额计算结果，对应后端 `CalcAmount` 模型

| 字段名          | 类型   | 说明           |
| --------------- | ------ | -------------- |
| totalAmount     | number | 订单商品总金额 |
| freightAmount   | number | 运费           |
| promotionAmount | number | 活动优惠       |
| payAmount       | number | 应付金额       |

### UmsIntegrationConsumeSetting

积分使用规则，对应后端 `UmsIntegrationConsumeSetting` 模型

| 字段名             | 类型           | 说明                                     |
| ------------------ | -------------- | ---------------------------------------- |
| id                 | number (int64) | 记录 ID                                  |
| deductionPerAmount | number (int32) | 每一元需要抵扣的积分数量                 |
| maxPercentPerOrder | number (int32) | 每笔订单最高抵用百分比                   |
| useUnit            | number (int32) | 每次使用积分最小单位 100                 |
| couponStatus       | number (int32) | 是否可以和优惠券同用：0→ 不可以；1→ 可以 |
