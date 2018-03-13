import angular from 'angular';
import ngResource from 'angular-resource';

import { Resource } from './resource.service';

export default angular.module('app.resource', [ ngResource ])
  .service('Resource',Resource)
  .name;
