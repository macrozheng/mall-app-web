# MemberReadHistoryController - 浏览记录接口文档

> 数据来源：[Swagger UI](https://portal-api.macrozheng.com/swagger-ui/) - MemberReadHistoryController
>
> 所有接口均需 Authorization 请求头（Bearer Token 认证）
>
> 通用模型定义见 [api-common-models.md](./api-common-models.md)（CommonResult、CommonPage、PageParam）

---

## 接口列表

| #   | 方法 | 路径                         | 说明             |
| --- | ---- | ---------------------------- | ---------------- |
| 1   | POST | `/member/readHistory/clear`  | 清空浏览记录     |
| 2   | POST | `/member/readHistory/create` | 创建浏览记录     |
| 3   | POST | `/member/readHistory/delete` | 删除浏览记录     |
| 4   | GET  | `/member/readHistory/list`   | 分页获取浏览记录 |

---

## 1. 清空浏览记录

**POST** `/member/readHistory/clear`

### 请求参数

无

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 2. 创建浏览记录

**POST** `/member/readHistory/create`

### 请求参数

Content-Type: `application/json`

| 参数名            | 类型 | 必填 | 说明                                                 |
| ----------------- | ---- | ---- | ---------------------------------------------------- |
| memberReadHistory | body | 是   | 浏览记录，见 [MemberReadHistory](#memberreadhistory) |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 3. 删除浏览记录

**POST** `/member/readHistory/delete`

### 请求参数

Query 参数：

| 参数名 | 类型            | 必填 | 说明                                       |
| ------ | --------------- | ---- | ------------------------------------------ |
| ids    | array\<string\> | 是   | 浏览记录 ID 列表，格式：`?ids=id1&ids=id2` |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 4. 分页获取浏览记录

**GET** `/member/readHistory/list`

### 请求参数

Query 参数：

| 参数名   | 类型           | 必填 | 说明     |
| -------- | -------------- | ---- | -------- |
| pageNum  | number (int32) | 否   | 页码     |
| pageSize | number (int32) | 否   | 每页数量 |

### 响应结果

`CommonResult<CommonPage<MemberReadHistory>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 CommonPage\<[MemberReadHistory](#memberreadhistory)\>

---

## 数据模型

### MemberReadHistory

浏览记录，对应后端 `MemberReadHistory` 模型

| 字段名          | 类型               | 说明       |
| --------------- | ------------------ | ---------- |
| id              | string             | 记录 ID    |
| memberId        | number (int64)     | 会员 ID    |
| memberNickname  | string             | 会员昵称   |
| memberIcon      | string             | 会员头像   |
| productId       | number (int64)     | 商品 ID    |
| productName     | string             | 商品名称   |
| productPic      | string             | 商品图片   |
| productPrice    | string             | 商品价格   |
| productSubTitle | string             | 商品副标题 |
| createTime      | string (date-time) | 创建时间   |
