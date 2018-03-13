'use strict';


class FooterComponent {
  constructor($state,Navigation){
    this.$state = $state;
    this.navigation = Navigation.create([
      {
        text: 'Book a repair',
        action: 'scroll',
        target: 'landing-header'
      },
      {
        text: 'Careers',
        action: 'state',
        target: 'careers'
      },
      {
        text: 'Terms & Conditions',
        action: 'state',
        target: 'terms-and-conditions'
      },
      {
        text: `FAQ`,
        action: 'href',
        target: 'https://www.repairly.co.uk/blog/faq'
      },
      {
        text: 'Our Team',
        action: 'state',
        target: 'team'
      },
      {
        text: 'Corporate accounts',
        target: 'business-repairs',
        action: 'scroll'
      }
    ]);
    this.socials = [
      {
        icon: 'instagram',
        link: 'https://www.instagram.com/repairly.co.uk/'
      },
      {
        icon: 'facebook',
        link: 'https://www.facebook.com/repairly'
      },
      {
        icon: 'twitter',
        link: 'https://twitter.com/repairly'
      },
      {
        icon: 'youtube',
        link: 'https://www.youtube.com/channel/UCJf7V9KRgYazWaO1KoAPdtg'
      }
    ]
    this.socials.forEach((social) => social.icon = `/images/social/${social.icon}.svg`);
  }
}
FooterComponent.$inject = ['$state','Navigation']

export const footer = {
  controller: FooterComponent,
  templateUrl: require('ngtemplate!./footer.html'),
  bindings: {
    focusPostcode: '&'
  }
}
  