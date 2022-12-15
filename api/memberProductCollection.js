import request from '@/utils/requestUtil'

export function createProductCollection(data) {
	return request({
		method: 'POST',
		url: '/member/productCollection/add',
		data: data
	})
}

export function deleteProductCollection(params) {
	return request({
		method: 'POST',
		url: '/member/productCollection/delete',
		params: params
	})
}

export function fetchProductCollectionList(params) {
	return request({
		method: 'GET',
		url: '/member/productCollection/list',
		params:params
	})
}

export function productCollectionDetail(params) {
	return request({
		method: 'GET',
		url: '/member/productCollection/detail',
		params: params
	})
}

export function clearProductCollection() {
	return request({
		method: 'POST',
		url: '/member/productCollection/clear'
	})
}