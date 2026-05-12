/**
 * 1.拼接基础地址
 * 2.设置超时时间
 * 3.添加请求头标识
 * 4.添加 token
 */
import { useMemberStore } from '@/stores/member'
import type { CommonResult } from '@/types/common'

// 请求基地址（从环境变量读取）
const baseURL = import.meta.env.VITE_API_BASE_URL

const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    // 1.拼接基础地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2.设置超时时间
    options.timeout = 10 * 1000
    // 3.添加请求头标识
    options.header = {
      'source-client': 'miniapp',
      ...options.header,
    }
    // 4.添加 token（从 storage 获取）
    const token = uni.getStorageSync('token')
    if (token) {
      options.header.Authorization = token
    }
  },
}

// 拦截 request 请求
uni.addInterceptor('request', httpInterceptor)
// 拦截 uploadFile 文件上传
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 将对象转换为查询字符串
 * @param params 参数对象
 * @returns 查询字符串，?key1=value1&key2=value2
 */
const buildQueryString = (params: Record<string, any>): string => {
  if (!params || Object.keys(params).length === 0) {
    return ''
  }

  const queryParts = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(value)
      return `${encodedKey}=${encodedValue}`
    })

  return queryParts.length > 0 ? '?' + queryParts.join('&') : ''
}

/**
 * 扩展的请求选项类型
 */
export interface HttpRequestOptions extends UniApp.RequestOptions {
  /** 查询参数（会自动拼接到 URL 后面） */
  params?: Record<string, any>
}

/**
 * 请求函数
 * @param  HttpRequestOptions
 * @returns Promise
 *  1. 返回 Promise 对象,用于处理返回值类型
 *  2. 获取数据成功
 *    2.1 提取核心数?res.data
 *    2.2 添加类型,支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息,跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */
export const http = <T>(options: HttpRequestOptions): Promise<CommonResult<T>> => {
  // 处理 params 参数，拼接到 URL?
  if (options.params) {
    const queryString = buildQueryString(options.params)
    // 检查 URL 是否已经包含查询参数
    const separator = options.url.includes('?') ? '&' : ''
    options.url = options.url + separator + queryString
    // 删除 params 属性，避免传递给 uni.request
    delete options.params
  }

  return new Promise<CommonResult<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 响应成功
      success(res) {
        // 状态码 2xx，参考 axios 的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data
          const data = res.data as CommonResult<T>
          if (data.code === 200) {
            resolve(data)
          } else if (data.code === 401) {
            // 401错误  -> 清理用户信息，跳转到登录页
            const memberStore = useMemberStore()
            memberStore.memberLogout()
            uni.navigateTo({ url: '/pages/public/login' })
            reject(res)
          } else {
            // 其他错误 -> 根据后端错误信息轻提示
            uni.showToast({
              icon: 'none',
              title: data.message || '请求错误',
            })
            reject(res)
          }
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as CommonResult<T>).message || '请求错误',
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}
