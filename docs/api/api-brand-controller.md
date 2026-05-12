# PmsPortalBrandController - 品牌管理接口文档

> 数据来源：[Swagger UI](https://portal-api.macrozheng.com/swagger-ui/) - PmsPortalBrandController
>
> 通用模型定义见 [api-common-models.md](./api-common-models.md)（CommonResult、CommonPage、PageParam）

---

## 接口列表

| #   | 方法 | 路径                      | 说明                 |
| --- | ---- | ------------------------- | -------------------- |
| 1   | GET  | `/brand/detail/{brandId}` | 获取品牌详情         |
| 2   | GET  | `/brand/productList`      | 分页获取品牌相关商品 |
| 3   | GET  | `/brand/recommendList`    | 分页获取推荐品牌     |

---

## 1. 获取品牌详情

**GET** `/brand/detail/{brandId}`

### 请求参数

Path 参数：

| 参数名  | 类型           | 必填 | 说明    |
| ------- | -------------- | ---- | ------- |
| brandId | number (int64) | 是   | 品牌 ID |

### 响应结果

`CommonResult<PmsBrand>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [PmsBrand](#pmsbrand)

---

## 2. 分页获取品牌相关商品

**GET** `/brand/productList`

### 请求参数

Query 参数：

| 参数名   | 类型           | 必填 | 说明     |
| -------- | -------------- | ---- | -------- |
| brandId  | number (int64) | 是   | 品牌 ID  |
| pageNum  | number (int32) | 否   | 页码     |
| pageSize | number (int32) | 否   | 每页数量 |

### 响应结果

`CommonResult<CommonPage<PmsProduct>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 CommonPage\<[PmsProduct](./api-product-controller.md#pmsproduct)\>

---

## 3. 分页获取推荐品牌

**GET** `/brand/recommendList`

### 请求参数

Query 参数：

| 参数名   | 类型           | 必填 | 说明     |
| -------- | -------------- | ---- | -------- |
| pageNum  | number (int32) | 否   | 页码     |
| pageSize | number (int32) | 否   | 每页数量 |

### 响应结果

`CommonResult<List<PmsBrand>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [PmsBrand](#pmsbrand)[]

---

## 数据模型

### PmsBrand

品牌，对应后端 `PmsBrand` 模型

| 字段名              | 类型           | 说明                             |
| ------------------- | -------------- | -------------------------------- |
| id                  | number (int64) | 品牌 ID                          |
| name                | string         | 品牌名称                         |
| logo                | string         | 品牌 logo                        |
| brandStory          | string         | 品牌故事                         |
| bigPic              | string         | 专区大图                         |
| firstLetter         | string         | 首字母                           |
| sort                | number (int32) | 排序                             |
| productCount        | number (int32) | 产品数量                         |
| productCommentCount | number (int32) | 产品评论数量                     |
| showStatus          | number (int32) | 显示状态                         |
| factoryStatus       | number (int32) | 是否为品牌制造商：0→ 不是；1→ 是 |
