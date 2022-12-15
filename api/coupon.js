import request from '@/utils/requestUtil'

export function fetchProductCouponList(productId) {
	return request({
		method: 'GET',
		url: `/member/coupon/listByProduct/${productId}`,
	})
}

export function addMemberCoupon(couponId) {
	return request({
		method: 'POST',
		url: `/member/coupon/add/${couponId}`,
	})
}

export function fetchMemberCouponList(useStatus) {
	return request({
		method: 'GET',
		url: '/member/coupon/list',
		params:{useStatus:useStatus}
	})
}