# UmsMemberController - 会员登录注册管理接口文档

> 数据来源：[Swagger UI](https://portal-api.macrozheng.com/swagger-ui/) - UmsMemberController
>
> 通用模型定义见 [api-common-models.md](./api-common-models.md)（CommonResult、CommonPage、PageParam）

---

## 接口列表

| #   | 方法 | 路径                  | 说明         |
| --- | ---- | --------------------- | ------------ |
| 1   | GET  | `/sso/getAuthCode`    | 获取验证码   |
| 2   | GET  | `/sso/info`           | 获取会员信息 |
| 3   | POST | `/sso/login`          | 会员登录     |
| 4   | GET  | `/sso/refreshToken`   | 刷新 token   |
| 5   | POST | `/sso/register`       | 会员注册     |
| 6   | POST | `/sso/updatePassword` | 会员修改密码 |

---

## 1. 获取验证码

**GET** `/sso/getAuthCode`

向指定手机号发送验证码，注册和修改密码时使用。

### 请求参数

Query 参数：

| 参数名    | 类型   | 必填 | 说明   |
| --------- | ------ | ---- | ------ |
| telephone | string | 是   | 手机号 |

### 响应结果

`CommonResult` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 2. 获取会员信息

**GET** `/sso/info`

获取当前登录会员的个人信息，需 Authorization 请求头。

### 请求参数

Query 参数：

| 参数名 | 类型   | 必填 | 说明     |
| ------ | ------ | ---- | -------- |
| name   | string | 否   | 会员名称 |

### 响应结果

`CommonResult` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 3. 会员登录

**POST** `/sso/login`

会员账号密码登录，Content-Type: `application/x-www-form-urlencoded`。

### 请求参数

Query 参数：

| 参数名   | 类型   | 必填 | 说明   |
| -------- | ------ | ---- | ------ |
| username | string | 是   | 用户名 |
| password | string | 是   | 密码   |

### 响应结果

`CommonResult` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 4. 刷新 token

**GET** `/sso/refreshToken`

当 token 即将过期时，使用此接口刷新 token，需 Authorization 请求头。

### 请求参数

无

### 响应结果

`CommonResult` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 5. 会员注册

**POST** `/sso/register`

会员注册新账号。

### 请求参数

Query 参数：

| 参数名    | 类型   | 必填 | 说明   |
| --------- | ------ | ---- | ------ |
| username  | string | 是   | 用户名 |
| password  | string | 是   | 密码   |
| telephone | string | 是   | 手机号 |
| authCode  | string | 是   | 验证码 |

### 响应结果

`CommonResult` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象

---

## 6. 会员修改密码

**POST** `/sso/updatePassword`

修改当前会员的密码。

### 请求参数

Query 参数：

| 参数名    | 类型   | 必填 | 说明   |
| --------- | ------ | ---- | ------ |
| telephone | string | 是   | 手机号 |
| password  | string | 是   | 新密码 |
| authCode  | string | 是   | 验证码 |

### 响应结果

`CommonResult` — 见 [通用模型](./api-common-models.md#commonresultt)，data 为空对象
