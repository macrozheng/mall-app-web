<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image :src="item.src" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section">
			<text class="title">{{product.name}}</text><br>
			<text class="title2">{{product.subTitle}}</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{product.price}}</text>
				<text class="m-price">¥{{product.originalPrice}}</text>
				<!-- <text class="coupon-tip">7折</text> -->
			</view>
			<view class="bot-row">
				<text>销量: {{product.sale}}</text>
				<text>库存: {{product.stock}}</text>
				<text>浏览量: 768</text>
			</view>
		</view>

		<!--  分享 -->
		<view class="share-section" @click="share">
			<view class="share-icon">
				<text class="yticon icon-xingxing"></text>
				返
			</view>
			<text class="tit">该商品分享可领49减10红包</text>
			<text class="yticon icon-bangzhu1"></text>
			<view class="share-btn">
				立即分享
				<text class="yticon icon-you"></text>
			</view>

		</view>

		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec">
				<text class="tit">购买类型</text>
				<view class="con">
					<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
						{{sItem.name}}
					</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<view class="c-row b-b" @click="toggleAttr">
				<text class="tit">商品参数</text>
				<view class="con">
					<text class="con t-r">查看</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<view class="c-row b-b" @click="toggleCoupon('show')">
				<text class="tit">优惠券</text>
				<text class="con t-r red">领取优惠券</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="c-row b-b">
				<text class="tit">促销活动</text>
				<view class="con-list">
					<text v-for="item in promotionTipList" :key="item">{{item}}</text>
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text v-for="item in serviceList" :key="item">{{item}} ·</text>
				</view>
			</view>
		</view>

		<!-- 评价 -->
		<view class="eva-section">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>(86)</text>
				<text class="tip">好评率 100%</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="eva-box">
				<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
				<view class="right">
					<text class="name">Leo yo</text>
					<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 品牌信息 -->
		<view class="brand-info">
			<view class="d-header">
				<text>品牌信息</text>
			</view>
			<view class="brand-box" @click="navToBrandDetail()">
				<view class="image-wrapper">
					<image :src="brand.logo" class="loaded" mode="aspectFit"></image>
				</view>
				<view class="title">
					<text>{{brand.name}}</text>
					<text>品牌首字母：{{brand.firstLetter}}</text>
				</view>
			</view>
		</view>

		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<rich-text :nodes="desc"></rich-text>
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-gouwuche"></text>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view>

			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="buy">立即购买</button>
				<button type="primary" class=" action-btn no-border add-cart-btn" @click="addToCart">加入购物车</button>
			</view>
		</view>


		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image :src="product.pic"></image>
					<view class="right">
						<text class="price">¥{{product.price}}</text>
						<text class="stock">库存：{{product.stock}}件</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{sItem.name}}
							</text>
						</view>
					</view>
				</view>
				<view v-for="(item,index) in specList" :key="index" class="attr-list">
					<text>{{item.name}}</text>
					<view class="item-list">
						<text v-for="(childItem, childIndex) in specChildList" v-if="childItem.pid === item.id" :key="childIndex" class="tit"
						 :class="{selected: childItem.selected}" @click="selectSpec(childIndex, childItem.pid)">
							{{childItem.name}}
						</text>
					</view>
				</view>
				<button class="btn" @click="toggleSpec">完成</button>
			</view>
		</view>
		<!-- 属性-模态层弹窗 -->
		<view class="popup spec" :class="attrClass" @touchmove.stop.prevent="stopPrevent" @click="toggleAttr">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content no-padding" @click.stop="stopPrevent">
				<view class="c-list">
					<view v-for="item in attrList" class="c-row b-b" :key="item.key">
						<text class="tit">{{item.key}}</text>
						<view class="con">
							<text class="con t-r">{{item.value}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 优惠券面板 -->
		<view class="mask" :class="couponState===0 ? 'none' : couponState===1 ? 'show' : ''" @click="toggleCoupon">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in couponList" :key="index" @click="addCoupon(item)">
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
		</view>
		<!-- 分享 -->
		<share ref="share" :contentHeight="580" :shareList="shareList"></share>
	</view>
</template>

<script>
	import share from '@/components/share';
	import {
		fetchProductDetail
	} from '@/api/product.js';
	import {
		addCartItem
	} from '@/api/cart.js';
	import {
		fetchProductCouponList,
		addMemberCoupon
	} from '@/api/coupon.js';
	import {
		createReadHistory
	} from '@/api/memberReadHistory.js';
	import {
		createProductCollection,
		deleteProductCollection,
		productCollectionDetail
	} from '@/api/memberProductCollection.js';
	import {
		mapState
	} from 'vuex';
	import {
		formatDate
	} from '@/utils/date';
	const defaultServiceList = [{
		id: 1,
		name: "无忧退货"
	}, {
		id: 2,
		name: "快速退款"
	}, {
		id: 3,
		name: "免费包邮"
	}];
	const defaultShareList = [{
			type: 1,
			icon: '/static/temp/share_wechat.png',
			text: '微信好友'
		},
		{
			type: 2,
			icon: '/static/temp/share_moment.png',
			text: '朋友圈'
		},
		{
			type: 3,
			icon: '/static/temp/share_qq.png',
			text: 'QQ好友'
		},
		{
			type: 4,
			icon: '/static/temp/share_qqzone.png',
			text: 'QQ空间'
		}
	]
	export default {
		components: {
			share
		},
		data() {
			return {
				specClass: 'none',
				attrClass: 'none',
				specSelected: [],
				favorite: false,
				shareList: [],
				imgList: [],
				desc: '',
				specList: [],
				specChildList: [],
				product: {},
				brand: {},
				serviceList: [],
				skuStockList: [],
				attrList: [],
				promotionTipList: [],
				couponState: 0,
				couponList: []
			};
		},
		async onLoad(options) {
			let id = options.id;
			this.shareList = defaultShareList;
			this.loadData(id);
		},
		computed: {
			...mapState(['hasLogin'])
		},
		filters: {
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
			async loadData(id) {
				fetchProductDetail(id).then(response => {
					this.product = response.data.product;
					this.skuStockList = response.data.skuStockList;
					this.brand = response.data.brand;
					this.initImgList();
					this.initServiceList();
					this.initSpecList(response.data);
					this.initAttrList(response.data);
					this.initPromotionTipList(response.data);
					this.initProductDesc();
					this.handleReadHistory();
					this.initProductCollection();
				});
			},
			//规格弹窗开关
			toggleSpec() {
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none') {
					this.specClass = 'show';
				}
			},
			//属性弹窗开关
			toggleAttr() {
				if (this.attrClass === 'show') {
					this.attrClass = 'hide';
					setTimeout(() => {
						this.attrClass = 'none';
					}, 250);
				} else if (this.attrClass === 'none') {
					this.attrClass = 'show';
				}
			},
			//优惠券弹窗开关
			toggleCoupon(type) {
				fetchProductCouponList(this.product.id).then(response => {
					this.couponList = response.data;
					if(this.couponList==null||this.couponList.length==0){
						uni.showToast({
							title:"暂无可领优惠券",
							icon:"none"
						})
						return;
					}
					let timer = type === 'show' ? 10 : 300;
					let state = type === 'show' ? 1 : 0;
					this.couponState = 2;
					setTimeout(() => {
						this.couponState = state;
					}, timer)
				});
			},
			//选择规格
			selectSpec(index, pid) {
				let list = this.specChildList;
				list.forEach(item => {
					if (item.pid === pid) {
						this.$set(item, 'selected', false);
					}
				})

				this.$set(list[index], 'selected', true);
				//存储已选择
				/**
				 * 修复选择规格存储错误
				 * 将这几行代码替换即可
				 * 选择的规格存放在specSelected中
				 */
				this.specSelected = [];
				list.forEach(item => {
					if (item.selected === true) {
						this.specSelected.push(item);
					}
				})
				this.changeSpecInfo();

			},
			//领取优惠券
			addCoupon(coupon) {
				this.toggleCoupon();
				addMemberCoupon(coupon.id).then(response => {
					uni.showToast({
						title: '领取优惠券成功！',
						duration: 2000
					});
				});
			},
			//分享
			share() {
				this.$refs.share.toggleMask();
			},
			//收藏
			toFavorite() {
				if (!this.checkForLogin()) {
					return;
				}
				if (this.favorite) {
					//取消收藏
					deleteProductCollection({
						productId: this.product.id
					}).then(response => {
						uni.showToast({
							title: "取消收藏成功！",
							icon: 'none'
						});
						this.favorite = !this.favorite;
					});
				} else {
					//收藏
					let productCollection = {
						productId: this.product.id,
						productName: this.product.name,
						productPic: this.product.pic,
						productPrice: this.product.price,
						productSubTitle: this.product.subTitle
					}
					createProductCollection(productCollection).then(response => {
						uni.showToast({
							title: "收藏成功！",
							icon: 'none'
						});
						this.favorite = !this.favorite;
					});
				}
			},
			buy() {
				uni.showToast({
					title: "暂时只支持从购物车下单！",
					icon: 'none'
				});
			},
			stopPrevent() {},
			//设置头图信息
			initImgList() {
				let tempPics = this.product.albumPics.split(',');
				tempPics.unshift(this.product.pic);
				for (let item of tempPics) {
					if (item != null && item != '') {
						this.imgList.push({
							src: item
						});
					}
				}
			},
			//设置服务信息
			initServiceList() {
				for (let item of defaultServiceList) {
					if (this.product.serviceIds.indexOf(item.id) != -1) {
						this.serviceList.push(item.name);
					}
				}
			},
			//设置商品规格
			initSpecList(data) {
				for (let i = 0; i < data.productAttributeList.length; i++) {
					let item = data.productAttributeList[i];
					if (item.type == 0) {
						this.specList.push({
							id: item.id,
							name: item.name
						});
						if (item.handAddStatus == 1) {
							//支持手动新增的
							let valueList = data.productAttributeValueList;
							let filterValueList = valueList.filter(value => value.productAttributeId == item.id);
							let inputList = filterValueList[0].value.split(',');
							for (let j = 0; j < inputList.length; j++) {
								this.specChildList.push({
									pid: item.id,
									pname: item.name,
									name: inputList[j]
								});
							}
						} else if (item.handAddStatus == 0) {
							//不支持手动新增的
							let inputList = item.inputList.split(',');
							for (let j = 0; j < inputList.length; j++) {
								this.specChildList.push({
									pid: item.id,
									pname: item.name,
									name: inputList[j]
								});
							}
						}
					}
				}
				let availAbleSpecSet = new Set();
				for (let i = 0; i < this.skuStockList.length; i++) {
					let spDataArr = JSON.parse(this.skuStockList[i].spData);
					for (let j = 0; j < spDataArr.length; j++) {
						availAbleSpecSet.add(spDataArr[j].value);
					}
				}
				// 根据商品sku筛选出可用规格
				this.specChildList = this.specChildList.filter(item => {
					return availAbleSpecSet.has(item.name)
				});
				// 规格 默认选中第一条
				this.specList.forEach(item => {
					for (let cItem of this.specChildList) {
						if (cItem.pid === item.id) {
							this.$set(cItem, 'selected', true);
							this.specSelected.push(cItem);
							this.changeSpecInfo();
							break;
						}
					}
				})
			},
			//设置商品参数
			initAttrList(data) {
				for (let item of data.productAttributeList) {
					if (item.type == 1) {
						let valueList = data.productAttributeValueList;
						let filterValueList = valueList.filter(value => value.productAttributeId == item.id);
						let value = filterValueList[0].value;
						this.attrList.push({
							key: item.name,
							value: value
						});
					}
				}
			},
			//设置促销活动信息
			initPromotionTipList(data) {
				let promotionType = this.product.promotionType;
				if (promotionType == 0) {
					this.promotionTipList.push("暂无优惠");
				} else if (promotionType == 1) {
					this.promotionTipList.push("单品优惠");
				} else if (promotionType == 2) {
					this.promotionTipList.push("会员优惠");
				} else if (promotionType == 3) {
					this.promotionTipList.push("多买优惠");
					for (let item of data.productLadderList) {
						this.promotionTipList.push("满" + item.count + "件打" + item.discount * 10 + "折");
					}
				} else if (promotionType == 4) {
					this.promotionTipList.push("满减优惠");
					for (let item of data.productFullReductionList) {
						this.promotionTipList.push("满" + item.fullPrice + "元减" + item.reducePrice + "元");
					}
				} else if (promotionType == 5) {
					this.promotionTipList.push("限时优惠");
				}
			},
			//初始化商品详情信息
			initProductDesc() {
				let rawhtml = this.product.detailMobileHtml;
				let tempNode = document.createElement('div');
				tempNode.innerHTML = rawhtml;
				let imgs = tempNode.getElementsByTagName('img');
				for (let i = 0; i < imgs.length; i++) {
					imgs[i].style.width = '100%';
					imgs[i].style.height = 'auto';
					imgs[i].style.display = 'block';
				}
				this.desc = tempNode.innerHTML;
			},
			//处理创建浏览记录
			handleReadHistory() {
				if (this.hasLogin) {
					let data = {
						productId: this.product.id,
						productName: this.product.name,
						productPic: this.product.pic,
						productPrice: this.product.price,
						productSubTitle: this.product.subTitle,
					}
					createReadHistory(data);
				}
			},
			//当商品规格改变时，修改商品信息
			changeSpecInfo() {
				let skuStock = this.getSkuStock();
				if (skuStock != null) {
					this.product.originalPrice = skuStock.price;
					if (this.product.promotionType == 1) {
						//单品优惠使用促销价
						this.product.price = skuStock.promotionPrice;
					} else {
						this.product.price = skuStock.price;
					}
					this.product.stock = skuStock.stock;
				}
			},
			//获取当前选中商品的SKU
			getSkuStock() {
				for (let i = 0; i < this.skuStockList.length; i++) {
					let spDataArr = JSON.parse(this.skuStockList[i].spData);
					let availAbleSpecSet = new Map();
					for (let j = 0; j < spDataArr.length; j++) {
						availAbleSpecSet.set(spDataArr[j].key, spDataArr[j].value);
					}
					let correctCount = 0;
					for (let item of this.specSelected) {
						let value = availAbleSpecSet.get(item.pname);
						if (value != null && value == item.name) {
							correctCount++;
						}
					}
					if (correctCount == this.specSelected.length) {
						return this.skuStockList[i];
					}
				}
				return null;
			},
			//将商品加入到购物车
			addToCart() {
				if (!this.checkForLogin()) {
					return;
				}
				let productSkuStock = this.getSkuStock();
				let cartItem = {
					price: this.product.price,
					productAttr: productSkuStock.spData,
					productBrand: this.product.brandName,
					productCategoryId: this.product.productCategoryId,
					productId: this.product.id,
					productName: this.product.name,
					productPic: this.product.pic,
					productSkuCode: productSkuStock.skuCode,
					productSkuId: productSkuStock.id,
					productSn: this.product.productSn,
					productSubTitle: this.product.subTitle,
					quantity: 1
				};
				addCartItem(cartItem).then(response => {
					uni.showToast({
						title: response.message,
						duration: 1500
					})
				});
			},
			//检查登录状态并弹出登录框
			checkForLogin() {
				if (!this.hasLogin) {
					uni.showModal({
						title: '提示',
						content: '你还没登录，是否要登录？',
						confirmText: '去登录',
						cancelText: '取消',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/public/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return false;
				} else {
					return true;
				}
			},
			//初始化收藏状态
			initProductCollection() {
				if (this.hasLogin) {
					productCollectionDetail({
						productId: this.product.id
					}).then(response => {
						this.favorite = response.data != null;
					});
				}
			},
			//跳转到品牌详情页
			navToBrandDetail(){
				let id = this.brand.id;
				uni.navigateTo({
					url: `/pages/brand/brandDetail?id=${id}`
				})
			},
		},

	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
		padding-bottom: 160upx;
	}

	.icon-you {
		font-size: $font-base + 2upx;
		color: #888;
	}

	.carousel {
		height: 722upx;
		position: relative;

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 20upx 30upx;

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}

		.title2 {
			font-size: 28upx;
			color: $font-color-light;
			height: 46upx;
			line-height: 46upx;
		}

		.price-box {
			display: flex;
			align-items: baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color: $uni-color-primary;
		}

		.price {
			font-size: $font-lg + 2upx;
		}

		.m-price {
			margin: 0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}

		.coupon-tip {
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx);
		}

		.bot-row {
			display: flex;
			align-items: center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;

			text {
				flex: 1;
			}
		}
	}

	/* 分享 */
	.share-section {
		display: flex;
		align-items: center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;

		.share-icon {
			display: flex;
			align-items: center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position: relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;

			&:after {
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position: absolute;
				background: $uni-color-primary;
			}
		}

		.icon-xingxing {
			position: relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}

		.tit {
			font-size: $font-base;
			margin-left: 10upx;
		}

		.icon-bangzhu1 {
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}

		.share-btn {
			flex: 1;
			text-align: right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}

		.icon-you {
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}

	.c-list {
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;

		.c-row {
			display: flex;
			align-items: center;
			padding: 20upx 30upx;
			position: relative;
		}

		.tit {
			width: 140upx;
		}

		.con {
			flex: 1;
			color: $font-color-dark;

			.selected-text {
				margin-right: 10upx;
			}
		}

		.bz-list {
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;

			text {
				display: inline-block;
				margin-right: 30upx;
			}
		}

		.con-list {
			flex: 1;
			display: flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}

		.red {
			color: $uni-color-primary;
		}
	}

	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;

		.e-header {
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.tit {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}

			.tip {
				flex: 1;
				text-align: right;
			}

			.icon-you {
				margin-left: 10upx;
			}
		}
	}

	.eva-box {
		display: flex;
		padding: 20upx 0;

		.portrait {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;

			.con {
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}

			.bot {
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
	}

	/*  详情 */
	.detail-desc {
		background: #fff;
		margin-top: 16upx;

		.d-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;

			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}

			&:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
			}
		}
	}

	.detail-desc>>>img {
		width: 100%;
		height: auto;
	}

	/* 规格选择弹窗 */
	.attr-content {
		padding: 10upx 30upx;

		.a-t {
			display: flex;

			image {
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;
				;
			}

			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;

				.price {
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}

		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}

			.selected {
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
	}

	.no-padding {
		padding: 0upx 0upx;
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.p-b-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;

			.yticon {
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}

			&.active,
			&.active .yticon {
				color: $uni-color-primary;
			}

			.icon-fenxiang2 {
				font-size: 42upx;
				transform: translateY(-2upx);
			}

			.icon-shoucang {
				font-size: 46upx;
			}
		}

		.action-btn-group {
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30, #fa436a, #F56C6C);
			margin-left: 20upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255, 255, 255, .5);
			}

			.action-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}

	/* 优惠券面板 */
	.mask {
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 9995;
		transition: .3s;

		.mask-content {
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y: scroll;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.mask-content {
				transform: translateY(0);
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

	.brand-info {
		margin-top: 16upx;
		background-color: #fff;
		display: flex;
		flex-direction: column;

		.brand-box {
			display: flex;
			align-items: center;
			padding: 30upx 50upx;

			.image-wrapper {
				width: 210upx;
				height: 70upx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.title {
				flex: 1;
				display: flex;
				flex-direction: column;
				font-size: $font-lg+4upx;
				margin-left: 30upx;
				color: $font-color-dark;

				text:last-child {
					font-size: $font-sm;
					color: $font-color-light;
					margin-top: 8upx;

					&.Skeleton {
						width: 220upx;
					}
				}
			}
		}

		.d-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;
		
			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
		
			&:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
			}
		}
	}
</style>
