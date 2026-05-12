<template>
  <view class="container">
    <!-- 空白页 -->
    <view v-if="!hasLogin || empty === true" class="empty">
      <image src="/static/emptyCart.jpg" mode="aspectFit"></image>
      <view v-if="hasLogin" class="empty-tips">
        空空如也
        <navigator class="navigator" url="../index/index" open-type="switchTab"
          >随便逛逛></navigator
        >
      </view>
      <view v-else class="empty-tips">
        空空如也
        <view class="navigator" @click="handleNavToLogin">去登陆</view>
      </view>
    </view>
    <view v-else>
      <!-- 列表 -->
      <view class="cart-list">
        <block v-for="(item, index) in cartList" :key="item.id">
          <view class="cart-item" :class="{ 'b-b': index !== cartList.length - 1 }">
            <view class="image-wrapper" @click="handleNavToProductDetail(item.productId)">
              <image
                :src="item.productPic"
                :class="[item.loaded]"
                mode="aspectFill"
                lazy-load
                @load="handleImageLoad(index)"
                @error="handleImageError(index)"
              ></image>
              <view
                class="yticon icon-xuanzhong2 checkbox"
                :class="{ checked: item.checked }"
                @click.stop="handleCheck(index)"
              ></view>
            </view>
            <view class="item-right" @click="handleNavToProductDetail(item.productId)">
              <text class="clamp title">{{ item.productName }}</text>
              <text class="clamp attr">{{ item.spDataStr }}</text>
              <text class="price">¥{{ item.price }}</text>
              <uni-number-box
                class="step"
                :min="1"
                :max="100"
                :value="item.quantity"
                :index="index"
                @eventChange="handleNumberChange"
                @click.stop
              ></uni-number-box>
            </view>
            <text class="del-btn yticon icon-fork" @click.stop="handleDeleteCartItem(index)"></text>
          </view>
        </block>
      </view>
      <!-- 底部菜单栏 -->
      <view class="action-section">
        <view class="checkbox">
          <image
            :src="allChecked ? '/static/selected.png' : '/static/select.png'"
            mode="aspectFit"
            @click="handleCheckAll"
          ></image>
          <view class="clear-btn" :class="{ show: allChecked }" @click="handleClearCart">清空</view>
        </view>
        <view class="total-box">
          <text class="price">¥{{ totalPrice }}元</text>
        </view>
        <button type="primary" class="no-border confirm-btn" @click="handleCreateOrder"
          >去结算</button
        >
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useMemberStore } from '@/stores/member'
import { getCartListAPI, deleteCartAPI, updateCartQuantityAPI, clearCartAPI } from '@/apis/cart'
import type { CartItem } from '@/types/cart'
import uniNumberBox from '@/components/uni-number-box.vue'

// ===== Store 相关 =====
// 获取会员store
const memberStore = useMemberStore()
// 是否登录
const hasLogin = computed(() => !!memberStore.memberInfo)

// ===== 页面数据 =====
// 购物车中商品总价
const totalPrice = ref(0)
// 购物车中商品是否全部选中
const allChecked = ref(false)
// 购物车中商品是否为空
const empty = ref(false)
// 购物车中商品列表
const cartList = ref<CartItem[]>([])
// ===== 数据加载 =====
// 加载购物车数据
const loadData = async () => {
  if (!hasLogin.value) {
    return
  }
  try {
    const res = await getCartListAPI()
    const list = res.data as CartItem[]
    cartList.value = list.map((item) => {
      item.checked = true
      item.loaded = 'loaded'
      const spDataArr = JSON.parse(item.productAttr)
      let spDataStr = ''
      for (const attr of spDataArr) {
        spDataStr += attr.key
        spDataStr += ':'
        spDataStr += attr.value
        spDataStr += ';'
      }
      item.spDataStr = spDataStr
      return item
    })
    calcTotal()
  } catch (e) {
    console.error('加载购物车失败', e)
  }
}

// ===== 生命周期 =====
// 监听购物车列表变化
watch(
  () => cartList.value.length,
  (len) => {
    empty.value = len === 0
  },
)

// 页面显示时调用
onShow(() => {
  loadData()
})

// ===== 事件处理方法 =====
// 图片加载完成
const handleImageLoad = (index: number) => {
  cartList.value[index].loaded = 'loaded'
}

// 图片加载失败
const handleImageError = (index: number) => {
  cartList.value[index].productPic = '/static/errorImage.jpg'
}

// 跳转登录
const handleNavToLogin = () => {
  uni.navigateTo({
    url: '/pages/public/login',
  })
}

// 选择商品
const handleCheck = (index: number) => {
  cartList.value[index].checked = !cartList.value[index].checked
  calcTotal()
}

// 全选商品
const handleCheckAll = () => {
  const checked = !allChecked.value
  cartList.value.forEach((item) => {
    item.checked = checked
  })
  allChecked.value = checked
  calcTotal()
}

// 修改商品数量
const handleNumberChange = async (data: { number: number; index: number }) => {
  const cartItem = cartList.value[data.index]
  try {
    await updateCartQuantityAPI({ id: cartItem.id, quantity: data.number })
    cartItem.quantity = data.number
    calcTotal()
  } catch (e) {
    console.error('更新数量失败', e)
  }
}

