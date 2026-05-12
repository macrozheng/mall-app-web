# UmsMemberCouponController - 优惠券管理接口文档

> 数据来源：[Swagger UI](https://portal-api.macrozheng.com/swagger-ui/) - UmsMemberCouponController
>
> 所有接口均需 Authorization 请求头（Bearer Token 认证）
>
> 通用模型定义见 [api-common-models.md](./api-common-models.md)（CommonResult、CommonPage、PageParam）

---

## 接口列表

| #   | 方法 | 路径                                       | 说明                   |
| --- | ---- | ------------------------------------------ | ---------------------- |
| 1   | POST | `/member/coupon/add/{couponId}`            | 领取指定优惠券         |
| 2   | GET  | `/member/coupon/list`                      | 获取会员优惠券列表     |
| 3   | GET  | `/member/coupon/list/cart/{type}`          | 获取购物车相关优惠券   |
| 4   | GET  | `/member/coupon/listByProduct/{productId}` | 获取当前商品相关优惠券 |
| 5   | GET  | `/member/coupon/listHistory`               | 获取会员优惠券历史列表 |

---

## 1. 领取指定优惠券

**POST** `/member/coupon/add/{couponId}`

### 请求参数

Path 参数：

| 参数名   | 类型           | 必填 | 说明      |
| -------- | -------------- | ---- | --------- |
| couponId | number (int64) | 是   | 优惠券 ID |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 2. 获取会员优惠券列表

**GET** `/member/coupon/list`

### 请求参数

Query 参数：

| 参数名    | 类型           | 必填 | 说明                                            |
| --------- | -------------- | ---- | ----------------------------------------------- |
| useStatus | number (int32) | 否   | 优惠券筛选类型：0→ 未使用；1→ 已使用；2→ 已过期 |

### 响应结果

`CommonResult<List<SmsCoupon>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [SmsCoupon](#smscoupon)[]

---

## 3. 获取购物车相关优惠券

**GET** `/member/coupon/list/cart/{type}`

根据购物车中的商品信息，获取当前会员可使用或不可使用的优惠券列表。

### 请求参数

Path 参数：

| 参数名 | 类型           | 必填 | 说明                         |
| ------ | -------------- | ---- | ---------------------------- |
| type   | number (int32) | 是   | 使用可用：0→ 不可用；1→ 可用 |

### 响应结果

`CommonResult<List<SmsCouponHistoryDetail>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [SmsCouponHistoryDetail](#smscouponhistorydetail)[]

---

## 4. 获取当前商品相关优惠券

**GET** `/member/coupon/listByProduct/{productId}`

### 请求参数

Path 参数：

| 参数名    | 类型           | 必填 | 说明    |
| --------- | -------------- | ---- | ------- |
| productId | number (int64) | 是   | 商品 ID |

### 响应结果

`CommonResult<List<SmsCoupon>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [SmsCoupon](#smscoupon)[]

---

## 5. 获取会员优惠券历史列表

**GET** `/member/coupon/listHistory`

### 请求参数

Query 参数：

| 参数名    | 类型           | 必填 | 说明                                            |
| --------- | -------------- | ---- | ----------------------------------------------- |
| useStatus | number (int32) | 否   | 优惠券筛选类型：0→ 未使用；1→ 已使用；2→ 已过期 |

### 响应结果

`CommonResult<List<SmsCouponHistory>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [SmsCouponHistory](#smscouponhistory)[]

---

## 数据模型

### SmsCoupon

优惠券，对应后端 `SmsCoupon` 模型

| 字段名       | 类型               | 说明                                                           |
| ------------ | ------------------ | -------------------------------------------------------------- |
| id           | number (int64)     | 优惠券 ID                                                      |
| type         | number (int32)     | 优惠券类型：0→ 全场赠券；1→ 会员赠券；2→ 购物赠券；3→ 注册赠券 |
| name         | string             | 优惠券名称                                                     |
| platform     | number (int32)     | 使用平台：0→ 全部；1→ 移动；2→PC                               |
| count        | number (int32)     | 数量                                                           |
| amount       | number             | 金额                                                           |
| perLimit     | number (int32)     | 每人限领张数                                                   |
| minPoint     | number             | 使用门槛；0 表示无门槛                                         |
| startTime    | string (date-time) | 开始时间                                                       |
| endTime      | string (date-time) | 结束时间                                                       |
| useType      | number (int32)     | 使用类型：0→ 全场通用；1→ 指定分类；2→ 指定商品                |
| note         | string             | 备注                                                           |
| publishCount | number (int32)     | 发行数量                                                       |
| useCount     | number (int32)     | 已使用数量                                                     |
| receiveCount | number (int32)     | 领取数量                                                       |
| enableTime   | string (date-time) | 可以领取的日期                                                 |
| code         | string             | 优惠码                                                         |
| memberLevel  | number (int32)     | 可领取的会员类型：0→ 无限时                                    |

### SmsCouponHistory

优惠券领取记录，对应后端 `SmsCouponHistory` 模型

| 字段名         | 类型               | 说明                                      |
| -------------- | ------------------ | ----------------------------------------- |
| id             | number (int64)     | 记录 ID                                   |
| couponId       | number (int64)     | 优惠券 ID                                 |
| memberId       | number (int64)     | 会员 ID                                   |
| couponCode     | string             | 优惠码                                    |
| memberNickname | string             | 领取人昵称                                |
| getType        | number (int32)     | 获取类型：0→ 后台赠送；1→ 主动获取        |
| createTime     | string (date-time) | 创建时间                                  |
| useStatus      | number (int32)     | 使用状态：0→ 未使用；1→ 已使用；2→ 已过期 |
| useTime        | string (date-time) | 使用时间                                  |
| orderId        | number (int64)     | 订单编号                                  |
| orderSn        | string             | 订单号码                                  |

### SmsCouponHistoryDetail

优惠券领取记录详情，对应后端 `SmsCouponHistoryDetail` 模型

继承 SmsCouponHistory 的所有字段，并新增以下关联信息：

| 字段名               | 类型                                      | 说明               |
| -------------------- | ----------------------------------------- | ------------------ |
| coupon               | [SmsCoupon](#smscoupon)                   | 相关优惠券信息     |
| productRelationList  | array\<SmsCouponProductRelation\>         | 优惠券关联商品     |
| categoryRelationList | array\<SmsCouponProductCategoryRelation\> | 优惠券关联商品分类 |

### SmsCouponProductRelation

优惠券关联商品，对应后端 `SmsCouponProductRelation` 模型

| 字段名      | 类型           | 说明      |
| ----------- | -------------- | --------- |
| id          | number (int64) | 记录 ID   |
| couponId    | number (int64) | 优惠券 ID |
| productId   | number (int64) | 商品 ID   |
| productName | string         | 商品名称  |
| productSn   | string         | 商品编码  |

### SmsCouponProductCategoryRelation

优惠券关联商品分类，对应后端 `SmsCouponProductCategoryRelation` 模型

| 字段名              | 类型           | 说明         |
| ------------------- | -------------- | ------------ |
| id                  | number (int64) | 记录 ID      |
| couponId            | number (int64) | 优惠券 ID    |
| productCategoryId   | number (int64) | 商品分类 ID  |
| productCategoryName | string         | 产品分类名称 |
| parentCategoryName  | string         | 父分类名称   |
