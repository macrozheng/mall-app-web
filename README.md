# mall-app-web

<p>
  <a href="#公众号"><img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/%E5%85%AC%E4%BC%97%E5%8F%B7-macrozheng-blue.svg" alt="公众号"></a>
  <a href="#公众号"><img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/%E4%BA%A4%E6%B5%81-%E5%BE%AE%E4%BF%A1%E7%BE%A4-2BA245.svg" alt="交流"></a>
  <a href="https://github.com/macrozheng/mall"><img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AE-mall-blue.svg" alt="后台项目"></a>
  <a href="https://github.com/macrozheng/mall-admin-web"><img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE-mall--admin--web-green.svg" alt="前端项目"></a>
  <a href="https://gitee.com/macrozheng/mall-app-web"><img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/%E7%A0%81%E4%BA%91-%E9%A1%B9%E7%9B%AE%E5%9C%B0%E5%9D%80-orange.svg" alt="码云"></a>
</p>

## 前言

该项目为前后端分离项目的前端部分，后端项目`mall`地址：[传送门](https://github.com/macrozheng/mall)。

## 项目介绍

`mall-app-web`是一个电商系统的移动端项目，基于`uni-app+Vue3`实现。主要包括首页门户、商品搜索、商品展示、品牌专区、购物车、订单流程、支付、会员中心等功能。

### 项目演示

项目在线演示地址：[https://www.macrozheng.com/app/](https://www.macrozheng.com/app/)

### 效果展示

![](https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/project/mall_app_web_preview_01.png)![](https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/project/mall_app_web_preview_02.png)

![](https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/project/mall_app_web_preview_03.png)![](https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/project/mall_app_web_preview_04.png)

![](https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/project/mall_app_web_preview_05.png)![](https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/project/mall_app_web_preview_06.png)

![](https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/project/mall_app_web_preview_07.png)![](https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/project/mall_app_web_preview_08.png)

![](https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/project/mall_app_web_preview_09.png)![](https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/project/mall_app_web_preview_10.png)

### 技术选型

| 技术       | 说明             | 官网                           |
| ---------- | ---------------- | ------------------------------ |
| Vue 3      | 核心前端框架     | https://vuejs.org              |
| Pinia      | 全局状态管理框架 | https://pinia.vuejs.org        |
| TypeScript | 类型系统         | https://www.typescriptlang.org |
| uni-app    | 移动端前端框架   | https://uniapp.dcloud.io       |
| Vite       | 构建工具         | https://vitejs.dev             |
| Sass       | CSS 预处理器     | https://sass-lang.com          |
| ESLint     | 代码质量检查     | https://eslint.org             |
| Prettier   | 代码格式化       | https://prettier.io            |

### 项目结构

```lua
src -- 源码目录
├── apis -- API 请求方法（按业务模块划分）
├── components -- 通用组件封装
├── composables -- 组合式函数（自定义 hooks）
├── pages -- 前端页面
│   ├── address -- 地址管理页
│   ├── brand -- 商品品牌页
│   ├── cart -- 购物车页
│   ├── category -- 商品分类页
│   ├── coupon -- 优惠券页
│   ├── index -- 首页
│   ├── money -- 支付页
│   ├── notice -- 通知页
│   ├── order -- 订单页
│   ├── product -- 商品页
│   ├── public -- 登录页
│   ├── set -- 设置页
│   └── user -- 会员页
├── static -- 图片等静态资源
├── stores -- Pinia 状态管理
├── styles -- 全局样式
├── types -- TypeScript 类型定义
└── utils -- 工具类
```

## 搭建步骤

- 本项目使用了`VSCode`开发，下载地址：https://code.visualstudio.com/
- 该项目为前后端分离项目，访问本地访问接口需搭建后台环境，搭建请参考后端项目[传送门](https://github.com/macrozheng/mall)；
- 注意由于`mall-app-web`中的接口都在`mall-portal`模块中，所以一定要启动该模块；
- 访问在线接口无需搭建后台环境，只需将`.env.development`文件中的`VITE_API_BASE_URL`改为线上地址即可：https://portal-api.macrozheng.com
- 克隆源代码到本地，使用`VSCode`打开，使用`npm install`命令安装项目依赖；
- H5 端运行：在`VSCode`中使用`npm run dev:h5`运行项目，运行成功后打开下面地址（将浏览器改为手机模式）：http://localhost:5173
- 微信小程序端运行：在`VSCode`中使用`npm run dev:mp-weixin`运行项目，运行成功后在`微信开发者工具`中导入项目的`\dist\dev\mp-weixin`即可运行

## 公众号

学习不走弯路，关注公众号「**macrozheng**」，回复「**学习路线**」，获取 mall 项目专属学习路线！

加微信群交流，公众号后台回复「**加群**」即可。

![公众号图片](https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/banner/qrcode_for_macrozheng_258.jpg)

## 许可证

[Apache License 2.0](https://github.com/macrozheng/mall-app-web/blob/master/LICENSE)

Copyright (c) 2020-2026 macrozheng
