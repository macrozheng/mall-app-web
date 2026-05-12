<template>
  <view class="container">
    <view class="user-section">
      <image class="bg" src="/static/user-bg.jpg"></image>
      <!-- #ifdef MP -->
      <view class="mp-nav-btns">
        <text class="yticon icon-shezhi nav-btn" @click="handleNavTo('/pages/set/set')"></text>
        <text class="yticon icon-icon-- nav-btn" @click="handleNavToNotice"></text>
      </view>
      <!-- #endif -->
      <view class="user-info-box">
        <view class="portrait-box">
          <image class="portrait" :src="memberInfo?.icon || '/static/missing-face.png'"></image>
        </view>
        <view class="info-box">
          <text class="username">{{ memberInfo?.nickname || memberInfo?.username || '游客' }}</text>
        </view>
      </view>
      <view class="vip-card-box">
        <image class="card-bg" src="/static/vip-card-bg.png"></image>
        <view class="b-btn">立即开通</view>
        <view class="tit">
          <text class="yticon icon-iLinkapp-"></text>
          黄金会员
        </view>
        <text class="e-m">mall移动端商城</text>
        <text class="e-b">黄金及以上会员可享有会员价优惠商品。</text>
      </view>
    </view>

    <view
      class="cover-container"
      :style="[{ transform: coverTransform, transition: coverTransition }]"
      @touchstart="handleCoverTouchstart"
      @touchmove="handleCoverTouchmove"
      @touchend="handleCoverTouchend"
    >
      <image class="arc" src="/static/arc.png"></image>

      <view class="tj-sction">
        <view class="tj-item">
          <text class="num">{{ memberInfo?.integration || '暂无' }}</text>
          <text>积分</text>
        </view>
        <view class="tj-item">
          <text class="num">{{ memberInfo?.growth || '暂无' }}</text>
          <text>成长值</text>
        </view>
        <view class="tj-item" @click="handleNavTo('/pages/coupon/couponList')">
          <text class="num">{{ couponCount || '暂无' }}</text>
          <text>优惠券</text>
        </view>
      </view>
      <!-- 订单 -->
      <view class="order-section">
        <view
          class="order-item"
          @click="handleNavTo('/pages/order/order?state=0')"
          hover-class="common-hover"
          :hover-stay-time="50"
        >
          <text class="yticon icon-shouye"></text>
          <text>全部订单</text>
        </view>
        <view
          class="order-item"
          @click="handleNavTo('/pages/order/order?state=1')"
          hover-class="common-hover"
          :hover-stay-time="50"
        >
          <text class="yticon icon-daifukuan"></text>
          <text>待付款</text>
        </view>
        <view
          class="order-item"
          @click="handleNavTo('/pages/order/order?state=2')"
          hover-class="common-hover"
          :hover-stay-time="50"
        >
          <text class="yticon icon-yishouhuo"></text>
          <text>待收货</text>
        </view>
        <view class="order-item" hover-class="common-hover" :hover-stay-time="50">
          <text class="yticon icon-shouhoutuikuan"></text>
          <text>退款/售后</text>
        </view>
      </view>
      <!-- 浏览历史 -->
      <view class="history-section icon">
        <mix-list-cell
          icon="icon-dizhi"
          iconColor="#5fcda2"
          title="地址管理"
          @eventClick="handleNavTo('/pages/address/address')"
        ></mix-list-cell>
        <mix-list-cell
          icon="icon-lishijilu"
          iconColor="#e07472"
          title="我的足迹"
          @eventClick="handleNavTo('/pages/user/readHistory')"
        ></mix-list-cell>
        <mix-list-cell
          icon="icon-shoucang"
          iconColor="#5fcda2"
          title="我的关注"
          @eventClick="handleNavTo('/pages/user/brandAttention')"
        ></mix-list-cell>
        <mix-list-cell
          icon="icon-shoucang_xuanzhongzhuangtai"
          iconColor="#54b4ef"
          title="我的收藏"
          @eventClick="handleNavTo('/pages/user/productCollection')"
        ></mix-list-cell>
        <mix-list-cell icon="icon-pingjia" iconColor="#ee883b" title="我的评价"></mix-list-cell>
        <mix-list-cell
          icon="icon-shezhi1"
          iconColor="#e07472"
          title="设置"
          border=""
          @eventClick="handleNavTo('/pages/set/set')"
        ></mix-list-cell>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onShow, onNavigationBarButtonTap } from '@dcloudio/uni-app'
import { useMemberStore } from '@/stores/member'
import { getMemberCouponListAPI } from '@/apis/coupon'
import mixListCell from '@/components/mix-list-cell.vue'

// ===== Store 相关 =====
// 获取会员store
const memberStore = useMemberStore()
// 是否登录
const hasLogin = computed(() => !!memberStore.memberInfo)
// 会员信息
const memberInfo = computed(() => memberStore.memberInfo)

// ===== 页面数据 =====
// 优惠券数量
const couponCount = ref<number | null>(null)
// 遮罩层变换样式
const coverTransform = ref('translateY(0px)')
// 遮罩层过渡动画
const coverTransition = ref('0s')
// 是否正在拖动
const moving = ref(false)
// 触摸起始Y坐标
let startY = 0
// 触摸移动Y坐标
let moveY = 0
// 页面是否在顶部
let pageAtTop = true

