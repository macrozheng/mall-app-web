<template>
  <view class="content">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <view class="search-input-wrap" @click="handleNavToSearch">
        <text class="yticon icon-sousuo"></text>
        <text class="search-text">{{ currentKeyword || '请输入商品 如：手机' }}</text>
      </view>
      <text class="cate-btn yticon icon-fenlei1" @click="handleToggleCateMask('show')"></text>
    </view>

    <!-- 顶部筛选导航栏 -->
    <view class="navbar">
      <!-- 综合排序 -->
      <view class="nav-item" :class="{ current: filterIndex === 0 }" @click="handleTabClick(0)">
        综合排序
      </view>
      <!-- 销量优先 -->
      <view class="nav-item" :class="{ current: filterIndex === 1 }" @click="handleTabClick(1)">
        销量优先
      </view>
      <!-- 价格排序 -->
      <view class="nav-item" :class="{ current: filterIndex === 2 }" @click="handleTabClick(2)">
        <text>价格</text>
        <view class="p-box">
          <text
            :class="{ active: priceOrder === 1 && filterIndex === 2 }"
            class="yticon icon-shang"
          ></text>
          <text
            :class="{ active: priceOrder === 2 && filterIndex === 2 }"
            class="yticon icon-shang xia"
          ></text>
        </view>
      </view>
    </view>

    <!-- 商品列表 -->
    <view class="goods-list">
      <view
        v-for="(item, index) in productList"
        :key="item.id"
        class="goods-item"
        @click="handleNavToDetail(item)"
      >
        <view class="image-wrapper">
          <image :src="item.pic" mode="aspectFill"></image>
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

    <!-- 分类选择面板 -->
    <view
      class="cate-mask"
      :class="cateMaskState === 0 ? 'none' : cateMaskState === 1 ? 'show' : ''"
      @click="handleToggleCateMask"
    >
      <view
        class="cate-content"
        @click.stop.prevent="stopPrevent"
        @touchmove.stop.prevent="stopPrevent"
      >
        <view class="cate-header">
          <text class="cate-title">分类筛选</text>
          <text v-if="searchParam.productCategoryId" class="cate-clear" @click="handleClearCate">
            清空
          </text>
        </view>
        <scroll-view scroll-y class="cate-list">
          <view v-for="item in cateList" :key="item.id">
            <!-- 一级分类 -->
            <view class="cate-item b-b two">{{ item.name }}</view>
            <!-- 二级分类 -->
            <view
              v-for="tItem in item.children"
              :key="tItem.id"
              class="cate-item b-b"
              :class="{ active: tItem.id === searchParam.productCategoryId }"
              @click="handleCateChange(tItem)"
            >
              {{ tItem.name }}
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad, onPageScroll, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { getCategoryTreeAPI, searchProductListAPI } from '@/apis/product'
import type { CategoryTreeNode, ProductListParam, PmsProduct } from '@/types/product'

// ===== 常量 =====
// 导航栏位置
const headerPosition = ref<'fixed' | 'absolute'>('fixed')
// 导航栏顶部距离
const headerTop = ref('0px')
// 分类面板状态：0-隐藏，1-显示，2-过渡
const cateMaskState = ref(0)
// 筛选索引：0-综合排序，1-销量，2-价格
const filterIndex = ref(0)
// 价格排序：0-无，1-从低到高，2-从高到低
const priceOrder = ref(0)
// 加载状态：more-可加载，loading-加载中，nomore-没有更多
const loadingType = ref<'more' | 'loading' | 'nomore'>('more')

// ===== 页面数据 =====
// 当前搜索关键字
const currentKeyword = ref('')
// 分类树列表
const cateList = ref<CategoryTreeNode[]>([])
// 商品列表
const productList = ref<PmsProduct[]>([])
// 搜索参数
const searchParam = ref<ProductListParam>({
  productCategoryId: undefined,
  pageNum: 1,
  pageSize: 6,
  sort: 0,
})

// ===== loadData =====
// 加载分类树
const loadCateList = async () => {
  try {
    const res = await getCategoryTreeAPI()
    cateList.value = res.data
  } catch (e) {
    console.error('加载分类树失败', e)
  }
}

// 加载商品列表
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

  // 设置排序参数
  if (filterIndex.value === 0) {
    searchParam.value.sort = 0
  } else if (filterIndex.value === 1) {
    searchParam.value.sort = 2
  } else if (filterIndex.value === 2) {
    searchParam.value.sort = priceOrder.value === 1 ? 3 : 4
  }

  try {
    const res = await searchProductListAPI(searchParam.value)
    const list = res.data.list

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
    console.error('加载商品列表失败', e)
    loadingType.value = 'more'
  }
}

// ===== onLoad =====
// 页面加载
onLoad((options) => {
  // #ifdef H5
  const pageHead = document.getElementsByTagName('uni-page-head')[0] as HTMLElement | undefined
  if (pageHead) {
    headerTop.value = pageHead.offsetHeight + 'px'
  }
  // #endif

  // 设置搜索关键字
  if (options?.keyword) {
    currentKeyword.value = decodeURIComponent(options.keyword)
    searchParam.value.keyword = currentKeyword.value
  }

  // 设置分类参数
  if (options?.sid) {
    searchParam.value.productCategoryId = Number(options.sid)
  }

  // 加载分类和商品
  loadCateList()
  loadData()
})

