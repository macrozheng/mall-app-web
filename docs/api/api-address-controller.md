# UmsMemberReceiveAddressController - 收货地址管理接口文档

> 数据来源：[Swagger UI](https://portal-api.macrozheng.com/swagger-ui/) - UmsMemberReceiveAddressController
>
> 所有接口均需 Authorization 请求头（Bearer Token 认证）
>
> 通用模型定义见 [api-common-models.md](./api-common-models.md)（CommonResult、CommonPage、PageParam）

---

## 接口列表

| #   | 方法 | 路径                          | 说明             |
| --- | ---- | ----------------------------- | ---------------- |
| 1   | POST | `/member/address/add`         | 添加收货地址     |
| 2   | POST | `/member/address/delete/{id}` | 删除收货地址     |
| 3   | GET  | `/member/address/list`        | 显示所有收货地址 |
| 4   | POST | `/member/address/update/{id}` | 修改收货地址     |
| 5   | GET  | `/member/address/{id}`        | 获取收货地址详情 |

---

## 1. 添加收货地址

**POST** `/member/address/add`

### 请求参数

Content-Type: `application/json`

| 参数名  | 类型 | 必填 | 说明                                                             |
| ------- | ---- | ---- | ---------------------------------------------------------------- |
| address | body | 是   | 收货地址，见 [UmsMemberReceiveAddress](#umsmemberreceiveaddress) |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 2. 删除收货地址

**POST** `/member/address/delete/{id}`

### 请求参数

Path 参数：

| 参数名 | 类型           | 必填 | 说明        |
| ------ | -------------- | ---- | ----------- |
| id     | number (int64) | 是   | 收货地址 ID |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 3. 显示所有收货地址

**GET** `/member/address/list`

### 请求参数

无

### 响应结果

`CommonResult<List<UmsMemberReceiveAddress>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [UmsMemberReceiveAddress](#umsmemberreceiveaddress)[]

---

## 4. 修改收货地址

**POST** `/member/address/update/{id}`

### 请求参数

Path 参数：

| 参数名 | 类型           | 必填 | 说明        |
| ------ | -------------- | ---- | ----------- |
| id     | number (int64) | 是   | 收货地址 ID |

Body 参数：

Content-Type: `application/json`

| 参数名  | 类型 | 必填 | 说明                                                             |
| ------- | ---- | ---- | ---------------------------------------------------------------- |
| address | body | 是   | 收货地址，见 [UmsMemberReceiveAddress](#umsmemberreceiveaddress) |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 5. 获取收货地址详情

**GET** `/member/address/{id}`

### 请求参数

Path 参数：

| 参数名 | 类型           | 必填 | 说明        |
| ------ | -------------- | ---- | ----------- |
| id     | number (int64) | 是   | 收货地址 ID |

### 响应结果

`CommonResult<UmsMemberReceiveAddress>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [UmsMemberReceiveAddress](#umsmemberreceiveaddress)

---

## 数据模型

### UmsMemberReceiveAddress

收货地址，对应后端 `UmsMemberReceiveAddress` 模型

| 字段名        | 类型           | 说明             |
| ------------- | -------------- | ---------------- |
| id            | number (int64) | 收货地址 ID      |
| memberId      | number (int64) | 会员 ID          |
| name          | string         | 收货人名称       |
| phoneNumber   | string         | 手机号码         |
| defaultStatus | number (int32) | 是否为默认       |
| province      | string         | 省份/直辖市      |
| city          | string         | 城市             |
| region        | string         | 区               |
| detailAddress | string         | 详细地址（街道） |
| postCode      | string         | 邮政编码         |
