'use strict';

class Button {
	constructor(button,$navigation,$service){
		angular.extend(this,button);
    this.$navigation = $navigation;
    this.$service = $service;
	}
	click(){
    this.$navigation.click();
		if (this.action === 'scroll'){
      if (this.$service.$state.current.name !== 'home'){
        this.$service.$state.go('home',{ section: this.target });
      } else {          
        this.$service.Scroll.scrollTo(this.target,60).then(() => {
          this.$service.$state.go(
            this.$service.$state.current.name,
            { section: this.target },
            {
              reload: false,
              notify: false 
            }
          );
        })
      }
		} else if (this.action === 'state'){
			this.params = this.params || {};
			this.$service.$state.go(this.target,this.params);
		} else if (this.action === 'href'){
      // We don't use the wrapped $location as we don't want angular being smart
      this.$service.$window.location = this.target;
    }
	}
}

class Navigation {
  constructor(buttons,$service){
    let $navigation = this;
    this.click = angular.noop;
    this.buttons = buttons.map((button) => new Button(button,$navigation,$service));
  }
  onClick(click){
    this.click = click;
  }
}

class NavigationService {
  constructor($state,$window){
    this.$state = $state;
    this.$window = $window;
  }
  create(buttons){
    return new Navigation(buttons,this)
  }
  button(button){
    return new Button(button,{ click: angular.noop },this);
  }
}

NavigationService.$inject = ['$state', '$window'];

export default NavigationService;