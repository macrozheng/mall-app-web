<template>
	<view class="content">
		<text class="success-icon yticon icon-xuanzhong2"></text>
		<text class="tit">{{payText}}</text>
		
		<view class="btn-group">
			<navigator url="/pages/order/order?state=0" open-type="redirect" class="mix-btn">查看订单</navigator>
			<navigator url="/pages/index/index" open-type="switchTab" class="mix-btn hollow">返回首页</navigator>
		</view>
	</view>
</template>

<script>
	import {
		fetchAliapyStatus
	} from '@/api/order.js';
	import { USE_ALIPAY } from '@/utils/appConfig.js';
	export default {
		data() {
			return {
				payText: '',
				tradeStatus: null
			}
		},
		onLoad(options) {
			if(!USE_ALIPAY){
				this.payText = '支付成功';
				return;
			}
			let outTradeNo = options.out_trade_no;
			console.log(options.out_trade_no);
			fetchAliapyStatus({outTradeNo:outTradeNo}).then(response => {
				this.tradeStatus = response.data;
				if(this.tradeStatus!=null&&'TRADE_SUCCESS'==this.tradeStatus){
					this.payText = '支付成功';
				}else{
					this.payText = '支付失败';
				}
				console.log(this.tradeStatus);
			});
		},
		methods: {
			
		}
	}
</script>

<style lang='scss'>
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.success-icon{
		font-size: 160upx;
		color: #fa436a;
		margin-top: 100upx;
	}
	.tit{
		font-size: 38upx;
		color: #303133;
	}
	.btn-group{
		padding-top: 100upx;
	}
	.mix-btn {
		margin-top: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 600upx;
		height: 80upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		&.hollow{
			background: #fff;
			color: #303133;
			border: 1px solid #ccc;
		}
	}
</style>
