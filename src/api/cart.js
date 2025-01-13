import request from '@/utils/requestUtil'

export function addCartItem(data) {
	return request({
		method: 'POST',
		url: '/cart/add',
		data: data
	})
}

export function fetchCartList() {
	return request({
		method: 'GET',
		url: '/cart/list'
	})
}

export function deletCartItem(params) {
	return request({
		method: 'POST',
		url: '/cart/delete',
		params:params
	})
}

export function updateQuantity(params) {
	return request({
		method: 'GET',
		url: '/cart/update/quantity',
		params:params
	})
}

export function clearCartList() {
	return request({
		method: 'POST',
		url: '/cart/clear'
	})
}