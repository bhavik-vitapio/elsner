'use strict';

class LandingHeadlines {
  constructor($scope){
  	this.showVideo = false;
  	this.headlines = [
  		{
  			title: 'Backed by',
  			icons: ['techstars-logo','virgin-media-logo']
  		},
  		{
  			title: 'As featured in',
  			icons: ['the-times-logo']
  		},
  		{
  			icons: ['5-stars'],
  			lines: [
  				'Delighting 1,000\'s of Londoners.',
  				'Five-star Google Reviews'
  			]
  		},
			{
				icons: ['youtube-icon'],
				click: () => { this.showVideo = !this.showVideo; },
				lines: [
					'Want to know more?',
					'Click to watch'
				]
			}
  	];
  	this.headlines.forEach((headline) => {
  		headline.icons = headline.icons.map((icon) => require(`./images/${icon}.png`))
  	});
		$scope.$on('youtube.player.ended', ($event, player) => {
			this.showVideo = false;
		});
  }
}

LandingHeadlines.$inject = ['$scope'];

export const landingHeadlines = {
  controller: LandingHeadlines,
  templateUrl: require('ngtemplate!./landing-headlines.html')
}
  