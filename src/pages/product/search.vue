<template>
  <view class="container">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <view class="search-input-wrap">
        <text class="yticon icon-sousuo"></text>
        <input
          class="search-input"
          type="text"
          v-model="keyword"
          placeholder="请输入商品 如：手机"
          placeholder-class="placeholder"
          confirm-type="search"
          :focus="true"
          @confirm="handleSearch"
        />
        <text
          v-if="keyword"
          class="yticon icon-shanchu4 clear-btn"
          @click="handleClearInput"
        ></text>
      </view>
      <text class="search-action-btn" @click="handleSearch">搜索</text>
    </view>

    <!-- 搜索历史 -->
    <view class="history-section" v-if="searchStore.historyList.length > 0">
      <view class="section-header">
        <text class="section-title">搜索历史</text>
        <text class="yticon icon-lajitong clear-icon" @click="handleClearHistory"></text>
      </view>
      <view class="history-list">
        <view
          class="history-item"
          v-for="(item, index) in searchStore.historyList"
          :key="index"
          @click="handleHistoryClick(item)"
        >
          <text class="history-text">{{ item }}</text>
          <text
            class="yticon icon-shanchu4 delete-icon"
            @click.stop="handleDeleteHistory(item)"
          ></text>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-section" v-else>
      <text class="empty-text">暂无搜索记录</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSearchStore } from '@/stores/search'

// ===== Store 相关 =====
// 获取搜索store
const searchStore = useSearchStore()

// ===== 页面数据 =====
// 搜索关键字
const keyword = ref('')

// ===== 事件处理方法 =====
// 执行搜索
const handleSearch = () => {
  const trimmed = keyword.value.trim()
  // 保存到搜索历史（仅有关键字时保存）
  if (trimmed) {
    searchStore.addKeyword(trimmed)
  }
  // 跳转到商品列表页（空关键字搜索所有商品）
  uni.navigateTo({
    url: trimmed
      ? `/pages/product/list?keyword=${encodeURIComponent(trimmed)}`
      : '/pages/product/list',
  })
}

// 点击搜索历史
const handleHistoryClick = (item: string) => {
  keyword.value = item
  searchStore.addKeyword(item)
  uni.navigateTo({
    url: `/pages/product/list?keyword=${encodeURIComponent(item)}`,
  })
}

// 清空输入框
const handleClearInput = () => {
  keyword.value = ''
}

// 取消搜索
const handleCancel = () => {
  uni.navigateBack()
}

// 清空搜索历史
const handleClearHistory = () => {
  uni.showModal({
    content: '确定清空搜索历史？',
    success: (e) => {
      if (e.confirm) {
        searchStore.clearHistory()
      }
    },
  })
}

// 删除单条搜索历史
const handleDeleteHistory = (item: string) => {
  searchStore.removeKeyword(item)
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #fff;
}

// 搜索栏
.search-bar {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  background: #fff;
}

.search-input-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  height: 70rpx;
  padding: 0 20rpx;
  background: #f5f5f5;
  border-radius: 35rpx;

  .icon-sousuo {
    font-size: 32rpx;
    color: #999;
    margin-right: 10rpx;
  }
}

.search-input {
  flex: 1;
  height: 70rpx;
  font-size: 28rpx;
  color: $font-color-dark;
}

.placeholder {
  color: #999;
  font-size: 28rpx;
}

.clear-btn {
  font-size: 32rpx;
  color: #ccc;
  padding: 0 10rpx;
}

.search-action-btn {
  margin-left: 20rpx;
  font-size: 28rpx;
  color: $base-color;
  white-space: nowrap;
}

// 搜索历史
.history-section {
  padding: 30rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: $font-color-dark;
}

.clear-icon {
  font-size: 34rpx;
  color: #ccc;
}

.history-list {
  display: flex;
  flex-wrap: wrap;
}

.history-item {
  display: flex;
  align-items: center;
  max-width: 100%;
  padding: 12rpx 24rpx;
  margin: 0 20rpx 20rpx 0;
  background: #f5f5f5;
  border-radius: 30rpx;
  font-size: 26rpx;
  color: $font-color-base;
}

.history-text {
  max-width: 300rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.delete-icon {
  font-size: 24rpx;
  color: #ccc;
  margin-left: 10rpx;
}

// 空状态
.empty-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 200rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #ccc;
}
</style>
