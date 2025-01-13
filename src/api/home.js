import request from '@/utils/requestUtil'

export function fetchContent() {
	return request({
		method: 'GET',
		url: '/home/content'
	})
}

export function fetchRecommendProductList(params) {
	return request({
		method: 'GET',
		url: '/home/recommendProductList',
		params:params
	})
}

export function fetchProductCateList(parentId) {
	return request({
		method: 'GET',
		url: '/home/productCateList/'+parentId,
	})
}

export function fetchNewProductList(params) {
	return request({
		method: 'GET',
		url: '/home/newProductList',
		params:params
	})
}

export function fetchHotProductList(params) {
	return request({
		method: 'GET',
		url: '/home/hotProductList',
		params:params
	})
}
