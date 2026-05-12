<template>
  <view class="content">
    <!-- 顶部 Banner -->
    <image src="/static/new_product_banner.png" mode="widthFix" class="banner-image"></image>
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
    <view v-if="loadingType === 'more'" class="load-more">上拉加载更多</view>
    <view v-else-if="loadingType === 'loading'" class="load-more">加载中...</view>
    <view v-else class="load-more">没有更多了</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { getNewProductListAPI } from '@/apis/home'
import type { PmsProduct } from '@/types/product'
import type { PageParam } from '@/types/common'

// ===== 页面数据 =====
// 加载更多状态
const loadingType = ref<'more' | 'loading' | 'nomore'>('more')
// 新鲜商品列表
const productList = ref<PmsProduct[]>([])
// 分页请求参数
const searchParam = ref<PageParam>({
  pageNum: 1,
  pageSize: 6,
})

// ===== loadData =====
// 加载商品列表，带下拉刷新和上滑加载
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
    productList.value = []
  }

  try {
    const res = await getNewProductListAPI(searchParam.value)
    const productListData = res.data

    if (productListData.length === 0) {
      // 没有更多了
      loadingType.value = 'nomore'
      searchParam.value.pageNum = Math.max(1, searchParam.value.pageNum - 1)
    } else {
      if (productListData.length < searchParam.value.pageSize) {
        loadingType.value = 'nomore'
        searchParam.value.pageNum = Math.max(1, searchParam.value.pageNum - 1)
      } else {
        loadingType.value = 'more'
      }
      productList.value = productList.value.concat(productListData)
    }

    // 下拉刷新完成后停止
    if (type === 'refresh') {
      uni.stopPullDownRefresh()
    }
  } catch (e) {
    console.error('加载新鲜商品失败', e)
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

// ===== 事件处理方法 =====
// 跳转商品详情页
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

.load-more {
  text-align: center;
  padding: 20rpx;
  font-size: 28rpx;
  color: $font-color-light;
}
</style>
