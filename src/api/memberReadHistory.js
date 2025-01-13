import request from '@/utils/requestUtil'

export function createReadHistory(data) {
	return request({
		method: 'POST',
		url: '/member/readHistory/create',
		data: data
	})
}

export function fetchReadHistoryList(params) {
	return request({
		method: 'GET',
		url: '/member/readHistory/list',
		params: params
	})
}

export function clearReadHistory() {
	return request({
		method: 'POST',
		url: '/member/readHistory/clear'
	})
}