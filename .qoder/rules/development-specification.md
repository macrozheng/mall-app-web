---
trigger: always_on
---

# Mall 商城前端开发规范

## 1. 项目背景

Mall 商城是一款基于 uni-app + Vue 3 的移动端电商应用，后端对接 [mall](https://github.com/macrozheng/mall) 微服务架构的商城系统。项目从 Vue 2 迁移至 Vue 3，采用 Composition API + `<script setup>` 语法，面向多端（H5、微信小程序、App）发布。

**核心功能模块**：

- 首页（轮播广告、品牌推荐、秒杀专区、新鲜好物、人气推荐、猜你喜欢）
- 分类（一级/二级分类浏览）
- 购物车（添加、删除、修改数量、全选、结算）
- 我的（用户信息、订单、优惠券、地址管理、收藏/关注/足迹）
- 登录/注册（SSO 单点登录）

---

## 2. 技术栈

| 类别       | 技术                        | 版本                   |
| ---------- | --------------------------- | ---------------------- |
| 框架       | uni-app (Vue 3)             | 3.0.0-5000720260410001 |
| 前端框架   | Vue 3                       | ^3.5.20                |
| 状态管理   | Pinia                       | 2.0.27                 |
| 持久化     | pinia-plugin-persistedstate | ^3.2.0                 |
| 构建工具   | Vite                        | ^5.2.8                 |
| 语言       | TypeScript                  | ^5.1.6                 |
| CSS 预处理 | Sass                        | ^1.56.1                |
| 代码规范   | ESLint + Prettier           | ^8.22.0 / ^2.7.1       |
| Git 规范   | Husky + lint-staged         | ^8.0.0 / ^13.0.3       |
| 类型增强   | @uni-helper/uni-app-types   | 1.0.0-alpha.6          |

---

## 3. VSCode 插件

以下插件为项目开发必备，配置文件 `.vscode/extensions.json` 已声明推荐：

| 插件           | 插件 ID                  | 用途                                           |
| -------------- | ------------------------ | ---------------------------------------------- |
| Vue - Official | `vue.volar`              | Vue 3 语言支持（语法高亮、类型检查、智能提示） |
| Prettier       | `esbenp.prettier-vscode` | 代码格式化                                     |
| ESLint         | `dbaeumer.vscode-eslint` | 代码质量检查                                   |

---

## 4. API 文档

- **在线文档**：https://portal-api.macrozheng.com/swagger-ui/
- **离线文档**：`docs/api/` 目录下的 Markdown 文件（按 Controller 拆分，便于离线查阅接口定义）

### 使用原则

**优先使用本地 Markdown 文档**（`docs/api/` 目录），仅在以下情况使用在线文档：

- 用户明确要求使用在线文档
- 本地文档过期或不存在

### 文档结构

```
docs/api/
├── api-common-models.md              # 通用模型定义（CommonResult、CommonPage、PageParam）
│
├── api-alipay-controller.md          # 支付宝支付（4 个接口）
├── api-attention-controller.md       # 会员关注品牌（5 个接口）
├── api-brand-controller.md           # 品牌管理（3 个接口）
├── api-cart-controller.md            # 购物车管理（8 个接口）
├── api-collection-controller.md      # 会员商品收藏（5 个接口）
├── api-coupon-controller.md          # 优惠券管理（5 个接口）
├── api-home-controller.md            # 首页内容管理（6 个接口）
├── api-member-controller.md          # 会员登录注册管理（6 个接口）
├── api-order-controller.md           # 订单管理（10 个接口）
├── api-product-controller.md         # 商品管理（3 个接口）
├── api-read-history-controller.md    # 浏览记录（4 个接口）
├── api-return-apply-controller.md    # 退货申请（1 个接口）
└── api-address-controller.md         # 收货地址管理（5 个接口）
```

### 模型归属与跨文档引用规则

| 类型                 | 归属                       | 示例                                         |
| -------------------- | -------------------------- | -------------------------------------------- |
| 跨模块通用类型       | `api-common-models.md`     | CommonResult、CommonPage、PageParam          |
| 单模块专有类型       | 对应 Controller 文档       | OmsCartItem、PmsBrand                        |
| 跨模块引用的业务类型 | 被引用方定义，引用方用链接 | 订单文档需引用 CartItem 时，链接到购物车文档 |

### 接口模块说明

| 模块         | Controller                          | 离线文档                         | 说明                    |
| ------------ | ----------------------------------- | -------------------------------- | ----------------------- |
| 通用模型     | —                                   | `api-common-models.md`           | CommonResult 等通用类型 |
| 支付宝       | AlipayController                    | `api-alipay-controller.md`       | 支付宝支付相关接口      |
| 首页         | HomeController                      | `api-home-controller.md`         | 首页内容管理            |
| 会员关注品牌 | MemberAttentionController           | `api-attention-controller.md`    | 会员关注品牌管理        |
| 会员收藏     | MemberCollectionController          | `api-collection-controller.md`   | 会员收藏管理            |
| 浏览记录     | MemberReadHistoryController         | `api-read-history-controller.md` | 会员商品浏览记录管理    |
| 购物车       | OmsCartItemController               | `api-cart-controller.md`         | 购物车管理              |
| 订单         | OmsPortalOrderController            | `api-order-controller.md`        | 订单管理                |
| 退货         | OmsPortalOrderReturnApplyController | `api-return-apply-controller.md` | 退货申请管理            |
| 品牌         | PmsPortalBrandController            | `api-brand-controller.md`        | 前台品牌管理            |
| 商品         | PmsPortalProductController          | `api-product-controller.md`      | 前台商品管理            |
| 会员         | UmsMemberController                 | `api-member-controller.md`       | 会员登录注册管理        |
| 优惠券       | UmsMemberCouponController           | `api-coupon-controller.md`       | 用户优惠券管理          |
| 收货地址     | UmsMemberReceiveAddressController   | `api-address-controller.md`      | 会员收货地址管理        |

---

## 5. 代码命名规范

### 5.1 通用规范

- 变量名使用 `camelCase`
- 组件文件名使用 `kebab-case`（如 `mix-list-cell.vue`）
- 类型名使用 `PascalCase`（如 `CartItem`、`PmsBrand`）
- 常量（const）和方法需要添加注释

### 5.2 API 方法命名

`apis/` 目录下的方法以 **API** 结尾：

```typescript
// ✅ 正确
export const getCartListAPI = () => { ... }
export const addCartAPI = (data) => { ... }
export const deleteCartAPI = (params) => { ... }

// ❌ 错误
export const getCartList = () => { ... }
export const fetchCartData = () => { ... }
```

### 5.3 API 请求参数类型命名

请求参数类型统一使用 **单数形式 `XxxParam`**，禁止使用复数 `XxxParams`：

```typescript
// ✅ 正确
export type LoginParam = {
  username: string
  password: string
}

// ❌ 错误
export type LoginParams = {
  username: string
  password: string
}
```

### 5.4 分页类型使用规范

项目中统一使用 `CommonPage<T>` 和 `PageParam` 处理分页相关场景，禁止创建无意义的类型别名。

#### 5.4.1 PageParam - 通用分页请求参数

**使用场景**：API 接口需要分页查询时，请求参数继承 `PageParam`

```typescript
import type { PageParam } from '@/types/common'

// ✅ 正确 - 通过交叉类型继承 PageParam
export type ProductListParam = PageParam & {
  /** 商品分类ID */
  productCategoryId?: number
  /** 排序方式 */
  sort: number
}

// ✅ 正确 - 可选分页参数
export const getRecommendProductListAPI = (params?: PageParam) => {
  return http<PmsProduct[]>({
    method: 'GET',
    url: '/home/recommendProductList',
    params,
  })
}

// ❌ 错误 - 重复定义分页字段
export type ProductListParam = {
  pageNum: number // 重复！应继承 PageParam
  pageSize: number // 重复！应继承 PageParam
  productCategoryId?: number
  sort: number
}
```

#### 5.4.2 CommonPage<T> - 通用分页响应结果

**使用场景**：API 接口返回分页数据时，直接使用 `CommonPage<T>` 作为泛型参数

```typescript
import type { CommonPage } from '@/types/common'
import type { PmsProduct } from '@/types/product'

// ✅ 正确 - 直接使用 CommonPage<T>
export const searchProductListAPI = (params: ProductListParam) => {
  return http<CommonPage<PmsProduct>>({
    method: 'GET',
    url: '/product/search',
    params,
  })
}

// ❌ 错误 - 创建无意义的类型别名
export type ProductListResult = CommonPage<PmsProduct> // 禁止！

export const searchProductListAPI = (params: ProductListParam) => {
  return http<ProductListResult>({
    // 不推荐
    method: 'GET',
    url: '/product/search',
    params,
  })
}
```

#### 5.4.3 页面中使用分页数据

```typescript
import { ref } from 'vue'
import type { CommonPage } from '@/types/common'
import type { PmsProduct } from '@/types/product'

// 定义响应式数据
const productList = ref<PmsProduct[]>([])
const currentPage = ref(1)
const hasMore = ref(true)

// 加载数据
const loadData = async (type: 'refresh' | 'loadmore' = 'refresh') => {
  if (type === 'refresh') {
    currentPage.value = 1
    productList.value = []
  }

  try {
    const res = await searchProductListAPI({
      pageNum: currentPage.value,
      pageSize: 6,
      productCategoryId: categoryId.value,
      sort: 0,
    })

    // 从 CommonPage 中解构数据
    const { list, totalPage } = res.data

    if (list.length === 0) {
      hasMore.value = false
    } else if (list.length < 6 || currentPage.value >= totalPage) {
      hasMore.value = false
    } else {
      currentPage.value++
    }

    productList.value = productList.value.concat(list)
  } catch (e) {
    console.error('加载失败', e)
  }
}
```

#### 5.4.4 CommonPage 字段说明

| 字段        | 类型     | 说明         |
| ----------- | -------- | ------------ |
| `pageNum`   | `number` | 当前页码     |
| `pageSize`  | `number` | 每页数量     |
| `totalPage` | `number` | 总页数       |
| `total`     | `number` | 总条数       |
| `list`      | `T[]`    | 分页数据列表 |

> **注意**：字段名为 `totalPage`（单数），不是 `totalPages`（复数）

#### 5.4.5 禁止事项

- ❌ **禁止创建无意义的类型别名**：如 `ProductListResult = CommonPage<PmsProduct>`
- ❌ **禁止重复定义分页字段**：应通过继承 `PageParam` 复用
- ❌ **禁止使用 PageResult**：项目统一使用 `CommonPage`，不使用其他分页类型

### 5.5 事件处理方法命名

页面中的事件处理方法以 **handle** 开头：

```typescript
// ✅ 正确
const handleCheck = (index: number) => { ... }
const handleCheckAll = () => { ... }
const handleDeleteCartItem = (index: number) => { ... }
const handleNumberChange = (data) => { ... }

// ❌ 错误
const check = (index: number) => { ... }
const onCheckAll = () => { ... }
const deleteItem = (index: number) => { ... }
```

### 5.6 API 返回类型命名

返回类型按照 API 文档中的名称来命名。后端模型以 Java 类名（如 `OmsCartItem`、`PmsBrand`、`SmsCoupon`）为准，前端保持一致：

```typescript
// ✅ 正确 - 与后端模型名一致
export type CartItem = { ... }    // 对应后端 OmsCartItem（省略 Oms 前缀）
export type PmsBrand = { ... }    // 对应后端 PmsBrand
export type SmsCoupon = { ... }   // 对应后端 SmsCoupon
```

> API 方法返回值泛型名称必须与 Swagger 文档中定义的响应 Schema 名称严格保持一致。

### 5.7 删除类 API 参数传递

删除类 API（如 `/cart/delete`）的参数必须以 **URL 查询字符串** 形式传递，格式为 `?ids=1,2`，禁止使用 `params` 或 `data` 字段封装：

```typescript
// ✅ 正确
export const deleteCartAPI = (params: { ids: string }) => {
  return http({
    method: 'POST',
    url: '/cart/delete',
    params: params,
  })
}
```

---

## 6. 项目结构

```
src/
├── apis/                    # API 请求方法（按业务模块划分）
│   ├── cart.ts              # 购物车相关接口
│   ├── coupon.ts            # 优惠券相关接口
│   ├── home.ts              # 首页相关接口
│   └── member.ts            # 会员相关接口
├── components/              # 公共组件
│   ├── empty.vue            # 空状态组件
│   ├── mix-list-cell.vue    # 列表单元格组件
│   ├── mix-loading.vue      # 加载组件
│   ├── share.vue            # 分享组件
│   ├── uni-number-box.vue   # 数字输入框组件
│   └── upload-images.vue    # 图片上传组件
├── composables/             # 组合式函数（自定义 hooks）
│   └── index.ts
├── pages/                   # 页面（按功能模块划分）
│   ├── cart/                # 购物车
│   │   └── cart.vue
│   ├── category/            # 分类
│   │   └── category.vue
│   ├── index/               # 首页
│   │   └── index.vue
│   ├── public/              # 公共页面（登录、注册等）
│   │   ├── login.vue
│   │   └── register.vue
│   ├── set/                 # 设置
│   │   └── set.vue
│   └── user/                # 我的
│       └── user.vue
├── static/                  # 静态资源
│   ├── images/              # 图片资源
│   ├── tabs/                # 底部导航栏图标
│   └── temp/                # 临时资源（广告图等）
├── stores/                  # Pinia 状态管理
│   └── member.ts            # 会员状态
├── styles/                  # 全局样式
│   └── fonts.scss           # 字体图标定义
├── types/                   # TypeScript 类型定义（与 apis/ 一一对应）
│   ├── brand.d.ts           # 品牌相关类型
│   ├── cart.d.ts            # 购物车相关类型
│   ├── common.d.ts          # 通用类型（CommonResult、CommonPage、PageParam）
│   ├── coupon.d.ts          # 优惠券相关类型
│   ├── home.d.ts            # 首页相关类型
│   ├── member.d.ts          # 会员核心类型（登录、注册、用户信息）
│   ├── memberBrandAttention.d.ts  # 品牌关注类型
│   ├── memberProductCollection.d.ts # 商品收藏类型
│   ├── memberReadHistory.d.ts    # 浏览记录类型
│   └── product.d.ts         # 商品相关类型
├── utils/                   # 工具函数
│   └── http.ts              # HTTP 请求封装（拦截器 + 统一错误处理）
├── App.vue                  # 应用入口
├── env.d.ts                 # 环境类型声明
├── main.ts                  # 应用初始化（Pinia、持久化插件）
├── manifest.json            # 应用配置（AppID、平台配置）
├── pages.json               # 页面路由与导航栏配置
└── uni.scss                 # 全局 SCSS 变量
```

### 关键配置文件

| 文件                    | 作用                                                      |
| ----------------------- | --------------------------------------------------------- |
| `.env`                  | 通用环境变量（API 基础地址默认指向开发环境）              |
| `.env.development`      | 开发环境变量（API → `http://localhost:8085`）             |
| `.env.production`       | 生产环境变量（API → `https://portal-api.macrozheng.com`） |
| `vite.config.ts`        | Vite 构建配置（集成 uni-app 插件、sourcemap）             |
| `tsconfig.json`         | TypeScript 配置（路径别名 `@/*`、类型声明）               |
| `.prettierrc.js`        | Prettier 格式化规则                                       |
| `.vscode/settings.json` | VSCode 工作区设置（保存自动格式化、ESLint 自动修复）      |

---

## 7. 各目录代码写法规范

### 7.1 apis - API 请求方法

**规范要点**：

1. 写 API 之前先查阅 API 文档（`docs/api/` 目录下对应的 Controller Markdown 文档，或在线 Swagger）
2. 返回结果类型按照 API 文档中的定义来写
3. 方法名以 `API` 结尾
4. 请求参数类型以 `Param` 结尾（单数）
5. 每个方法上方添加 `/** 注释 */` 说明用途
6. 使用泛型 `http<T>()` 声明返回数据类型
7. **API 方法划分遵循原项目（mall-app-web）的 `src/api/` 目录结构**，原项目拆分为几个 API 文件，迁移后也拆分为对应的几个文件，不得随意合并或拆分

**示例**（来源：`src/apis/home.ts`）：

```typescript
import { http } from '@/utils/http'
import type { PmsProduct, PmsProductCategory } from '@/types/product'
import type { HomeContentResult } from '@/types/home'
import type { PageParam } from '@/types/common'

/** 首页内容 */
export const getHomeContentAPI = () => {
  return http<HomeContentResult>({
    method: 'GET',
    url: '/home/content',
  })
}

/** 推荐商品列表 */
export const getRecommendProductListAPI = (params?: PageParam) => {
  return http<PmsProduct[]>({
    method: 'GET',
    url: '/home/recommendProductList',
    data: params,
  })
}

/** 商品分类列表 */
export const getProductCateListAPI = (parentId: string) => {
  return http<PmsProductCategory[]>({
    method: 'GET',
    url: `/home/productCateList/${parentId}`,
  })
}
```

**示例**（来源：`src/apis/member.ts`，含请求参数类型定义）：

```typescript
import { http } from '@/utils/http'
import type { LoginResult, MemberInfo } from '@/types/member'

/** 登录请求参数 */
export type LoginParam = {
  /** 账户名 */
  username: string
  /** 密码 */
  password: string
}

/** 登录 */
export const loginAPI = (data: LoginParam) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/sso/login',
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    data,
  })
}
```

### 7.2 types - 类型定义

**规范要点**：

1. 参考 `CommonResult<T>` 中的结构来定义
2. 所有类型使用 `type` 定义，不使用 `interface`
3. 注释采用 JSDoc 块注释格式（`/** 注释 */`），置于字段声明上方
4. 与后端 API 文档中的模型定义保持一致
5. **类型文件与 `apis/` 目录严格一一对应**：`apis/` 中有几个 API 文件，`types/` 中就有几个对应的 `.d.ts` 文件，每个类型文件只包含其对应 API 所依赖的类型定义
6. 前端扩展字段（非后端返回）需添加 `/** 前端扩展字段：xxx */` 注释

**apis 与 types 对应关系示例**：

| apis 文件                    | types 文件                     | 包含类型                                                   |
| ---------------------------- | ------------------------------ | ---------------------------------------------------------- |
| `member.ts`                  | `member.d.ts`                  | `MemberInfo`, `LoginResult`, `LoginParam`, `RegisterParam` |
| `memberReadHistory.ts`       | `memberReadHistory.d.ts`       | `MemberReadHistory`                                        |
| `memberProductCollection.ts` | `memberProductCollection.d.ts` | `MemberProductCollection`                                  |
| `memberBrandAttention.ts`    | `memberBrandAttention.d.ts`    | `MemberBrandAttention`                                     |
| `brand.ts`                   | `brand.d.ts`                   | `PmsBrand`                                                 |
| `cart.ts`                    | `cart.d.ts`                    | `CartItem`                                                 |

**示例**（来源：`src/types/common.d.ts`）：

```typescript
/** 通用返回结果封装类 */
export type CommonResult<T> = {
  /** 状态码 */
  code: number
  /** 提示信息 */
  message: string
  /** 封装数据 */
  data: T
}

/** 通用分页结果封装类 */
export type CommonPage<T> = {
  /** 当前页码 */
  pageNum: number
  /** 每页数量 */
  pageSize: number
  /** 总页数 */
  totalPage: number
  /** 总条数 */
  total: number
  /** 分页数据 */
  list: T[]
}

/** 通用分页请求参数 */
export type PageParam = {
  /** 当前页码，从1开始 */
  pageNum: number
  /** 每页数量，默认10 */
  pageSize: number
  /** 查询关键字 */
  keyword?: string
}
```

**示例**（来源：`src/types/cart.d.ts`，含前端扩展字段）：

```typescript
/**
 * 购物车项
 * 对应后端 OmsCartItem 类型
 */
export type CartItem = {
  /** 购物车项 ID */
  id: string
  /** 会员 ID */
  memberId: string
  /** 商品名称 */
  productName: string
  /** 商品价格 */
  price: number
  /** 商品数量 */
  quantity: number
  // ... 其他后端字段
  /** 前端扩展字段：选中状态 */
  checked?: boolean
  /** 前端扩展字段：图片加载状态 */
  loaded?: string
  /** 前端扩展字段：属性文字 */
  spDataStr?: string
}
```

### 7.3 stores - Pinia 状态管理

**规范要点**：

1. 使用 `defineStore` + Setup Store 语法（函数式定义）
2. Store 命名：`useXxxStore`（如 `useMemberStore`）
3. 使用 `ref` 定义状态，`computed` 定义计算属性
4. 状态和方法按功能分组，添加注释
5. 持久化配置使用 uni-app 兼容方式（`uni.setStorageSync` / `uni.getStorageSync`）
6. 核心业务逻辑（如登录流程）放在 Store 中，页面只负责 UI 交互

**示例**（来源：`src/stores/member.ts`）：

```typescript
import type { MemberInfo } from '@/types/member'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginAPI, getMemberInfoAPI } from '@/apis/member'

// 定义会员Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const memberInfo = ref<MemberInfo>()

    // 是否已登录
    const hasLogin = computed(() => !!memberInfo.value)

    // 保存会员信息，登录时使用
    const setMemberInfo = (val: MemberInfo) => {
      memberInfo.value = val
    }

    // 会员登录（核心业务逻辑，不包含 UI 交互）
    const memberLogin = async (username: string, password: string) => {
      // 1. 调用登录接口获取 token
      const loginRes = await loginAPI({ username, password })
      // 2. 拼接完整 token 并存储
      const loginData = loginRes.data
      const token = `${loginData.tokenHead}${loginData.token}`
      uni.setStorageSync('token', token)
      // 3. 获取用户信息
      const memberRes = await getMemberInfoAPI()
      // 4. 保存用户信息到 Pinia
      setMemberInfo(memberRes.data)
    }

    // 会员退出登录
    const memberLogout = () => {
      memberInfo.value = undefined
      uni.removeStorageSync('token')
    }

    return {
      memberInfo,
      hasLogin,
      setMemberInfo,
      memberLogin,
      memberLogout,
    }
  },
  {
    // 持久化配置（兼容多端）
    persist: {
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        },
      },
    },
  },
)
```

### 7.4 pages - 页面

**规范要点**：

#### 7.4.1 文件结构顺序

Vue 页面代码按如下顺序排列：

```
<template> → <script setup lang="ts"> → <style lang="scss" scoped>
```

#### 7.4.2 `<script>` 中代码顺序

代码按以下顺序排列，每个区块之间使用分组注释（`// ===== xxx =====`）分隔：

```typescript
<script setup lang="ts">
// 1. 导入语句
import { ref, computed, watch } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { useMemberStore } from '@/stores/member'
import { getCartListAPI, deleteCartAPI } from '@/apis/cart'
import type { CartItem } from '@/types/cart'

// ===== Store 相关 =====
// 获取会员store
const memberStore = useMemberStore()
// 是否登录
const hasLogin = computed(() => !!memberStore.memberInfo)

// ===== 页面数据 =====
// 购物车中商品列表
const cartList = ref<CartItem[]>([])
// 购物车中商品总价
const totalPrice = ref(0)
// 购物车中商品是否全部选中
const allChecked = ref(false)
// 购物车中商品是否为空
const empty = ref(false)

// ===== 计算属性 =====
// 购物车中商品总数
const totalCount = computed(() => cartList.value.length)

// ===== 数据加载 =====
// 加载购物车数据
const loadData = async () => {
  if (!hasLogin.value) return
  try {
    const res = await getCartListAPI()
    cartList.value = res.data
    calcTotal()
  } catch (e) {
    console.error('加载购物车失败', e)
  }
}

// ===== 生命周期 =====
// 页面加载时执行
onLoad(() => {
  loadData()
})

// 页面显示时调用
onShow(() => {
  loadData()
})

// 监听购物车列表变化
watch(
  () => cartList.value.length,
  (len) => {
    empty.value = len === 0
  },
)

// ===== 事件处理方法 =====
// 选择商品
const handleCheck = (index: number) => {
  cartList.value[index].checked = !cartList.value[index].checked
  calcTotal()
}

// 全选商品
const handleCheckAll = () => {
  const checked = !allChecked.value
  cartList.value.forEach((item) => {
    item.checked = checked
  })
  allChecked.value = checked
  calcTotal()
}

// 删除商品
const handleDeleteCartItem = async (index: number) => {
  const row = cartList.value[index]
  try {
    await deleteCartAPI({ ids: row.id })
    cartList.value.splice(index, 1)
    calcTotal()
  } catch (e) {
    console.error('删除失败', e)
  }
}

// ===== 其他方法 =====
// 计算商品总价
const calcTotal = () => {
  // ... 计算逻辑
}

// 跳转登录
const navToLogin = () => {
  uni.navigateTo({ url: '/pages/public/login' })
}
</script>
```

#### 7.4.3 异步请求调用

使用 `async/await` 形式，不使用 `.then()` / `.catch()` 链式调用：

```typescript
// ✅ 正确
const loadData = async () => {
  try {
    const res = await getCartListAPI()
    cartList.value = res.data
  } catch (e) {
    console.error('加载购物车失败', e)
  }
}

// ❌ 错误
const loadData = () => {
  getCartListAPI()
    .then((res) => {
      cartList.value = res.data
    })
    .catch((e) => {
      console.error('加载购物车失败', e)
    })
}
```

#### 7.4.4 注释规范

- 常量（const）声明需添加注释说明用途
- 方法需添加注释说明功能
- 注释风格统一使用 `//` 行注释

```typescript
// 购物车中商品总价
const totalPrice = ref(0)

// 加载购物车数据
const loadData = async () => { ... }

// 选择商品
const handleCheck = (index: number) => { ... }
```

#### 7.4.5 功能分组

同一块功能的属性和方法写在一起，不同功能之间使用分组注释（格式 `// ===== xxx =====`）+ 空行分隔。

**标准分组标签**（按代码出现顺序）：

| 分组标签                      | 包含内容                                  |
| ----------------------------- | ----------------------------------------- |
| `// ===== Store 相关 =====`   | Pinia Store 实例、computed 派生状态       |
| `// ===== 页面数据 =====`     | 页面内的 `ref` 响应式数据                 |
| `// ===== 计算属性 =====`     | 页面内的 `computed` 计算属性              |
| `// ===== 数据加载 =====`     | `loadData` 等数据获取方法                 |
| `// ===== 生命周期 =====`     | `onLoad`、`onShow`、`onReady`、`watch` 等 |
| `// ===== 事件处理方法 =====` | `handle` 开头的 UI 事件处理方法           |
| `// ===== 其他方法 =====`     | 工具函数、校验函数等非事件处理的辅助方法  |

> **注意**：并非每个页面都需要全部六组，按实际功能选取即可。当某组无内容时，可省略该分组标签。

```typescript
// ===== Store 相关 =====
// 获取会员store
const memberStore = useMemberStore()
// 是否登录
const hasLogin = computed(() => !!memberStore.memberInfo)

// ===== 页面数据 =====
// 购物车中商品列表
const cartList = ref<CartItem[]>([])
// 购物车中商品总价
const totalPrice = ref(0)
// 购物车中商品是否全部选中
const allChecked = ref(false)
// 购物车中商品是否为空
const empty = ref(false)

// ===== 计算属性 =====
// 购物车中商品总数
const totalCount = computed(() => cartList.value.length)

// ===== 数据加载 =====
// 加载购物车数据
const loadData = async () => { ... }

// ===== 生命周期 =====
// 页面加载时执行
onLoad(() => { loadData() })

// ===== 事件处理方法 =====
// 选择商品
const handleCheck = (index: number) => { ... }

// ===== 其他方法 =====
// 计算商品总价
const calcTotal = () => { ... }
```

---

## 8. 环境变量配置

项目通过 Vite 环境变量管理不同环境的配置：

| 变量                | 说明         | 开发环境              | 生产环境                          |
| ------------------- | ------------ | --------------------- | --------------------------------- |
| `VITE_APP_TITLE`    | 应用标题     | Mall 商城（开发环境） | Mall 商城                         |
| `VITE_API_BASE_URL` | API 基础地址 | http://localhost:8085 | https://portal-api.macrozheng.com |
| `VITE_APP_DEBUG`    | 调试模式     | true                  | false                             |

---

## 9. 代码格式化配置

Prettier 配置已定义在 `.prettierrc.js` 中，关键规则：

| 规则          | 值         | 说明                   |
| ------------- | ---------- | ---------------------- |
| singleQuote   | `true`     | 使用单引号             |
| semi          | `false`    | 不使用分号             |
| printWidth    | `100`      | 每行最大 100 字符      |
| trailingComma | `'all'`    | 末尾逗号               |
| tabWidth      | `2`        | 2 空格缩进             |
| arrowParens   | `'always'` | 箭头函数参数始终加括号 |

VSCode 配置已设置保存时自动格式化（`.vscode/settings.json`），开发者无需手动格式化。

---

## 10. 开发调试

### 10.1 启动开发服务器

启动前需先检查 5173 端口是否被占用，若已占用则关闭该端口上的服务，避免重复运行前端项目：

```bash
# 1. 检查 5173 端口占用情况
netstat -ano | findstr :5173

# 2. 若端口被占用，根据上一步输出的 PID 终止进程
taskkill /PID <PID> /F

# 3. 启动开发服务
# H5 开发
npm run dev:h5

# 微信小程序开发
npm run dev:mp-weixin
```

> **注意**：禁止使用 `taskkill /F /IM node.exe` 终止全部 Node 进程，会导致其他服务中断。必须先通过 `netstat` 定位具体 PID，再按 PID 精准终止。

### 10.2 页面调试

项目启动完成后，使用 Chrome DevTools 打开页面进行调试。开发模式下已启用 sourcemap（`vite.config.ts` 中配置），支持断点调试。

---

## 11. Git 规范

### 11.1 提交信息格式

```
<type>(<scope>): <subject>
```

**type 类型**：

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试
- `chore`: 构建/工具变动

### 11.2 代码提交前检查

项目配置了 Husky + lint-staged，提交时自动执行：

- ESLint 检查 + 自动修复
- Prettier 格式化

确保提交的代码符合规范，无需手动执行 lint 命令。

---

## 12. 常见注意事项

1. **路径别名**：项目中使用 `@/` 代替 `src/`（如 `import { http } from '@/utils/http'`）
2. **平台条件编译**：使用 `#ifdef` / `#endif` 处理多端差异（如 `<!-- #ifdef MP -->`）
3. **rpx 单位**：样式优先使用 `rpx` 适配多端屏幕，`upx` 已废弃
4. **图片资源**：静态资源放在 `src/static/` 下，网络图片需确保域名已在小程序后台配置
5. **字体图标**：项目使用 iconfont 字体图标（`yticon`），图标类名定义在 `src/styles/fonts.scss` 中
6. **pages.json**：新增页面必须在此文件中注册路由和导航栏配置
7. **easycom**：组件自动导入已开启，`@dcloudio/uni-ui` 组件无需手动 import
