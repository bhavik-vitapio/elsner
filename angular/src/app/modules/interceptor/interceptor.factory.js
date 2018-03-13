interceptor.$inject = ['$log','$localStorage']
function interceptor($log,$localStorage){
	let $storage = $localStorage;
	return {
		request: function(config){
			config.headers = config.headers || {};
			if ($storage.unique_id){
				config.headers['client-id'] = $storage.unique_id
			}
			return config;
		}
	}
}

export default interceptor