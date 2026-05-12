<template>
  <view class="content">
    <view class="navbar">
      <view
        v-for="(item, index) in navList"
        :key="index"
        class="nav-item"
        :class="{ current: tabCurrentIndex === index }"
        @click="handleTabClick(index)"
      >
        {{ item.text }}
      </view>
    </view>

    <swiper
      :current="tabCurrentIndex"
      class="swiper-box"
      :duration="300"
      @change="handleSwiperChange"
    >
      <swiper-item v-for="(tabItem, tabIndex) in navList" :key="tabIndex" class="tab-content">
        <scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData('add')">
          <!-- 空白页 -->
          <empty v-if="orderList == null || orderList.length === 0"></empty>

          <!-- 订单列表 -->
          <view v-for="(item, index) in orderList" :key="index" class="order-item">
            <view class="i-top b-b">
              <text class="time">{{ formatDateTime(item.createTime) }}</text>
              <text class="state" :style="{ color: '#fa436a' }">{{
                formatStatus(item.status)
              }}</text>
              <text
                v-if="item.status === 3 || item.status === 4"
                class="del-btn yticon icon-iconfontshanchu1"
                @click="handleDeleteOrder(item.id)"
              ></text>
            </view>
            <view
              v-for="(orderItem, itemIndex) in item.orderItemList"
              :key="itemIndex"
              class="goods-box-single"
              @click="handleShowOrderDetail(item.id)"
            >
              <image class="goods-img" :src="orderItem.productPic" mode="aspectFill"></image>
              <view class="right">
                <text class="title clamp">{{ orderItem.productName }}</text>
                <text class="attr-box"
                  >{{ formatProductAttr(orderItem.productAttr) }} x
                  {{ orderItem.productQuantity }}</text
                >
                <text class="price">{{ orderItem.productPrice }}</text>
              </view>
            </view>

            <view class="price-box">
              共
              <text class="num">{{ calcTotalQuantity(item) }}</text>
              件商品 实付款
              <text class="price">{{ item.payAmount }}</text>
            </view>
            <view v-if="item.status === 0" class="action-box b-t">
              <button class="action-btn" @click="handleCancelOrder(item.id)">取消订单</button>
              <button class="action-btn recom" @click="handlePayOrder(item.id)">立即付款</button>
            </view>
            <view v-if="item.status === 2" class="action-box b-t">
              <button class="action-btn">查看物流</button>
              <button class="action-btn recom" @click="handleReceiveOrder(item.id)">
                确认收货
              </button>
            </view>
            <view v-if="item.status === 3" class="action-box b-t">
              <button class="action-btn recom">评价商品</button>
            </view>
          </view>

          <uni-load-more :status="loadingType"></uni-load-more>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
import { formatDate } from '@/utils/date'
import {
  getOrderListAPI,
  cancelUserOrderAPI,
  confirmReceiveOrderAPI,
  deleteOrderAPI,
} from '@/apis/order'
import type { OmsOrderDetail } from '@/types/order'
import type { PageParam } from '@/types/common'

// ===== 导航数据 =====
// Tab 导航列表
const navList = [
  { state: -1, text: '全部' },
  { state: 0, text: '待付款' },
  { state: 2, text: '待收货' },
  { state: 3, text: '已完成' },
  { state: 4, text: '已取消' },
]

// ===== 页面数据 =====
// 当前选中的Tab索引
const tabCurrentIndex = ref(0)
// 订单列表
const orderList = ref<OmsOrderDetail[]>([])
// 加载状态：more-加载更多 / loading-加载中 / nomore-没有更多
const loadingType = ref<'more' | 'loading' | 'noMore'>('more')
// 分页请求参数
const searchParam = ref<PageParam & { status: number }>({
  status: -1,
  pageNum: 1,
  pageSize: 5,
})