// 删除商品
const handleDeleteCartItem = async (index: number) => {
  const row = cartList.value[index]
  try {
    await deleteCartAPI({ ids: row.id })
    cartList.value.splice(index, 1)
    calcTotal()
    uni.hideLoading()
  } catch (e) {
    console.error('删除失败', e)
  }
}

// 跳转到商品详情
const handleNavToProductDetail = (productId: number) => {
  uni.navigateTo({
    url: `/pages/product/product?id=${productId}`,
  })
}

// 清空购物车
const handleClearCart = () => {
  uni.showModal({
    content: '清空购物车？',
    success: async (e) => {
      if (e.confirm) {
        try {
          await clearCartAPI()
          cartList.value = []
        } catch (err) {
          console.error('清空失败', err)
        }
      }
    },
  })
}

// 去结算
const handleCreateOrder = () => {
  const list = cartList.value
  const cartIds: string[] = []
  list.forEach((item) => {
    if (item.checked) {
      cartIds.push(item.id)
    }
  })
  if (cartIds.length === 0) {
    uni.showToast({
      title: '您还未选择要下单的商品！',
      duration: 1000,
    })
    return
  }
  uni.navigateTo({
    url: `/pages/order/createOrder?cartIds=${JSON.stringify(cartIds)}`,
  })
}

// ===== 其他方法 =====
// 计算商品总价
const calcTotal = () => {
  const list = cartList.value
  if (list.length === 0) {
    empty.value = true
    totalPrice.value = 0
    return
  }
  let sum = 0
  let checked = true
  list.forEach((item) => {
    const price = item.price || 0
    const quantity = item.quantity || 0
    if (item.checked === true) {
      sum += price * quantity
    } else if (checked === true) {
      checked = false
    }
  })
  allChecked.value = checked
  totalPrice.value = Number(sum.toFixed(2))
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 134rpx;

  .empty {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    padding-bottom: 100rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: #fff;

    image {
      width: 240rpx;
      height: 160rpx;
      margin-bottom: 30rpx;
    }

    .empty-tips {
      display: flex;
      font-size: 26rpx;
      color: #c0c4cc;

      .navigator {
        color: #fa436a;
        margin-left: 16rpx;
      }
    }
  }
}

.cart-item {
  display: flex;
  position: relative;
  padding: 30rpx 40rpx;

  .image-wrapper {
    width: 230rpx;
    height: 230rpx;
    flex-shrink: 0;
    position: relative;

    image {
      width: 100%;
      height: 100%;
      border-radius: 8rpx;
    }
  }

  .checkbox {
    position: absolute;
    left: -16rpx;
    top: -16rpx;
    z-index: 8;
    font-size: 44rpx;
    line-height: 1;
    padding: 4rpx;
    color: #c0c4cc;
    background: #fff;
    border-radius: 50px;
  }

  .item-right {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    position: relative;
    padding-left: 30rpx;

    .title,
    .price {
      font-size: 30rpx;
      color: #303133;
      height: 40rpx;
      line-height: 40rpx;
    }

    .attr {
      font-size: 26rpx;
      color: #909399;
      height: 50rpx;
      line-height: 50rpx;
    }

    .price {
      height: 50rpx;
      line-height: 50rpx;
    }
  }

  .del-btn {
    padding: 4rpx 10rpx;
    font-size: 34rpx;
    height: 50rpx;
    color: #909399;
  }
}

.action-section {
  /* #ifdef H5 */
  margin-bottom: 100rpx;
  /* #endif */
  position: fixed;
  left: 30rpx;
  bottom: calc(30rpx + env(safe-area-inset-bottom));
  z-index: 95;
  display: flex;
  align-items: center;
  width: 690rpx;
  height: 100rpx;
  padding: 0 30rpx;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.5);
  border-radius: 16rpx;

  .checkbox {
    height: 52rpx;
    position: relative;

    image {
      width: 52rpx;
      height: 100%;
      position: relative;
      z-index: 5;
    }
  }

  .clear-btn {
    position: absolute;
    left: 26rpx;
    top: 0;
    z-index: 4;
    width: 0;
    height: 52rpx;
    line-height: 52rpx;
    padding-left: 38rpx;
    font-size: 28rpx;
    color: #fff;
    background: #c0c4cc;
    border-radius: 0 50px 50px 0;
    opacity: 0;
    transition: 0.2s;

    &.show {
      opacity: 1;
      width: 120rpx;
    }
  }

  .total-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: right;
    padding-right: 40rpx;

    .price {
      font-size: 32rpx;
      color: #303133;
    }
  }

  .confirm-btn {
    padding: 0 38rpx;
    margin: 0;
    border-radius: 100px;
    height: 76rpx;
    line-height: 76rpx;
    font-size: 30rpx;
    background: #fa436a;
    box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72);
  }
}

.action-section .checkbox.checked,
.cart-item .checkbox.checked {
  color: #fa436a;
}
</style>
