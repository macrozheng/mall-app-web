# AlipayController - 支付宝支付接口文档

> 数据来源：[Swagger UI](https://portal-api.macrozheng.com/swagger-ui/) - AlipayController
>
> 通用模型定义见 [api-common-models.md](./api-common-models.md)（CommonResult、CommonPage、PageParam）

---

## 接口列表

| #   | 方法 | 路径             | 说明                       |
| --- | ---- | ---------------- | -------------------------- |
| 1   | POST | `/alipay/notify` | 支付宝异步回调             |
| 2   | GET  | `/alipay/pay`    | 支付宝电脑网站支付         |
| 3   | GET  | `/alipay/query`  | 支付宝统一收单线下交易查询 |
| 4   | GET  | `/alipay/webPay` | 支付宝手机网站支付         |

---

## 1. 支付宝异步回调

**POST** `/alipay/notify`

支付宝支付成功后的异步通知回调，执行成功返回 success，执行失败返回 failure。必须为 POST 请求。

### 请求参数

由支付宝服务端回调，参数格式遵循支付宝 SDK 规范。

### 响应结果

字符串：成功返回 `success`，失败返回 `failure`

---

## 2. 支付宝电脑网站支付

**GET** `/alipay/pay`

### 请求参数

Query 参数：

| 参数名      | 类型   | 必填 | 说明     |
| ----------- | ------ | ---- | -------- |
| outTradeNo  | string | 否   | 订单号   |
| subject     | string | 否   | 订单名称 |
| totalAmount | number | 否   | 金额     |

### 响应结果

返回支付宝支付页面 HTML

---

## 3. 支付宝统一收单线下交易查询

**GET** `/alipay/query`

订单支付成功返回交易状态：TRADE_SUCCESS

### 请求参数

Query 参数：

| 参数名     | 类型   | 必填 | 说明             |
| ---------- | ------ | ---- | ---------------- |
| outTradeNo | string | 否   | 商户订单号       |
| tradeNo    | string | 否   | 支付宝交易凭证号 |

### 响应结果

`CommonResult<string>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 string

---

## 4. 支付宝手机网站支付

**GET** `/alipay/webPay`

### 请求参数

Query 参数：

| 参数名      | 类型   | 必填 | 说明     |
| ----------- | ------ | ---- | -------- |
| outTradeNo  | string | 否   | 订单号   |
| subject     | string | 否   | 订单名称 |
| totalAmount | number | 否   | 金额     |

### 响应结果

返回支付宝手机支付页面 HTML
