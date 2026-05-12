<template>
  <view class="content">
    <scroll-view scroll-y class="left-aside">
      <view
        v-for="item in topCateList"
        :key="item.id"
        class="f-item b-b"
        :class="{ active: item.id === currentCateId }"
        @click="handleTabTap(item)"
      >
        {{ item.name }}
      </view>
    </scroll-view>
    <scroll-view scroll-with-animation scroll-y class="right-aside">
      <view class="s-list">
        <view
          @click="handleNavToList(item.id)"
          class="s-item"
          v-for="item in subCateList"
          :key="item.id"
        >
          <image
            :src="
              item.icon ||
              'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20190519/default.png'
            "
          ></image>
          <text>{{ item.name }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getProductCateListAPI } from '@/apis/home'
import type { PmsProductCategory } from '@/types/product'

// ===== 页面数据 =====
// 当前分类id
const currentCateId = ref(0)
// 一级分类列表
const topCateList = ref<PmsProductCategory[]>([])
// 二级分类列表
const subCateList = ref<PmsProductCategory[]>([])

// ===== 数据加载 =====
// 加载分类数据
const loadData = async () => {
  try {
    // 获取一级分类数据
    const res = await getProductCateListAPI('0')
    topCateList.value = res.data
    if (topCateList.value.length > 0) {
      currentCateId.value = topCateList.value[0].id
      // 获取二级分类数据
      const subRes = await getProductCateListAPI(String(currentCateId.value))
      subCateList.value = subRes.data
    }
  } catch (e) {
    console.error('加载分类数据失败', e)
  }
}

// ===== 生命周期 =====
// 页面加载时执行
onLoad(() => {
  loadData()
})

// ===== 事件处理方法 =====
// 一级分类点击
const handleTabTap = async (item: PmsProductCategory) => {
  currentCateId.value = item.id
  try {
    const res = await getProductCateListAPI(String(item.id))
    subCateList.value = res.data
  } catch (e) {
    console.error('加载子分类失败', e)
  }
}

// 导航到商品列表
const handleNavToList = (sid: number) => {
  uni.navigateTo({
    url: `/pages/product/list?fid=${currentCateId.value}&sid=${sid}`,
  })
}
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: #f8f8f8;
}
</style>

<style lang="scss" scoped>
.content {
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
}

.left-aside {
  flex-shrink: 0;
  width: 25%;
  max-width: 120px;
  height: 100%;
  background-color: #fff;
}

.f-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100rpx;
  font-size: 28rpx;
  color: #606266;
  position: relative;

  &.active {
    color: #fa436a;
    background: #f8f8f8;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 36rpx;
      width: 8rpx;
      background-color: #fa436a;
      border-radius: 0 4px 4px 0;
      opacity: 0.8;
    }
  }
}

.right-aside {
  flex: 1;
  overflow: hidden;
  padding-left: 20rpx;
}

.s-list {
  margin-top: 20rpx;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: #fff;
  padding-top: 12rpx;

  &::after {
    content: '';
    flex: 99;
    height: 0;
  }
}

.s-item {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 33%;
  font-size: 26rpx;
  color: #666;
  padding-bottom: 20rpx;

  image {
    width: 140rpx;
    height: 140rpx;
  }
}
</style>
