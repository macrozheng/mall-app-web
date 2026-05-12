---
name: vue2-to-vue3-page-migration
description: 指导将单个页面从Vue2升级到Vue3的完整迁移流程，包括分析源页面、类型定义、API方法、页面代码转换、路由注册和UI验证。适用于mall-app-vue3项目的页面迁移工作。
---

# Vue2 到 Vue3 页面迁移指南

## 迁移概述

### 项目背景

本项目从 [mall-app-web](https://github.com/macrozheng/mall-app-web)（Vue2）迁移至 mall-app-vue3（Vue3），采用**按页面逐个迁移**的策略。每迁移一个页面，确保功能完整、UI 一致后再进行下一个。

### 源项目与目标项目

| 项目          | 路径                               | 技术栈                    |
| ------------- | ---------------------------------- | ------------------------- |
| Vue2 源项目   | `D:\developer\github\mall-app-web` | Vue2 + Vuex + JavaScript  |
| Vue3 目标项目 | `d:\developer\gitee\mall-app-vue3` | Vue3 + Pinia + TypeScript |

### 迁移进度

详细的页面迁移进度和迁移顺序请查看 `docs/migration-progress.md`。

---

## 迁移流程概述

每个页面的迁移遵循以下 **7 个阶段**，严格按顺序执行：

1. 阶段 1: 分析源页面
2. 阶段 2: 类型定义
3. 阶段 3: API 方法
4. 阶段 4: 页面代码
5. 阶段 5: 路由注册与构建验证
6. 阶段 6: 编译验证
7. 阶段 7: 更新迁移进度文档

## 阶段 1：分析源页面

**目标**：理解 Vue2 页面的功能、依赖和结构，制定迁移方案。

**步骤**：

1. **读取源页面**：打开 `D:\developer\github\mall-app-web\src\pages\<module>\<page>.vue`
2. **功能梳理**：列出页面的核心功能点（数据加载、事件处理、跳转逻辑等）
3. **依赖识别**：
   - 调用了哪些 API（识别 `this.$api.xxx` 或 import 的 API 方法）
   - 使用了哪些 Vuex 状态（识别 `mapState`、`mapMutations`、`mapGetters`）
   - 引用了哪些组件（识别 `import` 和 `components` 注册）
   - 使用了哪些混入/插件（识别 `mixins`）
4. **查阅 API 文档**：对照 `docs/api/` 目录下对应的 Controller Markdown 文档，确认该页面涉及的接口定义和返回类型
5. **记录迁移清单**：列出需要新增/修改的文件

**输出**：一份包含功能点、依赖关系、文件清单的迁移分析

## 阶段 2：类型定义

**目标**：在 `src/types/` 中定义页面所需的 TypeScript 类型。

**步骤**：

1. **查阅 API 文档**：在 `docs/api/` 目录下对应的 Controller Markdown 文档中查找接口定义和数据模型
2. **创建/更新类型文件**：文件命名与 `apis/` 目录对应（如 `order.ts` ↔ `order.d.ts`）
3. **类型定义规范**：
   - 使用 `type` 定义，不使用 `interface`
   - 字段注释采用 JSDoc 格式（`/** 注释 */`），置于字段上方
   - 返回类型命名与后端模型保持一致（如 `OmsOrder` → 前端 `OmsOrder` 或省略前缀）
   - 前端扩展字段添加 `/** 前端扩展字段：xxx */` 注释
   - 请求参数类型以 `Param` 结尾（单数形式）

**示例**：

```typescript
/**
 * 订单
 * 对应后端 OmsOrder 类型
 */
export type OmsOrder = {
  /** 订单ID */
  id: number
  /** 订单编号 */
  orderSn: string
  /** 订单状态 */
  status: number
  // ...
}

/** 创建订单请求参数 */
export type CreateOrderParam = {
  /** 购物车ID列表 */
  cartIds: string[]
  /** 收货地址ID */
  memberReceiveAddressId: number
  // ...
}
```

## 阶段 3：API 方法

**目标**：在 `src/apis/` 中定义页面所需的 API 请求方法。

**步骤**：

1. **查阅 API 文档**：确认接口路径、请求方法、参数格式
2. **创建/更新 API 文件**：文件命名与 `types/` 目录对应
3. **API 方法规范**：
   - 方法名以 `API` 结尾（如 `getOrderListAPI`）
   - 每个方法上方添加 `/** 注释 */` 说明用途
   - 使用泛型 `http<T>()` 声明返回数据类型
   - 删除类 API 参数以 URL 查询字符串传递（`params: { ids: '1,2' }`）
   - 请求参数类型以 `Param` 结尾

**示例**：

```typescript
import { http } from '@/utils/http'
import type { OmsOrder } from '@/types/order'
import type { CreateOrderParam, PageParam } from '@/types/order'
import type { CommonPage } from '@/types/common'

/** 获取订单列表 */
export const getOrderListAPI = (params: PageParam) => {
  return http<CommonPage<OmsOrder>>({
    method: 'GET',
    url: '/order/list',
    data: params,
  })
}

/** 创建订单 */
export const createOrderAPI = (data: CreateOrderParam) => {
  return http<OmsOrder>({
    method: 'POST',
    url: '/order/create',
    data,
  })
}
```

## 阶段 4：页面代码

**目标**：创建 Vue3 页面文件，完成核心代码迁移。

**步骤**：

1. **创建页面文件**：`src/pages/<module>/<page>.vue`
2. **代码转换**：按 Vue2 → Vue3 关键转换规则逐项转换
3. **代码结构**：遵循 `<template>` → `<script setup lang="ts">` → `<style lang="scss" scoped>` 顺序
4. **script 内部顺序**：导入 → 常量 → loadData → onLoad → onShow → watch → 事件处理方法 → 其他方法
5. **样式迁移**：将 `upx` 替换为 `rpx`，检查 SCSS 变量计算单位一致性

### Vue2 → Vue3 关键转换规则

#### 状态管理：Vuex → Pinia

```typescript
// ===== Vue2 (Vuex) =====
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['userInfo']),
    hasLogin() {
      return !!this.userInfo
    },
  },
  methods: {
    ...mapMutations(['login', 'logout']),
    handleLogin() {
      this.login(data)
    },
  },
}

// ===== Vue3 (Pinia) =====
import { useMemberStore } from '@/stores/member'

// 获取会员store
const memberStore = useMemberStore()
// 是否登录
const hasLogin = computed(() => !!memberStore.memberInfo)
// 登录
await memberStore.memberLogin(username, password)
// 退出
memberStore.memberLogout()
```

#### 响应式数据：data → ref/reactive

```typescript
// ===== Vue2 =====
data() {
  return {
    cartList: [],
    totalPrice: 0,
    allChecked: false,
    empty: false
  }
}

// ===== Vue3 =====
// 购物车中商品列表
const cartList = ref<CartItem[]>([])
// 购物车中商品总价
const totalPrice = ref(0)
// 购物车中商品是否全部选中
const allChecked = ref(false)
// 购物车中商品是否为空
const empty = ref(false)
```

#### 生命周期：Options API → Composition API

```typescript
// ===== Vue2 =====
export default {
  onLoad(options) { ... },
  onShow() { ... },
  onReady() { ... },
  onHide() { ... },
  onUnload() { ... },
}

// ===== Vue3 =====
import { onLoad, onShow } from '@dcloudio/uni-app'

// 页面加载时执行
onLoad((options) => { ... })
// 页面显示时调用
onShow(() => { ... })
```

#### 异步请求：Promise → async/await

```typescript
// ===== Vue2 (Promise 链式调用) =====
getCartList()
  .then((response) => {
    this.cartList = response.data
    this.calcTotal()
  })
  .catch((e) => {
    console.error(e)
  })

// ===== Vue3 (async/await) =====
// 加载购物车数据
const loadData = async () => {
  try {
    const res = await getCartListAPI()
    cartList.value = res.data
    calcTotal()
  } catch (e) {
    console.error('加载购物车失败', e)
  }
}
```

#### 计算属性：computed → computed()

```typescript
// ===== Vue2 =====
computed: {
  hasLogin() {
    return !!this.userInfo
  }
}

// ===== Vue3 =====
// 是否登录
const hasLogin = computed(() => !!memberStore.memberInfo)
```

#### 侦听器：watch → watch()

```typescript
// ===== Vue2 =====
watch: {
  'cartList.length'(len) {
    this.empty = len === 0
  }
}

// ===== Vue3 =====
// 监听购物车列表变化
watch(
  () => cartList.value.length,
  (len) => {
    empty.value = len === 0
  },
)
```

#### 事件处理：methods → 函数声明

```typescript
// ===== Vue2 =====
methods: {
  handleCheck(index) {
    this.cartList[index].checked = !this.cartList[index].checked
    this.calcTotal()
  }
}

// ===== Vue3 =====
// 选择商品
const handleCheck = (index: number) => {
  cartList.value[index].checked = !cartList.value[index].checked
  calcTotal()
}
```

#### 模板引用：this.$refs → ref 模板引用

```typescript
// ===== Vue2 =====
this.$refs.list

// ===== Vue3 =====
const list = ref(null) // 在 script 中声明
// 模板中：<view ref="list">
```

#### 组件注册：components → 自动导入

```typescript
// ===== Vue2 =====
import UniNumberBox from '@/components/uni-number-box.vue'
export default {
  components: { UniNumberBox },
}

// ===== Vue3 =====
// easycom 已开启，uni- 组件无需手动导入
// 自定义组件仍需 import
import uniNumberBox from '@/components/uni-number-box.vue'
```

#### 路由跳转：保持不变

uni-app 的路由 API 在 Vue2 和 Vue3 中保持一致：

```typescript
uni.navigateTo({ url: '/pages/order/order' })
uni.switchTab({ url: '/pages/index/index' })
uni.redirectTo({ url: '/pages/public/login' })
uni.navigateBack()
```

## 阶段 5：路由注册与构建验证

**目标**：注册页面路由，确保项目可正常编译。

**步骤**：

1. **注册路由**：在 `src/pages.json` 中添加页面路径和导航栏配置
2. **构建验证**：运行 `npm run dev:h5`，确保无编译错误
3. **检查 TypeScript**：确保无类型错误

**pages.json 路由配置示例**：

```json
{
  "path": "pages/order/order",
  "style": {
    "navigationBarTitleText": "我的订单",
    "navigationStyle": "custom"
  }
}
```

## 阶段 6：编译验证

**目标**：确保迁移后的项目可正常编译，无语法和类型错误。UI 对比与功能验证交由用户自行进行。

**步骤**：

1. **构建验证**：运行 `npm run build:h5`，确保无编译错误
2. **检查 TypeScript**：确保无类型错误（若 vue-tsc 可用）
3. **通知用户**：告知用户迁移完成，提醒其在浏览器中验证 UI 和功能

## 阶段 7：更新迁移进度文档

**目标**：在 `docs/migration-progress.md` 中记录迁移完成情况，保持进度表与实际一致。

**步骤**：

1. **打开进度文档**：打开 `docs/migration-progress.md`
2. **定位页面记录**：找到当前迁移页面所在的阶段表格（按业务功能分组）
3. **更新页面状态**：
   - 将**状态**列从 `☐ 待迁移` 改为 `✅ 已完成`
   - 将**完成日期**列更新为当前日期（格式：`YYYY-MM-DD`，如 `2026-05-06`）
4. **更新迁移总览**：
   - 修改**已完成**数量（累计已完成的页面总数）
   - 修改**待迁移**数量（剩余未完成的页面总数）
   - 重新计算**完成率**（已完成 / 总页面数，向下取整）
5. **记录可选迁移项**（如有）：
   - 若页面中有非核心功能暂时跳过，在文档底部"可选迁移"部分补充说明
   - 注明跳过的功能、原因及计划恢复时间

**示例**：

假设当前迁移的是商品详情页（`pages/product/product`），属于第四阶段，更新如下：

```markdown
### 第四阶段：商品浏览

| 序号 | 页面路径                 | 功能     | 源文件                      | 代码量 | 状态      | 完成日期   |
| ---- | ------------------------ | -------- | --------------------------- | ------ | --------- | ---------- |
| 8    | `/pages/product/product` | 商品详情 | `pages/product/product.vue` | 32.9KB | ✅ 已完成 | 2026-05-06 |
```

同时更新迁移总览：

```markdown
| 统计项   | 数量    | 页面                                   |
| -------- | ------- | -------------------------------------- |
| 总页面数 | 24      |                                        |
| 已完成   | 19      | ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ |
| 待迁移   | 5       | ☐☐☐☐☐                                  |
| 完成率   | **79%** |                                        |
```

**注意事项**：

- 日期格式统一为 `YYYY-MM-DD`
- 状态标记仅使用文档中定义的四种：`✅ 已完成`、`🔧 进行中`、`☐ 待迁移`、`❌ 阻塞`
- 若一次迁移多个页面，需逐一更新每个页面对应行的状态和日期
- 完成率计算公式：`Math.floor(已完成 / 总页面数 * 100)`

## 页面代码骨架

迁移新页面时，可直接复制以下骨架，按需填充：

```vue
<template>
  <view class="container">
    <!-- 页面内容 -->
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { useMemberStore } from '@/stores/member'

// ===== 导入 =====
// import { getXxxAPI } from '@/apis/xxx'
// import type { XxxType } from '@/types/xxx'

// ===== Store 相关 =====
// 获取会员store
const memberStore = useMemberStore()
// 是否登录
const hasLogin = computed(() => !!memberStore.memberInfo)

// ===== 页面数据 =====
// 数据列表
const list = ref<XxxType[]>([])
// 是否为空
const empty = ref(false)
// 加载中
const loading = ref(false)

// ===== loadData =====
// 加载页面数据
const loadData = async () => {
  if (!hasLogin.value) return
  loading.value = true
  try {
    // const res = await getXxxAPI()
    // list.value = res.data
    // empty.value = list.value.length === 0
  } catch (e) {
    console.error('加载数据失败', e)
  } finally {
    loading.value = false
  }
}

// ===== onLoad =====
// 页面加载
onLoad((options) => {
  // 处理页面参数
})

// ===== onShow =====
// 页面显示
onShow(() => {
  loadData()
})

// ===== watch =====

// ===== 事件处理方法 =====
// 处理xxx操作
const handleXxx = () => {
  // ...
}

// ===== 其他方法 =====
</script>

<style lang="scss" scoped>
.container {
  // 页面样式
}
</style>
```

## 常见问题与解决方案

### 样式相关

| 问题                        | 原因                            | 解决方案                                                                                                          |
| --------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| upx 单位不生效              | uni-app Vue3 不支持 upx         | 全部替换为 `rpx`                                                                                                  |
| SCSS 变量计算单位不一致     | 如 `$font-sm + 2upx` 混用       | 确保同一表达式中单位一致，如 `28rpx`                                                                              |
| 边框样式（.b-b / .b-t）缺失 | Vue2 定义在 App.vue 全局样式中  | 在 Vue3 的 `App.vue` 中补齐伪元素边框样式（`transform: scaleY(0.5)`）                                             |
| 文字单行省略不生效          | 缺少 `.clamp` 全局样式          | 在 `App.vue` 中补充 `.clamp` 样式（`overflow:hidden; text-overflow:ellipsis; white-space:nowrap; display:block`） |
| flex 布局比例不对           | `flex-basis: 0%` 覆盖了 `width` | 明确设置 `width` 和 `flex-basis`，避免冲突                                                                        |
| 图片尺寸异常                | 缺少宽高约束                    | 为 image 添加 `width: 100%; height: 100%`                                                                         |

### TypeScript 相关

| 问题                          | 原因                                                | 解决方案                                                          |
| ----------------------------- | --------------------------------------------------- | ----------------------------------------------------------------- |
| `ref<T>()` 模板中类型推断报错 | `ref<T>()` 类型为 `T \| undefined`，TS 无法安全推断 | 改为 `ref<T \| null>(null)`，模板中用 `v-if="xxx"` 做 truthy 检查 |
| API 返回类型访问出错          | `CommonResult<T>` 需通过 `.data` 访问实际数据       | `const res = await xxxAPI()` → `res.data` 才是 T 类型数据         |
| `uni.request` 返回类型不匹配  | UniApp 类型定义不完整                               | 使用 `as any` 绕过类型检查                                        |
| 导航栏按钮类型错误            | H5 端 `titleNView.buttons` 仅 App 有效              | H5 端通过 `document.querySelectorAll` 操作 DOM                    |

### API 相关

| 问题                     | 原因                           | 解决方案                                                                             |
| ------------------------ | ------------------------------ | ------------------------------------------------------------------------------------ |
| 删除 API 返回 404        | 参数放在 body 中               | 删除类 API 参数必须用 `params`（URL 查询字符串）传递                                 |
| 登录 token 拼接失败      | 后端返回 `tokenHead` + `token` | `const token = \`${loginData.tokenHead}${loginData.token}\``                         |
| 请求头 Content-Type 不对 | 登录接口需要 form 格式         | 设置 `header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' }` |

### 组件相关

| 问题               | 原因                                  | 解决方案                                     |
| ------------------ | ------------------------------------- | -------------------------------------------- |
| `maxlength` 不生效 | Vue3 中需动态绑定                     | 使用 `:maxlength="11"` 而非 `maxlength="11"` |
| 密码框类型不对     | `type="password"` 在 uni-app 中不通用 | 使用 `password` 属性                         |
| 字体图标不显示     | Vue3 未迁移 fonts.scss 图标定义       | 在 `src/styles/fonts.scss` 中补齐图标类名    |
| 全局样式未生效     | Vue2 全局样式定义在 App.vue           | 确认 Vue3 的 `App.vue` 已包含所需全局样式    |

## 注意事项

### 组件文件保留策略

页面精简迁移时，**组件文件不做任何清理，全部保留**，为后续恢复其他页面提供复用基础。

### Store 职责分离

核心业务逻辑（如登录、支付等）放在 Pinia Store 中，页面只负责 UI 交互：

```
Store：memberLogin(username, password) → 纯业务逻辑（调API、存token、存用户信息）
Page：handleLogin() → UI交互（loading、toast、跳转）+ 调用 store 方法
```

### 精简迁移原则

- 迁移时以功能可用为准，不做额外重构
- 非核心功能可暂时跳过，记录在迁移文档的"可选迁移"中
- 样式迁移优先保证视觉一致，优化留待后续

### 路径与资源

- 路径别名：使用 `@/` 代替 `src/`
- 静态资源：放在 `src/static/` 下
- 字体图标：图标类名定义在 `src/styles/fonts.scss` 中，新增图标需在此文件中添加
- 网络图片：需确保域名已在小程序后台配置

### 条件编译

使用 `#ifdef` / `#endif` 处理多端差异：

```html
<!-- #ifdef MP -->
<view>仅小程序端显示</view>
<!-- #endif -->

<!-- #ifdef H5 -->
<view>仅 H5 端显示</view>
<!-- #endif -->
```
