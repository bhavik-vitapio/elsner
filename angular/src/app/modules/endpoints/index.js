import angular from 'angular';

import resource from '../resource';

import { Job } from './job.service';
import { Repair } from './repair.service';
import { Device } from './device.service';
import { Landing } from './landing.service';
import { Postcode } from './postcode.service';
import { Customer } from './customer.service';
import { UpsellItem } from './upsell-item.service';
import { User } from './user.service';

let module = angular
	.module('app.endpoints', [ resource ])
	.service('Job',Job)
	.service('Repair',Repair)
	.service('Device',Device)
	.service('Landing',Landing)
	.service('Postcode',Postcode)
	.service('Customer',Customer)
	.service('User',User)
	.service('UpsellItem',UpsellItem)
  .name;

export default module;