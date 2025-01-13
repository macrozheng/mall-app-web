import request from '@/utils/requestUtil'

export function createBrandAttention(data) {
	return request({
		method: 'POST',
		url: '/member/attention/add',
		data: data
	})
}

export function deleteBrandAttention(params) {
	return request({
		method: 'POST',
		url: '/member/attention/delete',
		params: params
	})
}

export function fetchBrandAttentionList(params) {
	return request({
		method: 'GET',
		url: '/member/attention/list',
		params:params
	})
}

export function brandAttentionDetail(params) {
	return request({
		method: 'GET',
		url: '/member/attention/detail',
		params: params
	})
}

export function clearBrandAttention() {
	return request({
		method: 'POST',
		url: '/member/attention/clear'
	})
}