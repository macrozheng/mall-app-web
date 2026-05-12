<template>
  <view class="content">
    <view class="row b-b">
      <text class="tit">姓名</text>
      <input
        class="input"
        type="text"
        v-model="addressData.name"
        placeholder="收货人姓名"
        placeholder-class="placeholder"
      />
    </view>
    <view class="row b-b">
      <text class="tit">手机号码</text>
      <input
        class="input"
        type="number"
        v-model="addressData.phoneNumber"
        placeholder="收货人手机号码"
        placeholder-class="placeholder"
      />
    </view>
    <view class="row b-b">
      <text class="tit">邮政编码</text>
      <input
        class="input"
        type="number"
        v-model="addressData.postCode"
        placeholder="收货人邮政编码"
        placeholder-class="placeholder"
      />
    </view>
    <view class="row b-b">
      <text class="tit">所在区域</text>
      <input
        class="input"
        type="text"
        v-model="addressData.prefixAddress"
        placeholder="所在区域"
        placeholder-class="placeholder"
      />
    </view>
    <view class="row b-b">
      <text class="tit">详细地址</text>
      <input
        class="input"
        type="text"
        v-model="addressData.detailAddress"
        placeholder="详细地址"
        placeholder-class="placeholder"
      />
    </view>

    <view class="row default-row">
      <text class="tit">设为默认</text>
      <switch
        :checked="addressData.defaultStatus === 1"
        color="#fa436a"
        @change="handleSwitchChange"
      />
    </view>
    <button class="add-btn" @click="handleConfirm">提交</button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { addAddressAPI, updateAddressAPI, fetchAddressDetailAPI } from '@/apis/address'
import type { MemberReceiveAddress } from '@/types/address'

// ===== 页面数据 =====
// 操作类型（add/edit）
const manageType = ref('')
// 地址表单数据
const addressData = ref<MemberReceiveAddress>({
  name: '',
  phoneNumber: '',
  postCode: '',
  detailAddress: '',
  defaultStatus: 0,
  province: '',
  city: '',
  region: '',
  prefixAddress: '',
})

// ===== 辅助方法 =====
// 将省市区字符串解析为 province/city/region
const covertAddress = (address: string) => {
  console.log('covertAddress', address)
  if (address.indexOf('省') !== -1) {
    addressData.value.province = address.substr(0, address.indexOf('省') + 1)
    address = address.replace(addressData.value.province, '')
    addressData.value.city = address.substr(0, address.indexOf('市') + 1)
    address = address.replace(addressData.value.city, '')
    addressData.value.region = address.substr(0, address.indexOf('区') + 1)
  } else {
    addressData.value.province = address.substr(0, address.indexOf('市') + 1)
    address = address.replace(addressData.value.province, '')
    addressData.value.city = ''
    addressData.value.region = address.substr(0, address.indexOf('区') + 1)
  }
}

// ===== onLoad =====
// 页面加载
onLoad((option) => {
  let title = '新增收货地址'
  if (option?.type === 'edit' && option?.id) {
    title = '编辑收货地址'
    loadAddressDetail(Number(option.id))
  }
  manageType.value = option?.type || 'add'
  uni.setNavigationBarTitle({ title })
})

// 加载地址详情（编辑模式）
const loadAddressDetail = async (id: number) => {
  try {
    const res = await fetchAddressDetailAPI(id)
    addressData.value = res.data
    addressData.value.prefixAddress =
      (addressData.value.province || '') +
      (addressData.value.city || '') +
      (addressData.value.region || '')
  } catch (e) {
    console.error('加载地址详情失败', e)
  }
}

// ===== 事件处理方法 =====
// 默认地址开关切换
const handleSwitchChange = (e: UniHelper.SwitchOnChangeEvent) => {
  addressData.value.defaultStatus = e.detail.value ? 1 : 0
}

// 提交表单
const handleConfirm = async () => {
  const data = addressData.value
  if (!data.name) {
    uni.showToast({ title: '请填写收货人姓名', icon: 'none' })
    return
  }
  if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.phoneNumber)) {
    uni.showToast({ title: '请输入正确的手机号码', icon: 'none' })
    return
  }
  if (!data.prefixAddress) {
    uni.showToast({ title: '请输入区域', icon: 'none' })
    return
  }
  covertAddress(data.prefixAddress)
  if (!data.province) {
    uni.showToast({ title: '请输入正确的省份', icon: 'none' })
    return
  }
  if (!data.detailAddress) {
    uni.showToast({ title: '请填写详细地址信息', icon: 'none' })
    return
  }

  try {
    if (manageType.value === 'edit') {
      await updateAddressAPI(data)
      uni.showToast({ title: '地址修改成功！' })
    } else {
      await addAddressAPI(data)
      uni.showToast({ title: '地址添加成功！' })
    }
    // 刷新上一页地址列表
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2] as any
    if (prevPage && prevPage.refreshList) {
      prevPage.refreshList(data, manageType.value)
    }
    setTimeout(() => {
      uni.navigateBack()
    }, 800)
  } catch (e) {
    console.error('保存地址失败', e)
  }
}
</script>

<style lang="scss">
page {
  background: $page-color-base;
  padding-top: 16rpx;
}
</style>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 30rpx;
  height: 110rpx;
  background: #fff;

  .tit {
    flex-shrink: 0;
    width: 150rpx;
    font-size: 30rpx;
    color: $font-color-dark;
  }

  .input {
    flex: 1;
    font-size: 30rpx;
    color: $font-color-dark;
  }

  .icon-shouhuodizhi {
    font-size: 36rpx;
    color: $font-color-light;
  }
}

.default-row {
  margin-top: 16rpx;

  .tit {
    flex: 1;
  }

  switch {
    transform: translateX(16rpx) scale(0.9);
  }
}

.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 690rpx;
  height: 80rpx;
  margin: 60rpx auto;
  font-size: $font-lg;
  color: #fff;
  background-color: $base-color;
  border-radius: 10rpx;
  box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
</style>
