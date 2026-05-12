<template>
  <view class="uni-numbox">
    <view class="uni-numbox-minus" @click="_calcValue('subtract')">
      <text class="yticon icon-jianhao" :class="minDisabled ? 'uni-numbox-disabled' : ''"></text>
    </view>
    <input
      class="uni-numbox-value"
      type="number"
      :disabled="disabled"
      :value="inputValue"
      @blur="_onBlur"
    />
    <view class="uni-numbox-plus" @click="_calcValue('add')">
      <text class="yticon icon-jia" :class="maxDisabled ? 'uni-numbox-disabled' : ''"></text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  isMax?: boolean
  isMin?: boolean
  index?: number
  value?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}>()

const emit = defineEmits<{
  eventChange: [{ number: number; index: number }]
}>()

const inputValue = ref(props.value || 0)
const minDisabled = ref(false)
const maxDisabled = ref(false)

watch(
  () => props.isMax,
  (val) => {
    maxDisabled.value = val || false
  },
  { immediate: true },
)

watch(
  () => props.isMin,
  (val) => {
    minDisabled.value = val || false
  },
  { immediate: true },
)

watch(inputValue, (number) => {
  const data = {
    number,
    index: props.index || 0,
  }
  emit('eventChange', data)
})

const _calcValue = (type: 'subtract' | 'add') => {
  const scale = _getDecimalScale()
  let value = inputValue.value * scale
  let newValue = 0
  const step = (props.step || 1) * scale

  if (type === 'subtract') {
    newValue = value - step
    if (newValue <= (props.min ?? -Infinity)) {
      minDisabled.value = true
    }
    if (newValue < (props.min ?? -Infinity)) {
      newValue = props.min ?? -Infinity
    }
    if (newValue < (props.max ?? Infinity) && maxDisabled.value === true) {
      maxDisabled.value = false
    }
  } else if (type === 'add') {
    newValue = value + step
    if (newValue >= (props.max ?? Infinity)) {
      maxDisabled.value = true
    }
    if (newValue > (props.max ?? Infinity)) {
      newValue = props.max ?? Infinity
    }
    if (newValue > (props.min ?? -Infinity) && minDisabled.value === true) {
      minDisabled.value = false
    }
  }

  if (newValue === value) {
    return
  }
  inputValue.value = newValue / scale
}

const _getDecimalScale = () => {
  let scale = 1
  const step = props.step || 1
  // 浮点型
  if (~~step !== step) {
    scale = Math.pow(10, (step + '').split('.')[1].length)
  }
  return scale
}

const _onBlur = (event: { detail: { value: string } }) => {
  let value = event.detail.value
  if (!value) {
    inputValue.value = 0
    return
  }
  value = +value
  if (value > (props.max ?? Infinity)) {
    value = props.max ?? Infinity
  } else if (value < (props.min ?? -Infinity)) {
    value = props.min ?? -Infinity
  }
  inputValue.value = value
}
</script>

<style scoped>
.uni-numbox {
  position: absolute;
  left: 30rpx;
  bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 230rpx;
  height: 70rpx;
  background: #f5f5f5;
}

.uni-numbox-minus,
.uni-numbox-plus {
  margin: 0;
  background-color: #f5f5f5;
  width: 70rpx;
  height: 100%;
  line-height: 70rpx;
  text-align: center;
  position: relative;
}

.uni-numbox-minus .yticon,
.uni-numbox-plus .yticon {
  font-size: 36rpx;
  color: #555;
}

.uni-numbox-minus {
  border-right: none;
  border-top-left-radius: 6rpx;
  border-bottom-left-radius: 6rpx;
}

.uni-numbox-plus {
  border-left: none;
  border-top-right-radius: 6rpx;
  border-bottom-right-radius: 6rpx;
}

.uni-numbox-value {
  position: relative;
  background-color: #f5f5f5;
  width: 90rpx;
  height: 50rpx;
  text-align: center;
  padding: 0;
  font-size: 30rpx;
}

.uni-numbox-disabled.yticon {
  color: #d6d6d6;
}
</style>
