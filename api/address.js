import request from '@/utils/requestUtil'

export function fetchAddressList() {
	return request({
		method: 'GET',
		url: '/member/address/list'
	})
}

export function fetchAddressDetail(id) {
	return request({
		method: 'GET',
		url: `/member/address/${id}`
	})
}

export function addAddress(data) {
	return request({
		method: 'POST',
		url: '/member/address/add',
		data:data
	})
}

export function updateAddress(data) {
	return request({
		method: 'POST',
		url: `/member/address/update/${data.id}`,
		data:data
	})
}

export function deleteAddress(id) {
	return request({
		method: 'POST',
		url: `/member/address/delete/${id}`
	})
}

