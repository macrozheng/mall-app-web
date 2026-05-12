<template>
  <view class="content">
    <!-- 空白页 -->
    <empty v-if="brandList.length === 0"></empty>
    <view class="hot-section">
      <view
        v-for="(item, index) in brandList"
        :key="index"
        class="guess-item"
        @click="handleNavToDetail(item)"
      >
        <view class="image-wrapper">
          <image :src="item.brandLogo" mode="aspectFit"></image>
        </view>
        <view class="txt">
          <text class="title clamp">{{ item.brandName }}</text>
        </view>
      </view>
    </view>
    <!-- 加载状态 -->
    <view v-if="loadingType === 'more'" class="load-more">上拉加载更多</view>
    <view v-else-if="loadingType === 'loading'" class="load-more">加载中...</view>
    <view v-else class="load-more">没有更多了</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  onLoad,
  onPullDownRefresh,
  onReachBottom,
  onNavigationBarButtonTap,
} from '@dcloudio/uni-app'
import { fetchBrandAttentionListAPI, clearBrandAttentionAPI } from '@/apis/memberBrandAttention'
import type { MemberBrandAttention } from '@/types/memberBrandAttention'
import type { PageParam } from '@/types/common'
import empty from '@/components/empty.vue'

// ===== 页面数据 =====
// 加载更多状态
const loadingType = ref<'more' | 'loading' | 'nomore'>('more')
// 品牌关注列表
const brandList = ref<MemberBrandAttention[]>([])
// 分页请求参数
const searchParam = ref<PageParam>({
  pageNum: 1,
  pageSize: 6,
})

// ===== loadData =====
// 加载品牌关注列表，带下拉刷新和上滑加载
const loadData = async (type: 'refresh' | 'add' = 'add') => {
  // 没有更多直接返回
  if (type === 'add') {
    if (loadingType.value === 'nomore') {
      return
    }
    loadingType.value = 'loading'
  } else {
    loadingType.value = 'more'
  }

  // 下拉刷新时重置
  if (type === 'refresh') {
    searchParam.value.pageNum = 1
    brandList.value = []
  }

  try {
    const res = await fetchBrandAttentionListAPI(searchParam.value)
    const dataList = res.data.list

    if (dataList.length === 0) {
      // 没有更多了
      loadingType.value = 'nomore'
      searchParam.value.pageNum = Math.max(1, searchParam.value.pageNum - 1)
    } else {
      if (dataList.length < searchParam.value.pageSize) {
        loadingType.value = 'nomore'
        searchParam.value.pageNum = Math.max(1, searchParam.value.pageNum - 1)
      } else {
        loadingType.value = 'more'
      }
      brandList.value = brandList.value.concat(dataList)
    }

    // 下拉刷新完成后停止
    if (type === 'refresh') {
      uni.stopPullDownRefresh()
    }
  } catch (e) {
    console.error('加载品牌关注失败', e)
    if (type === 'refresh') {
      uni.stopPullDownRefresh()
    }
  }
}

// ===== onLoad =====
// 页面加载时执行
onLoad(() => {
  loadData()
})

// ===== onPullDownRefresh =====
// 下拉刷新
onPullDownRefresh(() => {
  loadData('refresh')
})

// ===== onReachBottom =====
// 上拉加载更多
onReachBottom(() => {
  searchParam.value.pageNum++
  loadData()
})

// ===== onNavigationBarButtonTap =====
// 导航栏按钮点击事件（非小程序端）
// #ifndef MP
onNavigationBarButtonTap(() => {
  uni.showModal({
    title: '提示',
    content: '是否要清空所有关注？',
    success: function (res) {
      if (res.confirm) {
        clearBrandAttentionAPI().then(() => {
          loadData('refresh')
        })
      }
    },
  })
})
// #endif

// ===== 事件处理方法 =====
// 跳转品牌详情页
const handleNavToDetail = (item: MemberBrandAttention) => {
  const id = item.brandId
  uni.navigateTo({
    url: `/pages/brand/brandDetail?id=${id}`,
  })
}
</script>

<style lang="scss" scoped>
page,
.content {
  background: $page-color-base;
}

.hot-section {
  display: flex;
  flex-wrap: wrap;
  margin-top: 16rpx;

  .guess-item {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0 30rpx;
    margin-bottom: 16rpx;
    background-color: #fff;
    align-items: center;
  }

  .image-wrapper {
    width: 30%;
    height: 170rpx;
    border-radius: 3px;
    overflow: hidden;
    background: #fff;

    image {
      width: 100%;
      height: 100%;
      opacity: 1;
    }
  }

  .title {
    font-size: $font-lg;
    color: $font-color-dark;
    line-height: 80rpx;
  }

  .txt {
    width: 70%;
    display: flex;
    flex-direction: row;
    padding-left: 40rpx;
    align-items: center;
  }
}

.load-more {
  text-align: center;
  padding: 20rpx;
  font-size: 28rpx;
  color: $font-color-light;
}
</style>
