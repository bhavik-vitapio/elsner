class RepairlyButton {
  constructor(){
    this.size = this.size || 'default';
    this.color = this.color || 'default';
    this.width = this.width || 'initial'; 
    this.display = this.display || 'inline'; 
    this.position = this.position || 'default';
  }
  getStyles(){
    let styles = [];
    styles.push(this.ngClass());
    styles.push(`btn-repairly-size-${this.size}`);
    styles.push(`btn-repairly-width-${this.width}`);
    styles.push(`btn-repairly-color-${this.color}`);
    styles.push(`btn-repairly-display-${this.display}`);
    styles.push(`btn-repairly-position-${this.position}`);
    if (this.unavailable){
      styles.push('btn-repairly-unavailable');
    }
    return styles.join(' ');
  }
}

RepairlyButton.$inject = [];

export const repairlyButton = {
  controller: RepairlyButton,
  templateUrl: require('ngtemplate!./repairly-button.html'),
  transclude: true,
  bindings: {
    ngClass: '&',
    unavailable: '<',
    position: '@',
    display: '@',
    color: '@',
    width: '@',
    size: '@',
  }
}
  