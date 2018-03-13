
interceptorInit.$inject = ['$sessionStorage','$localStorage','Utilities'];
export function interceptorInit($sessionStorage,$localStorage,Utilities){
	if(!$localStorage.unique_id){
		if ($sessionStorage.unique_id){
			console.log('using session storage token');
			$localStorage.unique_id = $sessionStorage.unique_id;
		} else {
			console.log('creating new local storage token');
	    $localStorage.unique_id = Utilities.unique_id;
		}
  }
}

interceptorConfig.$inject = ['$httpProvider'];
export function interceptorConfig($httpProvider) {
  $httpProvider.interceptors.push('interceptor');
}
