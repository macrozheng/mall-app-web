<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>
		<!-- 优惠券页面，仿mt -->
		<view class="coupon-item" v-for="(item,index) in couponList" :key="index">
			<view class="con">
				<view class="left">
					<text class="title">{{item.name}}</text>
					<text class="time">有效期至{{item.endTime | formatDateTime}}</text>
				</view>
				<view class="right">
					<text class="price">{{item.amount}}</text>
					<text>满{{item.minPoint}}可用</text>
				</view>

				<view class="circle l"></view>
				<view class="circle r"></view>
			</view>
			<text class="tips">{{item.useType | formatCouponUseType}}</text>
		</view>
	</view>
</template>

<script>
	import {
		fetchMemberCouponList
	} from '@/api/coupon.js';
	import {
		formatDate
	} from '@/utils/date';
	export default {
		data() {
			return {
				couponList: [],
				tabCurrentIndex:0,
				useStatus:0,
				navList: [
					{
						useStatus: 0,
						text: '未使用'
					},
					{
						useStatus: 1,
						text: '已使用'
					},
					{
						useStatus: 2,
						text: '已过期'
					}
				],
			};
		},
		onLoad() {
			this.loadData();
		},
		filters:{
			formatDateTime(time) {
				if (time == null || time === '') {
					return 'N/A';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			},
			formatCouponUseType(useType) {
				if (useType == 0) {
					return "全场通用";
				} else if (useType == 1) {
					return "指定分类商品可用";
				} else if (useType == 2) {
					return "指定商品可用";
				}
				return null;
			},
		},
		methods: {
			loadData(){
				fetchMemberCouponList(this.useStatus).then(response=>{
					this.couponList = response.data;
				});
			},
			tabClick(index){
				this.tabCurrentIndex = index;
				this.useStatus = this.navList[index].useStatus;
				this.loadData();
			},
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}
	
	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
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
		margin: 20upx 24upx;
		background: #fff;

		.con {
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;

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
			height: 100upx;
		}

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}

		.time {
			font-size: 24upx;
			color: $font-color-light;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}

		.price {
			font-size: 44upx;
			color: $base-color;

			&:before {
				content: '￥';
				font-size: 34upx;
			}
		}

		.tips {
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}

		.circle {
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;

			&.r {
				left: auto;
				right: -6upx;
			}
		}
	}
</style>
