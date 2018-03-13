'use strict';

import angular from 'angular';

class Scroll {
  constructor($q,$window,$timeout,smoothScroll){
    this.$q = $q;
    this.$window = $window;
    this.$timeout = $timeout;
    this.smoothScroll = smoothScroll;

    this.scrollTop = 0;
    this.bindScroll();
  }
  bindScroll(){
    let $service = this;
    let _document = this.$window.document;
    let _main = _document.getElementById('main');
    angular.element(_main).bind('scroll',function(){
      $service.onScroll(this.scrollTop);
    });
  }
  onScroll(scrollTop){
    this.scrollTop = scrollTop;
    if (this.timeout) this.$timeout.cancel(this.timeout);
    this.timeout = this.$timeout(() => this.$timeout(),10,false);
  }
  scrollTo(elementId,offset){
    return this.$q((resolve,reject) => {    
      offset = offset || 20;  
      let options = {
          offset: offset,
          duration: 400,
          containerId: 'main',
          easing: 'easeInQuad',
          callbackAfter: resolve
      }
      try {
        let element = document.getElementById(elementId);
        this.smoothScroll(element, options);
      } catch(error) {
        reject(error)
      }
    });
  }
}

Scroll.$inject = ['$q','$window','$timeout','smoothScroll']

export default Scroll;
