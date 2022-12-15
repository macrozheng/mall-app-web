<template>
	<view class="content">
		<!-- 空白页 -->
		<empty v-if="productList==null||productList.length === 0"></empty>
		<view class="hot-section">
			<view v-for="(item, index) in productList" :key="index" class="guess-item" @click="navToDetailPage(item)">
				<view class="image-wrapper">
					<image :src="item.productPic" mode="aspectFill"></image>
				</view>
				<view class="txt">
					<text class="title clamp">{{item.productName}}</text>
					<text class="title2">{{item.productSubTitle}}</text>
					<view class="hor-txt">
						<text class="price">￥{{item.productPrice}}</text>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import empty from "@/components/empty";
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {
		formatDate
	} from '@/utils/date';
	import {
		fetchProductCollectionList,
		clearProductCollection
	} from '@/api/memberProductCollection.js';
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				loadingType: 'more',
				productList: [],
				searchParam: {
					pageNum: 1,
					pageSize: 6
				}
			};
		},
		onLoad(options) {
			this.loadData();
		},
		//下拉刷新
		onPullDownRefresh() {
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom() {
			this.searchParam.pageNum++;
			this.loadData();
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			let thisObj = this;
			if (index === 0) {
				uni.showModal({
				    title: '提示',
				    content: '是否要清空所有浏览记录？',
				    success: function (res) {
				        if (res.confirm) {
				            clearProductCollection().then(response=>{
								thisObj.loadData('refresh');
							});
				        }
				    }
				});
			}
		},
		// #endif
		filters: {
			formatDateTime(time) {
				if (time == null || time === '') {
					return 'N/A';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			},
		},
		methods: {
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type = 'add', loading) {
				//没有更多直接返回
				if (type === 'add') {
					if (this.loadingType === 'nomore') {
						return;
					}
					this.loadingType = 'loading';
				} else {
					this.loadingType = 'more'
				}

				if (type === 'refresh') {
					this.searchParam.pageNum = 1;
					this.productList = [];
				}
				fetchProductCollectionList(this.searchParam).then(response => {
					let dataList = response.data.list;
					if (dataList.length === 0) {
						//没有更多了
						this.loadingType = 'nomore';
						this.searchParam.pageNum--;
					} else {
						if (dataList.length < this.searchParam.pageSize) {
							this.loadingType = 'nomore';
							this.searchParam.pageNum--;
						} else {
							this.loadingType = 'more';
						}
						this.productList = this.productList.concat(dataList);
					}
					if (type === 'refresh') {
						if (loading == 1) {
							uni.hideLoading()
						} else {
							uni.stopPullDownRefresh();
						}
					}
				});
			},
			//详情
			navToDetailPage(item) {
				let id = item.productId;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			stopPrevent() {}
		},
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
	}

	.hot-section {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		margin-top: 16upx;
		background: #fff;

		.guess-item {
			display: flex;
			flex-direction: row;
			width: 100%;
			padding-bottom: 40upx;
		}

		.image-wrapper {
			width: 30%;
			height: 250upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}

		.title2 {
			font-size: $font-sm;
			color: $font-color-light;
			line-height: 40upx;
			height: 80upx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: block;
		}

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 80upx;
		}

		.txt {
			width: 70%;
			display: flex;
			flex-direction: column;
			padding-left: 40upx;
		}
		.hor-txt{
			display: flex;
			justify-content: space-between;
		}

		.time {
			font-size: $font-sm;
			color: $font-color-dark;
			line-height: 80upx;
		}
	}
</style>
