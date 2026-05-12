# 通用数据模型定义

> 所有接口文档共用的通用类型定义，各 Controller 文档通过引用方式使用，避免重复定义。

---

## CommonResult\<T\>

通用返回结果封装类，所有接口的响应均包装在此结构中。

| 字段名  | 类型           | 说明     |
| ------- | -------------- | -------- |
| code    | number (int64) | 状态码   |
| message | string         | 提示信息 |
| data    | T              | 封装数据 |

### 常见泛型实例

| 泛型声明                             | 说明                           | data 字段类型          |
| ------------------------------------ | ------------------------------ | ---------------------- |
| `CommonResult`                       | 无数据返回（添加、删除等操作） | object（空对象）       |
| `CommonResult<XxxModel>`             | 返回单个对象                   | XxxModel               |
| `CommonResult<List<XxxModel>>`       | 返回对象列表                   | XxxModel[]             |
| `CommonResult<CommonPage<XxxModel>>` | 返回分页数据                   | CommonPage\<XxxModel\> |
| `CommonResult<string>`               | 返回字符串                     | string                 |

---

## CommonPage\<T\>

通用分页结果封装类。

| 字段名    | 类型   | 说明         |
| --------- | ------ | ------------ |
| pageNum   | number | 当前页码     |
| pageSize  | number | 每页数量     |
| totalPage | number | 总页数       |
| total     | number | 总条数       |
| list      | T[]    | 分页数据列表 |

---

## PageParam

通用分页请求参数。

| 字段名   | 类型   | 必填 | 说明                |
| -------- | ------ | ---- | ------------------- |
| pageNum  | number | 是   | 当前页码，从 1 开始 |
| pageSize | number | 是   | 每页数量，默认 10   |
| keyword  | string | 否   | 查询关键字          |
