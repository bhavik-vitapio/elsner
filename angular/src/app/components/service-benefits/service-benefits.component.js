'use strict';

class ServiceBenefits {
  constructor(){
    this.createBenefits();
  }
  createBenefits(){
    this.benefits = [{
        icon: 'device',
        header: `First, tell us the problem.`,
        body: `Enter your postcode and give us an idea of what’s wrong with your device.`
    },
    {
        icon: 'bike',
        header: `We’ll pick your device up`,
        body: `Tell us the most convenient time to meet you, and one of our reps will race to you and pick up your device.`
    },
    {
        icon: 'clock',
        header: `We’ll bring your device back the same day.`,
        body: `Sit back and relax. We’ll take your device to our trusted engineers and will be back with you in a flash. `
    },
    {
        icon: 'spanner',
        header: `We only charge you when the repair is done.`,
        body: `Rest assured. We’ll only charge your card for the repair once you’ve got your device back and you’re completely happy.`
    }];
    this.benefits.forEach((benefit) => benefit.icon = `/images/icons/${benefit.icon}.svg`)
  }
}

ServiceBenefits.$inject = [];

export const serviceBenefits = {
  controller: ServiceBenefits,
  templateUrl: require('ngtemplate!./service-benefits.html')
}