// ===== loadData =====
// 加载订单列表数据
const loadData = async (type: 'refresh' | 'add' = 'refresh') => {
  if (type === 'refresh') {
    searchParam.value.pageNum = 1
  } else {
    searchParam.value.pageNum++
  }

  const index = tabCurrentIndex.value
  const navItem = navList[index]

  if (loadingType.value === 'loading') {
    // 防止重复加载
    return
  }

  searchParam.value.status = navItem.state
  loadingType.value = 'loading'

  try {
    const res = await getOrderListAPI(searchParam.value)
    const list = res.data.list
    if (type === 'refresh') {
      orderList.value = list
      loadingType.value = 'more'
    } else {
      if (list != null && list.length > 0) {
        orderList.value = orderList.value.concat(list)
        loadingType.value = 'more'
      } else {
        searchParam.value.pageNum--
        loadingType.value = 'noMore'
      }
    }
  } catch (e) {
    console.error('加载订单列表失败', e)
    loadingType.value = 'more'
  }

  // 下拉刷新时停止刷新动画
  if (type === 'refresh') {
    uni.stopPullDownRefresh()
  }
}

// ===== onLoad =====
// 页面加载时执行
onLoad((options) => {
  if (options?.state != null) {
    tabCurrentIndex.value = +options.state
  }
  loadData()
})

// ===== onPullDownRefresh =====
// 下拉刷新
onPullDownRefresh(() => {
  loadData('refresh')
})

// ===== 事件处理方法 =====

// Swiper切换
const handleSwiperChange = (e: { detail: { current: number } }) => {
  tabCurrentIndex.value = e.detail.current
  loadData()
}

// 顶部Tab点击
const handleTabClick = (index: number) => {
  tabCurrentIndex.value = index
}

// 删除订单
const handleDeleteOrder = (orderId: number) => {
  uni.showModal({
    title: '提示',
    content: '是否要删除该订单？',
    success: async (res) => {
      if (res.confirm) {
        uni.showLoading({ title: '请稍后' })
        try {
          await deleteOrderAPI(orderId)
          uni.hideLoading()
          loadData()
        } catch (e) {
          uni.hideLoading()
          console.error('删除订单失败', e)
        }
      }
    },
  })
}

// 取消订单
const handleCancelOrder = (orderId: number) => {
  uni.showModal({
    title: '提示',
    content: '是否要取消该订单？',
    success: async (res) => {
      if (res.confirm) {
        uni.showLoading({ title: '请稍后' })
        try {
          await cancelUserOrderAPI(orderId)
          uni.hideLoading()
          loadData()
        } catch (e) {
          uni.hideLoading()
          console.error('取消订单失败', e)
        }
      }
    },
  })
}

// 支付订单
const handlePayOrder = (orderId: number) => {
  uni.redirectTo({
    url: `/pages/money/pay?orderId=${orderId}`,
  })
}

// 确认收货
const handleReceiveOrder = (orderId: number) => {
  uni.showModal({
    title: '提示',
    content: '是否要确认收货？',
    success: async (res) => {
      if (res.confirm) {
        uni.showLoading({ title: '请稍后' })
        try {
          await confirmReceiveOrderAPI(orderId)
          uni.hideLoading()
          loadData()
        } catch (e) {
          uni.hideLoading()
          console.error('确认收货失败', e)
        }
      }
    },
  })
}

// 查看订单详情
const handleShowOrderDetail = (orderId: number) => {
  uni.navigateTo({
    url: `/pages/order/orderDetail?orderId=${orderId}`,
  })
}

// ===== 其他方法 =====

// 格式化订单状态
const formatStatus = (status: number): string => {
  const statusMap: Record<number, string> = {
    0: '等待付款',
    1: '等待发货',
    2: '等待收货',
    3: '交易完成',
    4: '交易关闭',
  }
  return statusMap[status] || ''
}

// 格式化商品属性
const formatProductAttr = (jsonAttr: string): string => {
  try {
    const attrArr = JSON.parse(jsonAttr)
    let attrStr = ''
    for (const attr of attrArr) {
      attrStr += attr.key
      attrStr += ':'
      attrStr += attr.value
      attrStr += ';'
    }
    return attrStr
  } catch {
    return jsonAttr
  }
}

