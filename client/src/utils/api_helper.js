import LocalStorage from '../utils/local_storage'

function getAPIHeaders(withToken) {
	let headers = {} 
	headers['Content-Type'] =  'application/json'

	if(withToken) {
		headers['Authorization'] = `BEARER ${LocalStorage.getAccessToken()}`
	}

	return headers
}

export default {
	getAPIHeaders
} 
