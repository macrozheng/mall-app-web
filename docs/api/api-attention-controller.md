# MemberAttentionController - 会员关注品牌接口文档

> 数据来源：[Swagger UI](https://portal-api.macrozheng.com/swagger-ui/) - MemberAttentionController
>
> 所有接口均需 Authorization 请求头（Bearer Token 认证）
>
> 通用模型定义见 [api-common-models.md](./api-common-models.md)（CommonResult、CommonPage、PageParam）

---

## 接口列表

| #   | 方法 | 路径                       | 说明                     |
| --- | ---- | -------------------------- | ------------------------ |
| 1   | POST | `/member/attention/add`    | 添加品牌关注             |
| 2   | POST | `/member/attention/clear`  | 清空当前用户品牌关注列表 |
| 3   | POST | `/member/attention/delete` | 取消品牌关注             |
| 4   | GET  | `/member/attention/detail` | 显示品牌关注详情         |
| 5   | GET  | `/member/attention/list`   | 显示当前用户品牌关注列表 |

---

## 1. 添加品牌关注

**POST** `/member/attention/add`

### 请求参数

Content-Type: `application/json`

| 参数名               | 类型 | 必填 | 说明                                                       |
| -------------------- | ---- | ---- | ---------------------------------------------------------- |
| memberBrandAttention | body | 是   | 品牌关注，见 [MemberBrandAttention](#memberbrandattention) |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 2. 清空当前用户品牌关注列表

**POST** `/member/attention/clear`

### 请求参数

无

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 3. 取消品牌关注

**POST** `/member/attention/delete`

### 请求参数

Query 参数：

| 参数名  | 类型           | 必填 | 说明    |
| ------- | -------------- | ---- | ------- |
| brandId | number (int64) | 否   | 品牌 ID |

### 响应结果

`CommonResult<object>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 4. 显示品牌关注详情

**GET** `/member/attention/detail`

### 请求参数

Query 参数：

| 参数名  | 类型           | 必填 | 说明    |
| ------- | -------------- | ---- | ------- |
| brandId | number (int64) | 是   | 品牌 ID |

### 响应结果

`CommonResult<MemberBrandAttention>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [MemberBrandAttention](#memberbrandattention)

---

## 5. 显示当前用户品牌关注列表

**GET** `/member/attention/list`

### 请求参数

Query 参数：

| 参数名   | 类型           | 必填 | 说明     |
| -------- | -------------- | ---- | -------- |
| pageNum  | number (int32) | 否   | 页码     |
| pageSize | number (int32) | 否   | 每页数量 |

### 响应结果

`CommonResult<CommonPage<MemberBrandAttention>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 CommonPage\<[MemberBrandAttention](#memberbrandattention)\>

---

## 数据模型

### MemberBrandAttention

品牌关注，对应后端 `MemberBrandAttention` 模型

| 字段名         | 类型               | 说明      |
| -------------- | ------------------ | --------- |
| id             | string             | 记录 ID   |
| memberId       | number (int64)     | 会员 ID   |
| memberNickname | string             | 会员昵称  |
| memberIcon     | string             | 会员头像  |
| brandId        | number (int64)     | 品牌 ID   |
| brandName      | string             | 品牌名称  |
| brandLogo      | string             | 品牌 logo |
| brandCity      | string             | 品牌城市  |
| createTime     | string (date-time) | 创建时间  |
