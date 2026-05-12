import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义搜索Store
export const useSearchStore = defineStore(
  'search',
  () => {
    // 搜索历史记录（最多10条）
    const historyList = ref<string[]>([])

    // 添加搜索关键词
    const addKeyword = (keyword: string) => {
      const trimmed = keyword.trim()
      if (!trimmed) return
      // 去重：先移除已存在的相同关键词
      historyList.value = historyList.value.filter((item) => item !== trimmed)
      // 插入到最前面
      historyList.value.unshift(trimmed)
      // 最多保留10条
      if (historyList.value.length > 10) {
        historyList.value = historyList.value.slice(0, 10)
      }
    }

    // 删除单条搜索记录
    const removeKeyword = (keyword: string) => {
      historyList.value = historyList.value.filter((item) => item !== keyword)
    }

    // 清空搜索历史
    const clearHistory = () => {
      historyList.value = []
    }

    return {
      historyList,
      addKeyword,
      removeKeyword,
      clearHistory,
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