// 格式化日期时间
const formatDateTime = (time: string | null | undefined): string => {
  if (time == null || time === '') {
    return 'N/A'
  }
  const date = new Date(time)
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
}

// 计算商品总数量
const calcTotalQuantity = (order: OmsOrderDetail): number => {
  let totalQuantity = 0
  if (order.orderItemList != null && order.orderItemList.length > 0) {
    for (const item of order.orderItemList) {
      totalQuantity += item.productQuantity
    }
  }
  return totalQuantity
}
</script>

<style lang="scss">
page {
  background: $page-color-base;
  height: 100%;
}
</style>

<style lang="scss" scoped>
.content {
  background: $page-color-base;
  height: 100%;
}

.swiper-box {
  height: calc(100% - 40px);
}

.list-scroll-content {
  height: 100%;
}

.navbar {
  display: flex;
  height: 40px;
  padding: 0 5px;
  background: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 10;

  .nav-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 15px;
    color: $font-color-dark;
    position: relative;

    &.current {
      color: $base-color;

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 44px;
        height: 0;
        border-bottom: 2px solid $base-color;
      }
    }
  }
}

.uni-swiper-item {
  height: auto;
}

.order-item {
  display: flex;
  flex-direction: column;
  padding-left: 30rpx;
  background: #fff;
  margin-top: 16rpx;

  .i-top {
    display: flex;
    align-items: center;
    height: 80rpx;
    padding-right: 30rpx;
    font-size: $font-base;
    color: $font-color-dark;
    position: relative;

    .time {
      flex: 1;
    }

    .state {
      color: $base-color;
    }

    .del-btn {
      padding: 10rpx 0 10rpx 36rpx;
      font-size: $font-lg;
      color: $font-color-light;
      position: relative;

      &::after {
        content: '';
        width: 0;
        height: 30rpx;
        border-left: 1px solid $border-color-dark;
        position: absolute;
        left: 20rpx;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  /* 多条商品 */
  .goods-box {
    height: 160rpx;
    padding: 20rpx 0;
    white-space: nowrap;

    .goods-item {
      width: 120rpx;
      height: 120rpx;
      display: inline-block;
      margin-right: 24rpx;
    }

    .goods-img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  /* 单条商品 */
  .goods-box-single {
    display: flex;
    padding: 20rpx 0;

    .goods-img {
      display: block;
      width: 120rpx;
      height: 120rpx;
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 0 30rpx 0 24rpx;
      overflow: hidden;

      .title {
        font-size: $font-base + 2rpx;
        color: $font-color-dark;
        line-height: 1;
      }

      .attr-box {
        font-size: $font-sm + 2rpx;
        color: $font-color-light;
        padding: 10rpx 12rpx;
      }

      .price {
        font-size: $font-base + 2rpx;
        color: $font-color-dark;

        &::before {
          content: '￥';
          font-size: $font-sm;
          margin: 0 2rpx 0 8rpx;
        }
      }
    }
  }

  .price-box {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    padding: 20rpx 30rpx;
    font-size: $font-sm + 2rpx;
    color: $font-color-light;

    .num {
      margin: 0 8rpx;
      color: $font-color-dark;
    }

    .price {
      font-size: $font-lg;
      color: $font-color-dark;

      &::before {
        content: '￥';
        font-size: $font-sm;
        margin: 0 2rpx 0 8rpx;
      }
    }
  }

  .action-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100rpx;
    position: relative;
    padding-right: 30rpx;
  }

  .action-btn {
    width: 160rpx;
    height: 60rpx;
    margin: 0;
    margin-left: 24rpx;
    padding: 0;
    text-align: center;
    line-height: 60rpx;
    font-size: $font-sm + 2rpx;
    color: $font-color-dark;
    background: #fff;
    border-radius: 100px;

    &::after {
      border-radius: 100px;
    }

    &.recom {
      background: #fff9f9;
      color: $base-color;

      &::after {
        border-color: #f7bcc8;
      }
    }
  }
}

/* load-more */
:deep(.uni-load-more) {
  display: flex;
  flex-direction: row;
  height: 80rpx;
  align-items: center;
  justify-content: center;
}
</style>
