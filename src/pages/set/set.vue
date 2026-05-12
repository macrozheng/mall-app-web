<template>
  <view class="container">
    <view
      class="list-cell b-b m-t"
      @click="navTo('个人资料')"
      hover-class="cell-hover"
      :hover-stay-time="50"
    >
      <text class="cell-tit">个人资料</text>
      <text class="cell-more yticon icon-you"></text>
    </view>
    <view
      class="list-cell b-b"
      @click="navTo('/pages/address/address')"
      hover-class="cell-hover"
      :hover-stay-time="50"
    >
      <text class="cell-tit">收货地址</text>
      <text class="cell-more yticon icon-you"></text>
    </view>
    <view
      class="list-cell"
      @click="navTo('实名认证')"
      hover-class="cell-hover"
      :hover-stay-time="50"
    >
      <text class="cell-tit">实名认证</text>
      <text class="cell-more yticon icon-you"></text>
    </view>

    <view class="list-cell m-t">
      <text class="cell-tit">消息推送</text>
      <switch checked color="#fa436a" @change="switchChange" />
    </view>
    <view
      class="list-cell m-t b-b"
      @click="navTo('清除缓存')"
      hover-class="cell-hover"
      :hover-stay-time="50"
    >
      <text class="cell-tit">清除缓存</text>
      <text class="cell-more yticon icon-you"></text>
    </view>
    <view
      class="list-cell b-b"
      @click="navToOuter('https://github.com/macrozheng/mall')"
      hover-class="cell-hover"
      :hover-stay-time="50"
    >
      <text class="cell-tit">关于 mall-app-web</text>
      <text class="cell-more yticon icon-you"></text>
    </view>
    <view class="list-cell">
      <text class="cell-tit">检查更新</text>
      <text class="cell-tip">当前版本 1.0.0</text>
      <text class="cell-more yticon icon-you"></text>
    </view>
    <view class="list-cell log-out-btn" @click="toLogout">
      <text class="cell-tit">退出登录</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useMemberStore } from '@/stores/member'
// 获取会员store
const memberStore = useMemberStore()

// 退出登录
const toLogout = () => {
  uni.showModal({
    content: '确定要退出登录么',
    success: (e) => {
      if (e.confirm) {
        memberStore.memberLogout()
        uni.showToast({
          title: '已退出登录',
          icon: 'success',
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 200)
      }
    },
  })
}

// 页面内导航
const navTo = (url: string) => {
  if (url.includes('pages')) {
    uni.navigateTo({
      url: url,
    })
  } else {
    uni.showToast({
      title: `跳转到${url}`,
      icon: 'none',
    })
  }
}

// 外部链接导航
const navToOuter = (url: string) => {
  // #ifdef H5
  window.location.href = url
  // #endif
  // #ifdef APP-PLUS
  plus.runtime.openURL(url)
  // #endif
  // #ifdef MP
  uni.setClipboardData({
    data: url,
    success: () => {
      uni.showToast({
        title: '链接已复制到剪贴板',
        icon: 'none',
      })
    },
  })
  // #endif
}

// 消息推送开关
const switchChange = (e: any) => {
  const statusTip = e.detail.value ? '打开' : '关闭'
  uni.showToast({
    title: `${statusTip}消息推送`,
    icon: 'none',
  })
}
</script>

<style lang="scss">
page {
  background: $page-color-base;
}
.list-cell {
  display: flex;
  align-items: baseline;
  padding: 20upx $page-row-spacing;
  line-height: 60upx;
  position: relative;
  background: #fff;
  justify-content: center;
  &.log-out-btn {
    margin-top: 40upx;
    .cell-tit {
      color: $uni-color-primary;
      text-align: center;
      margin-right: 0;
    }
  }
  &.cell-hover {
    background: #fafafa;
  }
  &.b-b:after {
    left: 30upx;
  }
  &.m-t {
    margin-top: 16upx;
  }
  .cell-more {
    align-self: baseline;
    font-size: $font-lg;
    color: $font-color-light;
    margin-left: 10upx;
  }
  .cell-tit {
    flex: 1;
    font-size: $font-base + 2rpx;
    color: $font-color-dark;
    margin-right: 10upx;
  }
  .cell-tip {
    font-size: $font-base;
    color: $font-color-light;
  }
  switch {
    transform: translateX(16upx) scale(0.84);
  }
}
</style>
