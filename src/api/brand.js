import request from '@/utils/requestUtil'

export function getBrandDetail(id) {
	return request({
		method: 'GET',
		url: `/brand/detail/${id}`,
	})
}

export function fetchBrandProductList(params) {
	return request({
		method: 'GET',
		url: '/brand/productList',
		params:params
	})
}

export function fetchBrandRecommendList(params) {
	return request({
		method: 'GET',
		url: '/brand/recommendList',
		params:params
	})
}