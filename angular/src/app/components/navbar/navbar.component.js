'use strict';

class Navbar {
  constructor($q,$window,$element,$timeout,$state,Navigation){
    this.$q = $q;
  	this.$window = $window;
  	this.$element = $element;
    this.$timeout = $timeout;
  	this.$state = $state;
    this.Navigation = Navigation;
  }
  $onInit(){
    this.menu = false;
    this.home = this.Navigation.button({
      text: 'Home',
      action: 'scroll',
      target: 'landing-header'
    });
    this.navigation = this.Navigation.create([
      {
        text: `How it works`,
        action: 'scroll',
        target: 'service-benefits'
      },
      {
        text: `People Say`,
        action: 'scroll',
        target: 'customer-reviews'
      },
      {
        text: `For Business`,
        action: 'scroll',
        target: 'business-repairs'
      },
      {
        text: `Blog`,
        action: 'href',
        target: '/blog'
      },
      {
        text: `FAQ`,
        action: 'href',
        target: 'https://www.repairly.co.uk/blog/faq'
      },
      {
        text: `Contact Us`,
        action: 'state',
        target: 'hello'
      }
    ]);
    this.navigation.onClick(() => this.menu = false );
    let navbar = angular.element(this.$element.find('div'));
    this.height = navbar[0].clientHeight;
    let section = this.$state.params.section;
    if (section && section.length){
      let button = this.navigation.buttons.find((button) => (button.target === section));
      if (button) this.$timeout(() => button.click());
    }
  }
  get state() {
    if (this.fixed) {
      return 'fixed';
    }
  	if (angular.element(this.$window)[0].innerWidth < 768){
  		return 'fixed';
  	} else {		
	  	if (true){
        return 'fixed'
      } else {
	  		this.menu = false;
	  		return 'relative'
	  	}
  	}
  }
  repairNow(){
  	this.scrollTop().then(() => this.focusPostcode());
  }
  toggleMenu(){
  	this.menu = !this.menu;
  }
}

Navbar.$inject = ['$q','$window','$element','$timeout','$state','Navigation']

export const navbar = {
  controller: Navbar,
  templateUrl: require('ngtemplate!./navbar.html'),
  bindings: {
    hideNavigation: '<',
    hideRepairButton: '<',
    invert: '<',
  	focusPostcode: '&',
    fixed: '<'
  }
}
  