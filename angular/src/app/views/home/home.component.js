class Home {
  constructor($sce,$state,$location,$mdToast,ngMeta,Dialog){
    this.$sce = $sce;
    this.$state = $state;
    this.$location = $location;
    this.Dialog = Dialog;
    this.$mdToast = $mdToast;

  }

  $onChanges(changes){
    if (changes.landing && this.landing && this.landing.html){
      this.landing.safe_html = this.$sce.trustAsHtml(this.landing.html);
    }
  }
}

Home.$inject = ['$sce','$state','$location','$mdToast','ngMeta','Dialog']

export default {
  templateUrl: require('ngtemplate!./home.html'),
  controller: Home,
  bindings: {
    'landing': '<'
  }
}
