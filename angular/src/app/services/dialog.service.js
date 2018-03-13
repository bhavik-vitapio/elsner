import angular from 'angular';

class Dialog {
  constructor($rootScope, $mdDialog){
    this.$rootScope = $rootScope;
    this.$mdDialog = $mdDialog;
   }
  createController(input){
    var $service = this;
    input = input || {};
    DialogController.$inject = ['$scope', '$mdDialog'];
    function DialogController($scope, $mdDialog) {
      angular.extend($scope,input);
      $scope.hide = $service.$mdDialog.hide;
      $scope.cancel = $service.$mdDialog.cancel
      $scope.answer = function(answer) {
        $service.$mdDialog.hide(answer);
      };
    }
    return DialogController;
  }
  alert(alert){
    console.log('show alert',alert);
    alert.ok = alert.ok || 'OK';
    let _alert = this.$mdDialog.alert(alert);
    return this.$mdDialog.show(_alert).finally(() => _alert = undefined);
  }
  confirm(obj){
    let _confirm = this.$mdDialog.confirm()
          .title(obj.title)
          .textContent(obj.text)
          .ok("Yes")
          .cancel("No");
    return this.$mdDialog.show(_confirm).finally(() => _confirm = undefined);
  };
  handle(title,error){
    let message = error.message || error.data.message;
    return this.alert({
      title: title,
      textContent: message
    });
  }
  custom(dialog){
    var config = {
      attachTo: angular.element(document.body),
      controller: this.createController(dialog.scope),
      targetEvent: dialog.targetEvent,
      template:`${dialog.template}`,
      size: dialog.size || 'sm',
      clickOutsideToClose: !(dialog.noOutsideClose || false),
      escapeToClose: true,
      focusOnOpen: true,
      hasBackdrop: true
    }
    return this.$mdDialog.show(config);
  }
  hide(){
    return this.$mdDialog.hide();
  }
}

Dialog.$inject = ['$rootScope', '$mdDialog'];

export default Dialog;