// ===== 数据加载 =====
// 加载优惠券数据
const loadData = async () => {
  if (hasLogin.value) {
    try {
      const res = await getMemberCouponListAPI(0)
      const list = res.data
      if (list && list.length > 0) {
        couponCount.value = list.length
      }
    } catch {
      couponCount.value = null
    }
  } else {
    couponCount.value = null
  }
}

// ===== 生命周期 =====
// 页面显示时加载数据
onShow(() => {
  loadData()
})

// 导航栏按钮点击事件
onNavigationBarButtonTap((e: { index: number }) => {
  const index = e.index
  if (index === 0) {
    handleNavTo('/pages/set/set')
  } else if (index === 1) {
    // #ifdef APP-PLUS
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    // @ts-ignore
    const currentWebview = page.$getAppWebview()
    currentWebview.hideTitleNViewButtonRedDot({
      index,
    })
    // #endif
    uni.navigateTo({
      url: '/pages/notice/notice',
    })
  }
})

// ===== 事件处理方法 =====
// 页面导航（未登录时跳转登录页）
const handleNavTo = (url: string) => {
  if (!hasLogin.value) {
    url = '/pages/public/login'
  }
  uni.navigateTo({
    url,
  })
}

// 跳转到通知页（小程序端导航栏右侧按钮）
const handleNavToNotice = () => {
  uni.navigateTo({
    url: '/pages/notice/notice',
  })
}

// 遮罩层触摸开始
const handleCoverTouchstart = (e: TouchEvent) => {
  if (!pageAtTop) {
    return
  }
  coverTransition.value = 'transform .1s linear'
  startY = e.touches[0].clientY
}

// 遮罩层触摸移动
const handleCoverTouchmove = (e: TouchEvent) => {
  moveY = e.touches[0].clientY
  let moveDistance = moveY - startY
  if (moveDistance < 0) {
    moving.value = false
    return
  }
  moving.value = true
  if (moveDistance >= 80 && moveDistance < 100) {
    moveDistance = 80
  }

  if (moveDistance > 0 && moveDistance <= 80) {
    coverTransform.value = `translateY(${moveDistance}px)`
  }
}

// 遮罩层触摸结束
const handleCoverTouchend = () => {
  if (moving.value === false) {
    return
  }
  moving.value = false
  coverTransition.value = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)'
  coverTransform.value = 'translateY(0px)'
}
</script>

<style lang="scss" scoped>
%flex-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

%section {
  display: flex;
  justify-content: space-around;
  align-content: center;
  background: #fff;
  border-radius: 10rpx;
}

.user-section {
  height: 520rpx;
  padding: 100rpx 30rpx 0;
  position: relative;

  .mp-nav-btns {
    position: absolute;
    top: 60rpx;
    right: 30rpx;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 30rpx;

    .nav-btn {
      font-size: 48rpx;
      color: #fff;
    }
  }

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(1px);
    opacity: 0.7;
  }
}

.user-info-box {
  height: 180rpx;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;

  .portrait {
    width: 130rpx;
    height: 130rpx;
    border: 5rpx solid #fff;
    border-radius: 50%;
  }

  .username {
    font-size: 38rpx;
    color: #303133;
    margin-left: 20rpx;
  }
}

.vip-card-box {
  display: flex;
  flex-direction: column;
  color: #f7d680;
  height: 240rpx;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
  border-radius: 16rpx 16rpx 0 0;
  overflow: hidden;
  position: relative;
  padding: 20rpx 24rpx;

  .card-bg {
    position: absolute;
    top: 20rpx;
    right: 0;
    width: 380rpx;
    height: 260rpx;
  }

  .b-btn {
    position: absolute;
    right: 20rpx;
    top: 16rpx;
    width: 132rpx;
    height: 40rpx;
    text-align: center;
    line-height: 40rpx;
    font-size: 22rpx;
    color: #36343c;
    border-radius: 20px;
    background: linear-gradient(to right, #f9e6af, #ffd465);
    z-index: 1;
  }

  .tit {
    font-size: 30rpx;
    color: #f7d680;
    margin-bottom: 28rpx;

    .yticon {
      color: #f6e5a3;
      margin-right: 16rpx;
    }
  }

  .e-b {
    font-size: 24rpx;
    color: #d8cba9;
    margin-top: 10rpx;
  }
}

.cover-container {
  background: #f8f8f8;
  margin-top: -150rpx;
  padding: 0 30rpx;
  position: relative;
  background: #f5f5f5;
  padding-bottom: 20rpx;

  .arc {
    position: absolute;
    left: 0;
    top: -34rpx;
    width: 100%;
    height: 36rpx;
  }
}

.tj-sction {
  @extend %section;

  .tj-item {
    @extend %flex-center;
    flex-direction: column;
    height: 140rpx;
    font-size: 24rpx;
    color: #75787d;
  }

  .num {
    font-size: 32rpx;
    color: #303133;
    margin-bottom: 8rpx;
  }
}

.order-section {
  @extend %section;
  padding: 28rpx 0;
  margin-top: 20rpx;

  .order-item {
    @extend %flex-center;
    width: 120rpx;
    height: 120rpx;
    border-radius: 10rpx;
    font-size: 24rpx;
    color: #303133;
  }

  .yticon {
    font-size: 48rpx;
    margin-bottom: 18rpx;
    color: #fa436a;
  }

  .icon-shouhoutuikuan {
    font-size: 44rpx;
  }
}

.history-section {
  padding: 30rpx 0 0;
  margin-top: 20rpx;
  background: #fff;
  border-radius: 10rpx;
}
</style>
