/**
 * Prettier 代码格式化配置
 *
 * @see https://prettier.io/docs/en/configuration.html
 */
module.exports = {
  // 使用单引号而非双引号
  singleQuote: true,

  // 不使用分号
  semi: false,

  // 每行最大字符数为 100
  printWidth: 100,

  // 对象和数组末尾都添加逗号
  trailingComma: 'all',

  // 自动识别换行符（Windows: CRLF, Mac/Linux: LF）
  endOfLine: 'auto',

  // 使用 2 个空格缩进
  tabWidth: 2,

  // 不使用 Tab 缩进
  useTabs: false,

  // 箭头函数参数始终加括号：(x) => x
  arrowParens: 'always',

  // JSX 中使用双引号
  jsxSingleQuote: false,

  // HTML 空格敏感度：严格
  htmlWhitespaceSensitivity: 'strict',

  // Vue 文件中 <script> 和 <style> 标签内的代码不额外缩进
  vueIndentScriptAndStyle: false,

  // 对象字面量的空格：{ foo: bar }
  bracketSpacing: true,

  // 多行 HTML 标签的闭合标签不单独一行
  bracketSameLine: false,
}
