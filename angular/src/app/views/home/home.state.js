function state($stateProvider) {
  function createState(customParams){

    controller.$inject = ['$scope','$landing'];
    function controller($scope,$landing){
      $scope.landing = $landing;
    };

    let title = ($landing) => $landing.metaTitle || $landing.h1;
    title.$inject = ['$landing'];

    let description = ($landing) => $landing.metaDescription || $landing.h2;
    description.$inject = ['$landing'];

    let keywords = ($landing) => $landing.metaKeywords;
    keywords.$inject = ['$landing'];

    return angular.extend(customParams,{      
      controller: controller,
      template: '<home landing="landing"></home>',
      resolve: {
        $landing: ['$state', '$stateParams', '$location', 'Landing', 'KeenLog','ngMeta', ($state,$stateParams,$location,Landing,KeenLog,ngMeta) => {
          let promise = Landing.init($stateParams).$promise;
          promise.then((page) => {
            if(page.metaDescription) ngMeta.setTag('description', page.metaDescription)
            if(page.metaKeywords) ngMeta.setTag('keywords', page.metaKeywords)
            if(page.metaTitle) ngMeta.setTitle(page.metaTitle)
            console.log(`Got ${page.category.name} landing page`)
          })
          promise.catch(() => {
            KeenLog.pageNotFound($location.absUrl());
            $state.go('home-error',{ code: 404 });
          });
          return promise;
        }]
      },
      data: {
        meta: {
          disableUpdate: true
        }
      }
    })

  };

  $stateProvider
    .state('home', {
      url: '/?section',
      template: '<home></home>',
      meta: {
        title: 'Mobile Phone, iPhone and Tablet Repair in London by Repairly',
        description: 'Phone and tablet repair in London. Repairly will collect and return your phone, fixed, on the same day. 12-month warranty on all phone and tablet repairs.',
        keywords: 'tech repair,phone repair,tablet repair,repair,screen repair,cracked screen,mobile repair'
      }
    })
    .state('home-error', {
      url: '/{code:[0-9]{3}}?location',
      template: '<home></home>',
      resolve: {
        code: ['$stateParams', ($stateParams) => Number($stateParams.code)],
        location: ['$stateParams', ($stateParams) => $stateParams.location || 'https://www.repairly.co.uk']
      },
      meta: {
        
      }
    })
    .state('home-category', createState({
      url: '/:category'
    }))
    .state('home-subcategory', createState({
      url: '/:category/:subcategory'
    }))
}

state.$inject = ['$stateProvider'];

export default state;