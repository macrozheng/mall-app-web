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
    <!-- 优惠券页面，仿mt -->
    <view v-for="(item, index) in couponList" :key="index" class="coupon-item">
      <view class="con">
        <view class="left">
          <text class="title">{{ item.name }}</text>
          <text class="time">有效期至{{ formatDateTime(item.endTime) }}</text>
        </view>
        <view class="right">
          <text class="price">{{ item.amount }}</text>
          <text>满{{ item.minPoint }}可用</text>
        </view>

        <view class="circle l"></view>
        <view class="circle r"></view>
      </view>
      <text class="tips">{{ formatCouponUseType(item.useType) }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getMemberCouponListAPI } from '@/apis/coupon'
import type { SmsCoupon } from '@/types/coupon'
import { formatDate } from '@/utils/date'

// ===== 导航数据 =====
// Tab 导航列表
const navList = [
  { useStatus: 0, text: '未使用' },
  { useStatus: 1, text: '已使用' },
  { useStatus: 2, text: '已过期' },
]

// ===== 页面数据 =====
// 当前选中 Tab 索引
const tabCurrentIndex = ref(0)
// 优惠券使用状态
const useStatus = ref(0)
// 优惠券列表
const couponList = ref<SmsCoupon[]>([])

// ===== loadData =====
// 加载优惠券列表
const loadData = async () => {
  try {
    const res = await getMemberCouponListAPI(useStatus.value)
    couponList.value = res.data
  } catch (e) {
    console.error('加载优惠券失败', e)
  }
}

// ===== onLoad =====
// 页面加载
onLoad(() => {
  loadData()
})

// ===== 事件处理方法 =====
// 切换 Tab
const handleTabClick = (index: number) => {
  tabCurrentIndex.value = index
  useStatus.value = navList[index].useStatus
  loadData()
}

// ===== 其他方法 =====
// 格式化日期时间
const formatDateTime = (time: string | null) => {
  if (time == null || time === '') {
    return 'N/A'
  }
  const date = new Date(time)
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
}

// 格式化优惠券使用类型
const formatCouponUseType = (useType: number) => {
  if (useType === 0) {
    return '全场通用'
  } else if (useType === 1) {
    return '指定分类商品可用'
  } else if (useType === 2) {
    return '指定商品可用'
  }
  return null
}
</script>

<style lang="scss">
page {
  background: $page-color-base;
  padding-bottom: 100rpx;
}
</style>

<style lang="scss" scoped>
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

      &:after {
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

/* 优惠券列表 */
.coupon-item {
  display: flex;
  flex-direction: column;
  margin: 20rpx 24rpx;
  background: #fff;

  .con {
    display: flex;
    align-items: center;
    position: relative;
    height: 120rpx;
    padding: 0 30rpx;

    &:after {
      position: absolute;
      left: 0;
      bottom: 0;
      content: '';
      width: 100%;
      height: 0;
      border-bottom: 1px dashed #f3f3f3;
      transform: scaleY(50%);
    }
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    overflow: hidden;
    height: 100rpx;
  }

  .title {
    font-size: 32rpx;
    color: $font-color-dark;
    margin-bottom: 10rpx;
  }

  .time {
    font-size: 24rpx;
    color: $font-color-light;
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 26rpx;
    color: $font-color-base;
    height: 100rpx;
  }

  .price {
    font-size: 44rpx;
    color: $base-color;

    &:before {
      content: '￥';
      font-size: 34rpx;
    }
  }

  .tips {
    font-size: 24rpx;
    color: $font-color-light;
    line-height: 60rpx;
    padding-left: 30rpx;
  }

  .circle {
    position: absolute;
    left: -6rpx;
    bottom: -10rpx;
    z-index: 10;
    width: 20rpx;
    height: 20rpx;
    background: #f3f3f3;
    border-radius: 100px;

    &.r {
      left: auto;
      right: -6rpx;
    }
  }
}
</style>
