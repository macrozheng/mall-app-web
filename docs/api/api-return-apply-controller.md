# OmsPortalOrderReturnApplyController - 退货申请管理接口文档

> 数据来源：[Swagger UI](https://portal-api.macrozheng.com/swagger-ui/) - OmsPortalOrderReturnApplyController
>
> 所有接口均需 Authorization 请求头（Bearer Token 认证）
>
> 通用模型定义见 [api-common-models.md](./api-common-models.md)（CommonResult、CommonPage、PageParam）

---

## 接口列表

| #   | 方法 | 路径                  | 说明     |
| --- | ---- | --------------------- | -------- |
| 1   | POST | `/returnApply/create` | 申请退货 |

---

## 1. 申请退货

**POST** `/returnApply/create`

### 请求参数

Content-Type: `application/json`

| 参数名      | 类型 | 必填 | 说明                                                               |
| ----------- | ---- | ---- | ------------------------------------------------------------------ |
| returnApply | body | 是   | 退货申请，见 [OmsOrderReturnApplyParam](#omsorderreturnapplyparam) |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 数据模型

### OmsOrderReturnApplyParam

退货申请参数，对应后端 `OmsOrderReturnApplyParam` 模型

| 字段名           | 类型           | 说明                                |
| ---------------- | -------------- | ----------------------------------- |
| orderId          | number (int64) | 订单 ID                             |
| orderSn          | string         | 订单编号                            |
| productId        | number (int64) | 退货商品 ID                         |
| productName      | string         | 商品名称                            |
| productPic       | string         | 商品图片                            |
| productBrand     | string         | 商品品牌                            |
| productAttr      | string         | 商品销售属性：颜色：红色；尺码：xl; |
| productCount     | number (int32) | 退货数量                            |
| productPrice     | number         | 商品单价                            |
| productRealPrice | number         | 商品实际支付单价                    |
| reason           | string         | 退货原因                            |
| description      | string         | 描述                                |
| proofPics        | string         | 凭证图片，以逗号隔开                |
| memberUsername   | string         | 会员用户名                          |
| returnName       | string         | 退货人姓名                          |
| returnPhone      | string         | 退货人电话                          |
