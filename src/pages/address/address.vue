<template>
  <view class="content b-t">
    <view
      v-for="(item, index) in addressList"
      :key="index"
      class="list b-b"
      @click="handleCheckAddress(item)"
    >
      <view class="wrapper">
        <view class="address-box">
          <text v-if="item.defaultStatus === 1" class="tag">默认</text>
          <text class="address">
            {{ item.province }} {{ item.city }} {{ item.region }} {{ item.detailAddress }}
          </text>
        </view>
        <view class="u-box">
          <text class="name">{{ item.name }}</text>
          <text class="mobile">{{ item.phoneNumber }}</text>
        </view>
      </view>
      <text class="yticon icon-bianji" @click.stop="handleAddAddress('edit', item)"></text>
      <text class="yticon icon-iconfontshanchu1" @click.stop="handleDeleteAddress(item.id)"></text>
    </view>

    <button class="add-btn" @click="handleAddAddress('add')">新增地址</button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { fetchAddressListAPI, deleteAddressAPI } from '@/apis/address'
import type { MemberReceiveAddress } from '@/types/address'

// ===== 页面数据 =====
// 来源标识（1表示从订单页面进入）
const source = ref(0)
// 地址列表
const addressList = ref<MemberReceiveAddress[]>([])

// ===== loadData =====
// 加载地址列表
const loadData = async () => {
  try {
    const res = await fetchAddressListAPI()
    addressList.value = res.data
  } catch (e) {
    console.error('加载地址列表失败', e)
  }
}

// ===== onLoad =====
// 页面加载
onLoad((option) => {
  source.value = Number(option?.source) || 0
})

// ===== onShow =====
// 页面显示时刷新数据（从addressManage返回时触发）
onShow(() => {
  loadData()
})

// ===== 事件处理方法 =====
// 选择地址
const handleCheckAddress = (item: MemberReceiveAddress) => {
  if (source.value === 1) {
    // 获取上一页实例，通过 $vm 访问 Vue 组件实例
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2] as any
    if (prevPage) {
      // H5 端：prevPage.$vm.$.exposed
      // App/小程序端：prevPage.$vm.$.exposed
      const prevVm = prevPage.$vm
      if (prevVm?.$?.exposed?.setCurrentAddress) {
        prevVm.$.exposed.setCurrentAddress(item)
      }
    }
    uni.navigateBack()
  }
}

// 新增/编辑地址
const handleAddAddress = (type: string, item?: MemberReceiveAddress) => {
  if (type === 'edit' && item) {
    uni.navigateTo({
      url: `/pages/address/addressManage?type=${type}&id=${item.id}`,
    })
  } else {
    uni.navigateTo({
      url: `/pages/address/addressManage?type=${type}`,
    })
  }
}

// 删除地址
const handleDeleteAddress = (id?: number) => {
  if (!id) return
  uni.showModal({
    title: '提示',
    content: '是否要删除该地址',
    success: async (res) => {
      if (res.confirm) {
        try {
          await deleteAddressAPI(id)
          loadData()
        } catch (e) {
          console.error('删除地址失败', e)
        }
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}

// 添加或修改成功后的回调（供 addressManage 页面调用）
const refreshList = () => {
  loadData()
}

// 暴露方法供其他页面调用
defineExpose({
  refreshList,
})
</script>

<style lang="scss">
page {
  padding-bottom: 120rpx;
}
</style>

<style lang="scss" scoped>
.content {
  position: relative;
}

.list {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  background: #fff;
  position: relative;
}

.wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.address-box {
  display: flex;
  align-items: center;

  .tag {
    font-size: 24rpx;
    color: $base-color;
    margin-right: 10rpx;
    background: #fffafb;
    border: 1px solid #ffb4c7;
    border-radius: 4rpx;
    padding: 4rpx 10rpx;
    line-height: 1;
  }

  .address {
    font-size: 30rpx;
    color: $font-color-dark;
  }
}

.u-box {
  font-size: 28rpx;
  color: $font-color-light;
  margin-top: 16rpx;

  .name {
    margin-right: 30rpx;
  }
}

.icon-bianji {
  display: flex;
  align-items: center;
  height: 80rpx;
  font-size: 40rpx;
  color: $font-color-light;
  padding-left: 30rpx;
}

.icon-iconfontshanchu1 {
  display: flex;
  align-items: center;
  height: 80rpx;
  font-size: 40rpx;
  color: $font-color-light;
  padding-left: 30rpx;
}

.add-btn {
  position: fixed;
  left: 30rpx;
  right: 30rpx;
  bottom: 16rpx;
  z-index: 95;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 690rpx;
  height: 80rpx;
  font-size: 32rpx;
  color: #fff;
  background-color: $base-color;
  border-radius: 10rpx;
  box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
</style>
