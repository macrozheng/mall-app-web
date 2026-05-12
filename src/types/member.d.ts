/**
 * 用户基本信息
 */
export type MemberInfo = {
  /** 用户ID */
  id: number
  /** 用户名 */
  username: string
  /** 昵称 */
  nickname?: string
  /** 头像 */
  icon?: string
  /** 积分 */
  integration?: number
  /** 成长值 */
  growth?: number
}

/** 登录接口返回结果 */
export type LoginResult = {
  /** Token 前缀（如 "Bearer "） */
  tokenHead: string
  /** 登录凭证 */
  token: string
}

/** 登录请求参数 */
export type LoginParam = {
  /** 账户名 */
  username: string
  /** 密码 */
  password: string
}

/** 注册请求参数 */
export type RegisterParam = {
  /** 账户名 */
  username: string
  /** 密码 */
  password: string
  /** 手机号 */
  telephone: string
  /** 验证码 */
  authCode: string
}
