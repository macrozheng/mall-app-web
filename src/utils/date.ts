/**
 * 格式化日期
 * @param date 日期对象
 * @param fmt 格式模板，如 'yyyy-MM-dd hh:mm:ss'
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: Date, fmt: string): string => {
  let result = fmt

  // 处理年份
  result = result.replace(/(y+)/, (_, yearPattern) => {
    return (date.getFullYear() + '').slice(4 - yearPattern.length)
  })

  const o: Record<string, number> = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }

  for (const [key, value] of Object.entries(o)) {
    const regex = new RegExp(`(${key})`)
    result = result.replace(regex, (_, pattern) => {
      const str = value + ''
      return pattern.length === 1 ? str : padLeftZero(str)
    })
  }

  return result
}

const padLeftZero = (str: string): string => {
  return ('00' + str).slice(str.length)
}
