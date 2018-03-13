import angular from 'angular';
import ngStorage from 'ngstorage';;

import {
	interceptorInit,
	interceptorConfig
} from './interceptor.config';

import interceptor from './interceptor.factory';

let module = angular
	.module('app.interceptor', [
		ngStorage.name
	])
  .run(interceptorInit)
  .config(interceptorConfig)
  .factory('interceptor',interceptor)

export default module;