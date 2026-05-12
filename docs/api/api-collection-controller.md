# MemberCollectionController - 会员商品收藏接口文档

> 数据来源：[Swagger UI](https://portal-api.macrozheng.com/swagger-ui/) - MemberCollectionController
>
> 所有接口均需 Authorization 请求头（Bearer Token 认证）
>
> 通用模型定义见 [api-common-models.md](./api-common-models.md)（CommonResult、CommonPage、PageParam）

---

## 接口列表

| #   | 方法 | 路径                               | 说明                     |
| --- | ---- | ---------------------------------- | ------------------------ |
| 1   | POST | `/member/productCollection/add`    | 添加商品收藏             |
| 2   | POST | `/member/productCollection/clear`  | 清空当前用户商品收藏列表 |
| 3   | POST | `/member/productCollection/delete` | 删除商品收藏             |
| 4   | GET  | `/member/productCollection/detail` | 显示商品收藏详情         |
| 5   | GET  | `/member/productCollection/list`   | 显示当前用户商品收藏列表 |

---

## 1. 添加商品收藏

**POST** `/member/productCollection/add`

### 请求参数

Content-Type: `application/json`

| 参数名            | 类型 | 必填 | 说明                                                             |
| ----------------- | ---- | ---- | ---------------------------------------------------------------- |
| productCollection | body | 是   | 商品收藏，见 [MemberProductCollection](#memberproductcollection) |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 2. 清空当前用户商品收藏列表

**POST** `/member/productCollection/clear`

### 请求参数

无

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 3. 删除商品收藏

**POST** `/member/productCollection/delete`

### 请求参数

Query 参数：

| 参数名    | 类型           | 必填 | 说明    |
| --------- | -------------- | ---- | ------- |
| productId | number (int64) | 否   | 商品 ID |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 4. 显示商品收藏详情

**GET** `/member/productCollection/detail`

### 请求参数

Query 参数：

| 参数名    | 类型           | 必填 | 说明    |
| --------- | -------------- | ---- | ------- |
| productId | number (int64) | 是   | 商品 ID |

### 响应结果

`CommonResult<MemberProductCollection>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [MemberProductCollection](#memberproductcollection)

---

## 5. 显示当前用户商品收藏列表

**GET** `/member/productCollection/list`

### 请求参数

Query 参数：

| 参数名   | 类型           | 必填 | 说明     |
| -------- | -------------- | ---- | -------- |
| pageNum  | number (int32) | 否   | 页码     |
| pageSize | number (int32) | 否   | 每页数量 |

### 响应结果

`CommonResult<CommonPage<MemberProductCollection>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 CommonPage\<[MemberProductCollection](#memberproductcollection)\>

---

## 数据模型

### MemberProductCollection

商品收藏，对应后端 `MemberProductCollection` 模型

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
