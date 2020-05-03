import Mock from 'mockjs'
import { param2Obj } from '../src/utils'
import table from './table'
import user from './user'


const mocks = [
	...user,
	...table
]
//用于前台模拟
//请谨慎使用，它将重新定义XMLHttpRequest，
//这将导致您的许多第三方库失效（例如progress事件）。
export function mockXHR() {
	// mock patch
	// https://github.com/nuysoft/Mock/issues/300
	Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
	Mock.XHR.prototype.send = function () {
		if (this.custom.xhr) {
			this.custom.xhr.withCredentials = this.withCredentials || false

			if (this.responseType) {
				this.custom.xhr.responseType = this.responseType
			}
		}
		this.proxy_send(...arguments)
	}

	function XHR2ExpressReqWrap(respond) {
		return function (options) {
			let result = null
			if (respond instanceof Function) {
				const { body, type, url } = options
				// https://expressjs.com/en/4x/api.html#req
				result = respond({
					method: type,
					body: JSON.parse(body),
					query: param2Obj(url)
				})
			} else {
				result = respond
			}
			return Mock.mock(result)
		}
	}

	for (const i of mocks) {
		Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
	}
}

// for mock server
const responseFake = (url, type, respond) => {
	return {
		url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
		type: type || 'get',
		response(req, res) {
			console.log('request invoke:' + req.path)
			res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
		}
	}
}

export default mocks.map(route => {
	return responseFake(route.url, route.type, route.response)
})
