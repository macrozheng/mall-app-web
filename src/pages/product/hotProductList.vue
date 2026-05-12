<template>
  <view class="content">
    <!-- 顶部 Banner -->
    <image src="/static/hot_product_banner.png" mode="widthFix" class="banner-image"></image>
    <!-- 板块标题 -->
    <view class="section-tit">相关商品</view>
    <!-- 商品列表 -->
    <view class="goods-list">
      <view
        v-for="(item, index) in productList"
        :key="index"
        class="goods-item"
        @click="handleNavToDetail(item)"
      >
        <view class="image-wrapper">
          <image :src="item.pic" mode="aspectFit"></image>
        </view>
        <text class="title clamp">{{ item.name }}</text>
        <text class="title2">{{ item.subTitle }}</text>
        <view class="price-box">
          <text class="price">{{ item.price }}</text>
          <text>已售 {{ item.sale }}</text>
        </view>
      </view>
    </view>
    <!-- 加载状态 -->
    <view class="loading-more">
      <text v-if="loadingType === 'loading'">加载中...</text>
      <text v-else-if="loadingType === 'nomore'">没有更多了</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { getHotProductListAPI } from '@/apis/home'
import type { PageParam } from '@/types/common'
import type { PmsProduct } from '@/types/product'

// ===== 页面数据 =====
// 加载状态：more-可加载，loading-加载中，nomore-没有更多
const loadingType = ref<'more' | 'loading' | 'nomore'>('more')
// 商品列表
const productList = ref<PmsProduct[]>([])
// 搜索参数
const searchParam = ref<PageParam>({
  pageNum: 1,
  pageSize: 6,
})

// ===== loadData =====
// 加载商品列表，支持下拉刷新和上滑加载
const loadData = async (type: 'refresh' | 'add' = 'add') => {
  // 没有更多直接返回
  if (type === 'add' && loadingType.value === 'nomore') {
    return
  }

  if (type === 'add') {
    loadingType.value = 'loading'
  } else {
    loadingType.value = 'more'
  }

  // 刷新时重置页码和列表
  if (type === 'refresh') {
    searchParam.value.pageNum = 1
    productList.value = []
  }

  try {
    const res = await getHotProductListAPI(searchParam.value)
    const list = res.data

    if (list.length === 0) {
      // 没有更多了
      loadingType.value = 'nomore'
      searchParam.value.pageNum--
    } else if (list.length < searchParam.value.pageSize) {
      loadingType.value = 'nomore'
      searchParam.value.pageNum--
    } else {
      loadingType.value = 'more'
    }

    // 追加或替换数据
    productList.value = productList.value.concat(list)

    // 刷新时停止加载动画
    if (type === 'refresh') {
      uni.hideLoading()
      uni.stopPullDownRefresh()
    }
  } catch (e) {
    console.error('加载人气商品失败', e)
    loadingType.value = 'more'
  }
}

// ===== onLoad =====
// 页面加载
onLoad(() => {
  loadData()
})

// ===== onPullDownRefresh =====
// 下拉刷新
onPullDownRefresh(() => {
  loadData('refresh')
})

// ===== onReachBottom =====
// 上拉加载
onReachBottom(() => {
  searchParam.value.pageNum++
  loadData()
})

// ===== 事件处理方法 =====
// 跳转商品详情
const handleNavToDetail = (item: PmsProduct) => {
  uni.navigateTo({
    url: `/pages/product/product?id=${item.id}`,
  })
}
</script>

<style lang="scss" scoped>
page,
.content {
  background: $page-color-base;
}

.banner-image {
  width: 100%;
}

.section-tit {
  font-size: $font-base + 2rpx;
  color: $font-color-dark;
  background: #fff;
  margin-top: 16rpx;
  text-align: center;
  padding-top: 20rpx;
  padding-bottom: 20rpx;
}

/* 商品列表 */
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 30rpx;
  background: #fff;

  .goods-item {
    display: flex;
    flex-direction: column;
    width: 48%;
    padding-bottom: 40rpx;

    &:nth-child(2n + 1) {
      margin-right: 4%;
    }
  }

  .image-wrapper {
    width: 100%;
    height: 330rpx;
    border-radius: 3px;
    overflow: hidden;
    background-color: #fff;

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

  .title2 {
    font-size: $font-sm;
    color: $font-color-light;
    line-height: 40rpx;
    height: 80rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  .price-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 10rpx;
    font-size: 24rpx;
    color: $font-color-light;
  }

  .price {
    font-size: $font-lg;
    color: $uni-color-primary;
    line-height: 1;

    &:before {
      content: '￥';
      font-size: 26rpx;
    }
  }
}

/* 加载状态 */
.loading-more {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30rpx;
  font-size: 28rpx;
  color: #999;
}
</style>
