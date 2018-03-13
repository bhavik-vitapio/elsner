// Angular dependencies
import angular from 'angular';
import angularStorage from 'ngstorage';
import angularAnimate from 'angular-animate';
import angularMessages from 'angular-messages';
import angularMaterial from 'angular-material';
import angularUiRouter from 'angular-ui-router';
import ngMeta from 'ng-meta';
ngMeta.name = 'ngMeta'
import ngSanitize from 'angular-sanitize'

import angularYoutubeEmbed from 'angular-youtube-embed';

// Angular Twitter Widget
import angularTwitterWidget from 'ngtweet';
angularTwitterWidget.name = 'ngtweet';

// Load config
import './app.scss';
import {
	appInit,
	logging,
	routing,
	metaTags,
	sixpackRun,
	stripeRun,
	metaTagsRun,
	schemaRun,
	oneSignalRun,
	dontGoRun,
	loadRun,
	mdThemeConfig,
} from './app.config';

// Utilities
import './utilities.js';

// Local Modules
import endpoints from './modules/endpoints';
import interceptor from './modules/interceptor';

// Load Components
import { navbar } from './components/navbar';
import { repairTimeCounter } from './components/repair-time-counter';
import { landingHeadlines } from './components/landing-headlines';
import { serviceBenefits } from './components/service-benefits';
import { customerReviews } from './components/customer-reviews';
import { businessRepairs } from './components/business-repairs';
import { repairlyDetails } from './components/repairly-details';
import { repairlySchema } from './components/repairly-schema';
import { repairlyButton } from './components/repairly-button';
import { strapline } from './components/strapline';
import { footer } from './components/footer';

// Load services
import DateUtil from './services/date-util.service';
import Dialog from './services/dialog.service';
import Schema from './services/schema.service';
import Scroll from './services/scroll.service';
import Utilities from './services/utilities.service';
import Navigation from './services/navigation.service';

// Load Views
import { homeComponent, homeState } from './views/home';

// console.log(uiRouterMetatags)

export default angular.module('app', [
  	angularAnimate,
  	angularMessages,
  	angularMaterial,
  	angularUiRouter,
    ngSanitize,
  	ngMeta.name,
  	angularStorage.name,
  	angularYoutubeEmbed,
  	angularTwitterWidget.name,
  	endpoints,
  	interceptor
  ])

  .run(appInit)
  .config(logging)
  .config(routing)
  .config(metaTags)

  .run(metaTagsRun)
  .run(schemaRun)
  .run(dontGoRun)
  .run(loadRun)
  .config(mdThemeConfig)

  .component('navbar',navbar)
  .component('repairTimeCounter',repairTimeCounter)
  .component('landingHeadlines',landingHeadlines)
  .component('serviceBenefits',serviceBenefits)
  .component('customerReviews',customerReviews)
  .component('businessRepairs',businessRepairs)
  .component('repairlyDetails',repairlyDetails)
  .component('repairlyButton',repairlyButton)
  .component('repairlySchema',repairlySchema)
  .component('strapline',strapline)
  .component('footer',footer)

  .config(homeState).component('home',homeComponent)

  .service('DateUtil',DateUtil)
  .service('Dialog',Dialog)
  .service('Schema',Schema)
  .service('Scroll',Scroll)
  .service('Utilities',Utilities)
  .service('Navigation',Navigation)
