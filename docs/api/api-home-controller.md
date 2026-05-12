# HomeController - 首页内容管理接口文档

> 数据来源：[Swagger UI](https://portal-api.macrozheng.com/swagger-ui/) - HomeController
>
> 通用模型定义见 [api-common-models.md](./api-common-models.md)（CommonResult、CommonPage、PageParam）

---

## 接口列表

| #   | 方法 | 路径                               | 说明                 |
| --- | ---- | ---------------------------------- | -------------------- |
| 1   | GET  | `/home/content`                    | 首页内容信息展示     |
| 2   | GET  | `/home/hotProductList`             | 分页获取人气推荐商品 |
| 3   | GET  | `/home/newProductList`             | 分页获取新品推荐商品 |
| 4   | GET  | `/home/productCateList/{parentId}` | 获取首页商品分类     |
| 5   | GET  | `/home/recommendProductList`       | 分页获取推荐商品     |
| 6   | GET  | `/home/subjectList`                | 根据分类获取专题     |

---

## 1. 首页内容信息展示

**GET** `/home/content`

获取首页全部内容，包括轮播广告、推荐品牌、秒杀活动、人气推荐、新品推荐、推荐专题。

### 请求参数

无

### 响应结果

`CommonResult<HomeContentResult>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [HomeContentResult](#homecontentresult)

---

## 2. 分页获取人气推荐商品

**GET** `/home/hotProductList`

### 请求参数

Query 参数：

| 参数名   | 类型           | 必填 | 说明     |
| -------- | -------------- | ---- | -------- |
| pageNum  | number (int32) | 否   | 页码     |
| pageSize | number (int32) | 否   | 每页数量 |

### 响应结果

`CommonResult<List<PmsProduct>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [PmsProduct](./api-product-controller.md#pmsproduct)[]

---

## 3. 分页获取新品推荐商品

**GET** `/home/newProductList`

### 请求参数

Query 参数：

| 参数名   | 类型           | 必填 | 说明     |
| -------- | -------------- | ---- | -------- |
| pageNum  | number (int32) | 否   | 页码     |
| pageSize | number (int32) | 否   | 每页数量 |

### 响应结果

`CommonResult<List<PmsProduct>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [PmsProduct](./api-product-controller.md#pmsproduct)[]

---

## 4. 获取首页商品分类

**GET** `/home/productCateList/{parentId}`

### 请求参数

Path 参数：

| 参数名   | 类型           | 必填 | 说明      |
| -------- | -------------- | ---- | --------- |
| parentId | number (int64) | 是   | 父分类 ID |

### 响应结果

`CommonResult<List<PmsProductCategory>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [PmsProductCategory](./api-product-controller.md#pmsproductcategory)[]

---

## 5. 分页获取推荐商品

**GET** `/home/recommendProductList`

### 请求参数

Query 参数：

| 参数名   | 类型           | 必填 | 说明     |
| -------- | -------------- | ---- | -------- |
| pageNum  | number (int32) | 否   | 页码     |
| pageSize | number (int32) | 否   | 每页数量 |

### 响应结果

`CommonResult<List<PmsProduct>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [PmsProduct](./api-product-controller.md#pmsproduct)[]

---

## 6. 根据分类获取专题

**GET** `/home/subjectList`

### 请求参数

Query 参数：

| 参数名   | 类型           | 必填 | 说明     |
| -------- | -------------- | ---- | -------- |
| cateId   | number (int64) | 否   | 分类 ID  |
| pageNum  | number (int32) | 否   | 页码     |
| pageSize | number (int32) | 否   | 每页数量 |

### 响应结果

`CommonResult<List<CmsSubject>>` — 见 [通用模型](./api-common-models.md#commonresultt)，data 类型为 [CmsSubject](#cmssubject)[]

---

## 数据模型

### HomeContentResult

首页内容聚合结果，对应后端 `HomeContentResult` 模型

| 字段名             | 类型                                                          | 说明         |
| ------------------ | ------------------------------------------------------------- | ------------ |
| advertiseList      | array\<[SmsHomeAdvertise](#smshomeadvertise)\>                | 轮播广告     |
| brandList          | array\<[PmsBrand](./api-brand-controller.md#pmsbrand)\>       | 推荐品牌     |
| homeFlashPromotion | [HomeFlashPromotion](#homeflashpromotion)                     | 当前秒杀场次 |
| hotProductList     | array\<[PmsProduct](./api-product-controller.md#pmsproduct)\> | 人气推荐     |
| newProductList     | array\<[PmsProduct](./api-product-controller.md#pmsproduct)\> | 新品推荐     |
| subjectList        | array\<[CmsSubject](#cmssubject)\>                            | 推荐专题     |

### HomeFlashPromotion

秒杀活动场次，对应后端 `HomeFlashPromotion` 模型

| 字段名        | 类型                                                     | 说明                 |
| ------------- | -------------------------------------------------------- | -------------------- |
| startTime     | string (date-time)                                       | 本场开始时间         |
| endTime       | string (date-time)                                       | 本场结束时间         |
| nextStartTime | string (date-time)                                       | 下场开始时间         |
| nextEndTime   | string (date-time)                                       | 下场结束时间         |
| productList   | array\<[FlashPromotionProduct](#flashpromotionproduct)\> | 属于该秒杀活动的商品 |

### FlashPromotionProduct

秒杀商品，对应后端 `FlashPromotionProduct` 模型

继承 PmsProduct 的所有字段，并新增以下秒杀相关字段：

| 字段名              | 类型           | 说明           |
| ------------------- | -------------- | -------------- |
| flashPromotionPrice | number         | 秒杀价格       |
| flashPromotionCount | number (int32) | 用于秒杀的数量 |
| flashPromotionLimit | number (int32) | 秒杀限购数量   |

### SmsHomeAdvertise

首页轮播广告，对应后端 `SmsHomeAdvertise` 模型

| 字段名     | 类型               | 说明                                    |
| ---------- | ------------------ | --------------------------------------- |
| id         | number (int64)     | 广告 ID                                 |
| name       | string             | 广告名称                                |
| type       | number (int32)     | 轮播位置：0→PC 首页轮播；1→app 首页轮播 |
| pic        | string             | 图片地址                                |
| startTime  | string (date-time) | 开始时间                                |
| endTime    | string (date-time) | 结束时间                                |
| status     | number (int32)     | 上下线状态：0→ 下线；1→ 上线            |
| clickCount | number (int32)     | 点击数                                  |
| orderCount | number (int32)     | 下单数                                  |
| url        | string             | 链接地址                                |
| note       | string             | 备注                                    |
| sort       | number (int32)     | 排序                                    |

### CmsSubject

专题，对应后端 `CmsSubject` 模型

| 字段名          | 类型               | 说明                         |
| --------------- | ------------------ | ---------------------------- |
| id              | number (int64)     | 专题 ID                      |
| categoryId      | number (int64)     | 分类 ID                      |
| categoryName    | string             | 专题分类名称                 |
| title           | string             | 专题标题                     |
| pic             | string             | 专题主图                     |
| description     | string             | 描述                         |
| content         | string             | 内容                         |
| albumPics       | string             | 画册图片用逗号分割           |
| showStatus      | number (int32)     | 显示状态：0→ 不显示；1→ 显示 |
| recommendStatus | number (int32)     | 推荐状态                     |
| createTime      | string (date-time) | 创建时间                     |
| forwardCount    | number (int32)     | 转发数                       |
| readCount       | number (int32)     | 阅读数                       |
| commentCount    | number (int32)     | 评论数                       |
| collectCount    | number (int32)     | 收藏数                       |
| productCount    | number (int32)     | 关联产品数量                 |