// ===== onPageScroll =====
// 页面滚动
onPageScroll((e) => {
  // 兼容iOS端下拉时顶部漂移
  if (e.scrollTop >= 0) {
    headerPosition.value = 'fixed'
  } else {
    headerPosition.value = 'absolute'
  }
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
// 筛选标签点击
const handleTabClick = (index: number) => {
  if (filterIndex.value === index && index !== 2) {
    return
  }

  filterIndex.value = index

  // 价格排序切换
  if (index === 2) {
    priceOrder.value = priceOrder.value === 1 ? 2 : 1
  } else {
    priceOrder.value = 0
  }

  // 滚动到顶部并刷新
  uni.pageScrollTo({
    duration: 300,
    scrollTop: 0,
  })
  loadData('refresh')
  uni.showLoading({ title: '正在加载' })
}

// 切换分类面板
const handleToggleCateMask = (type?: 'show' | 'hide') => {
  const timer = type === 'show' ? 10 : 300
  const state = type === 'show' ? 1 : 0

  cateMaskState.value = 2
  setTimeout(() => {
    cateMaskState.value = state
  }, timer)
}

// 分类点击
const handleCateChange = (item: CategoryTreeNode) => {
  searchParam.value.productCategoryId = item.id
  handleToggleCateMask()

  uni.pageScrollTo({
    duration: 300,
    scrollTop: 0,
  })
  loadData('refresh')
  uni.showLoading({ title: '正在加载' })
}

// 跳转商品详情
const handleNavToDetail = (item: PmsProduct) => {
  uni.navigateTo({
    url: `/pages/product/product?id=${item.id}`,
  })
}

// 跳转到搜索页
const handleNavToSearch = () => {
  uni.navigateTo({
    url: '/pages/product/search',
  })
}

// 清空分类筛选
const handleClearCate = () => {
  searchParam.value.productCategoryId = undefined
  handleToggleCateMask()
  uni.pageScrollTo({
    duration: 300,
    scrollTop: 0,
  })
  loadData('refresh')
  uni.showLoading({ title: '正在加载' })
}

// 阻止事件冒泡
const stopPrevent = () => {}
</script>

<style lang="scss">
page {
  background: $page-color-base;
}
</style>

<style lang="scss" scoped>
.content {
  background: $page-color-base;
  padding-top: 156rpx;
}

// 搜索栏
.search-bar {
  position: fixed;
  left: 0;
  top: var(--window-top);
  width: 100%;
  height: 80rpx;
  padding: 0 30rpx;
  background: #fff;
  z-index: 10;
  display: flex;
  align-items: center;
}

.search-input-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  height: 64rpx;
  padding: 0 20rpx;
  background: #f5f5f5;
  border-radius: 32rpx;

  .icon-sousuo {
    font-size: 28rpx;
    color: #999;
    margin-right: 10rpx;
  }
}

.search-text {
  font-size: 26rpx;
  color: #999;
}

.cate-btn {
  margin-left: 16rpx;
  font-size: 44rpx;
  color: $font-color-dark;
}

// 顶部导航栏
.navbar {
  position: fixed;
  left: 0;
  top: calc(var(--window-top) + 80rpx); /* 搜索栏高度偏移 */
  display: flex;
  width: 100%;
  height: 80rpx;
  background: #fff;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.06);
  z-index: 10;

  .nav-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 30rpx;
    color: $font-color-dark;
    position: relative;

    &.current {
      color: $base-color;

      &:after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 120rpx;
        height: 0;
        border-bottom: 4rpx solid $base-color;
      }
    }
  }

  .p-box {
    display: flex;
    flex-direction: column;

    .yticon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30rpx;
      height: 14rpx;
      line-height: 1;
      margin-left: 4rpx;
      font-size: 26rpx;
      color: #888;

      &.active {
        color: $base-color;
      }
    }

    .xia {
      transform: scaleY(-1);
    }
  }
}

// 分类面板
.cate-mask {
  position: fixed;
  left: 0;
  top: calc(var(--window-top) + 80rpx);
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 95;
  transition: 0.3s;

  .cate-content {
    width: 630rpx;
    height: 100%;
    background: #fff;
    float: right;
    transform: translateX(100%);
    transition: 0.3s;
    display: flex;
    flex-direction: column;
  }

  &.none {
    display: none;
  }

  &.show {
    background: rgba(0, 0, 0, 0.4);

    .cate-content {
      transform: translateX(0);
    }
  }
}

// 分类面板头部
.cate-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88rpx;
  padding: 0 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.cate-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #303133;
}

.cate-clear {
  font-size: 26rpx;
  color: $base-color;
  padding: 6rpx 20rpx;
  border: 1rpx solid $base-color;
  border-radius: 24rpx;
}

// 分类列表
.cate-list {
  display: flex;
  flex-direction: column;
  height: 100%;

  .cate-item {
    display: flex;
    align-items: center;
    height: 90rpx;
    padding-left: 30rpx;
    font-size: 28rpx;
    color: #555;
    position: relative;
  }

  .two {
    height: 64rpx;
    color: #303133;
    font-size: 30rpx;
    background: #f8f8f8;
  }

  .active {
    color: $base-color;
  }
}

// 商品列表
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

// 加载状态
.loading-more {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30rpx;
  font-size: 28rpx;
  color: #999;
}
</style>
