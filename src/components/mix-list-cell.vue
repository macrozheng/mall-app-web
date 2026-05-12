<template>
  <view
    class="mix-list-cell"
    :class="border"
    @click="emit('eventClick')"
    hover-class="cell-hover"
    :hover-stay-time="50"
  >
    <text v-if="icon" class="cell-icon yticon" :style="[{ color: iconColor }]" :class="icon"></text>
    <text class="cell-tit clamp">{{ title }}</text>
    <text v-if="tips" class="cell-tip">{{ tips }}</text>
    <text class="cell-more yticon" :class="typeList[navigateType]"></text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon?: string
  title?: string
  tips?: string
  navigateType?: 'left' | 'right' | 'up' | 'down'
  border?: string
  hoverClass?: string
  iconColor?: string
}>()

const emit = defineEmits<{
  eventClick: []
}>()

const typeList = {
  left: 'icon-zuo',
  right: 'icon-you',
  up: 'icon-shang',
  down: 'icon-xia',
}
</script>

<style lang="scss" scoped>
.icon .mix-list-cell.b-b:after {
  left: 90rpx;
}

.mix-list-cell {
  display: flex;
  align-items: baseline;
  padding: 20rpx 30rpx;
  line-height: 60rpx;
  position: relative;

  &.cell-hover {
    background: #fafafa;
  }

  &.b-b:after {
    left: 30rpx;
  }

  .cell-icon {
    align-self: center;
    width: 56rpx;
    max-height: 60rpx;
    font-size: 38rpx;
  }

  .cell-more {
    align-self: center;
    font-size: 30rpx;
    color: #999;
    margin-left: 8rpx;
  }

  .cell-tit {
    flex: 1;
    font-size: 28rpx;
    color: #333;
    margin-right: 10rpx;
  }

  .cell-tip {
    font-size: 24rpx;
    color: #999;
  }
}
</style>
