import dontGo from 'dont-go';

appInit.$inject = ['$rootScope','$sessionStorage','Utilities'];
export function appInit($rootScope,$sessionStorage,Utilities){
  if(!$sessionStorage.unique_id){
    $sessionStorage.$reset();
    $sessionStorage.unique_id = Utilities.unique_id;
  }
};

logging.$inject = ['$provide','$logProvider'];
export function logging($provide,$logProvider){
  $logProvider.debugEnabled(true);
  $provide.decorator('ngTweetLogVerbose', ['$delegate',function($delegate) {
    return false;
  }]);
}

routing.$inject = ['$locationProvider'];
export function routing($locationProvider) {
  $locationProvider.html5Mode(true);
}

metaTags.$inject = ['ngMetaProvider'];
export function metaTags(ngMetaProvider) {
  ngMetaProvider.setDefaultTitle('Repairly | Mobile Phone, iPhone and Tablet Repair in London by Repairly')
  ngMetaProvider.setDefaultTag('description','Phone and tablet repair in London. Repairly will collect and return your phone, fixed, on the same day. 12-month warranty on all phone and tablet repairs.')
  ngMetaProvider.setDefaultTag('keywords','tech repair,phone repair,tablet repair,repair,screen repair,cracked screen,mobile repair')
}

export function dontGoRun(){
  dontGo({
    title: 'Baby come back - Repairly',
    faviconSrc: '/favicon-alt.ico',
    timeout: 5000 //5 seconds
  });
}

metaTagsRun.$inject = ['ngMeta'];
export function metaTagsRun(ngMeta) {
	ngMeta.init();
}


schemaRun.$inject = ['$rootScope','Schema'];
export function schemaRun($rootScope, Schema) {
  Schema.download();
  $rootScope.Schema = Schema;
}

mdThemeConfig.$inject = ['$mdThemingProvider'];
export function mdThemeConfig($mdThemingProvider) {
  // Create a pallet so that all buttoms are pink
  $mdThemingProvider.definePalette('repairlyPink', {
    '50': 'ff0050',
    '100': 'ff0050',
    '200': 'ff0050',
    '300': 'ff0050',
    '400': 'ff0050',
    '500': 'ff0050',
    '600': 'ff0050',
    '700': 'ff0050',
    '800': 'ff0050',
    '900': 'ff0050',
    'A100': 'ff0050',
    'A200': 'ff0050',
    'A400': 'ff0050',
    'A700': 'ff0050',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
    'contrastLightColors': undefined
  });
  // Setup pallet with theme
  $mdThemingProvider
    .theme('repairlyTheme')
    .primaryPalette('repairlyPink', { 'default': '500' })
  // Configure repairly theme as 
  $mdThemingProvider.setDefaultTheme('repairlyTheme'); 
}
