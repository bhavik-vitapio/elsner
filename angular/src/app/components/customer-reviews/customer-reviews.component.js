'use strict';

class CustomerReviews {
  constructor($interval){
    this.$interval = $interval;
    this.cols = this.twitterCardCols ? this.twitterCardCols : 2;
    this.tweetIds = this.tweetIds ? this.tweetIds : [];
    this.maxTweets = this.maxTweets ? this.maxTweets : -1;
    this.rotateInterval = this.rotateInterval ? this.rotateInterval : -1;
    this.twitterWidgetOptions = {
      cards: 'hidden',
      conversation: 'none'
    }
    console.log(angular.copy(this.tweetIds));
    this.tweets = this.tweetIds.map(tweetId => ({ id: tweetId }));
  }

  startInterval(){
    this.$interval(() => {
      this.tweets.push(this.tweets.shift());
      this.initGrid();
    }, this.rotateInterval)
  }

  initGrid(){
    // initialise array with this.cols empty arrays inside it 
    let grid = [[]];

    for (var index = 0; index < this.tweets.length; index++) {
      if(index >= this.maxTweets) break;
      let tweet = this.tweets[index];
      if(index && index % this.cols == 0){
        grid.push([]);
      }
      grid[grid.length-1].push(tweet);
    }
    this.grid = grid;
    console.log(this.grid);
  }

  $onInit(){
    this.initGrid();
    if (this.rotateInterval > 0) {
      this.startInterval();
    }
  }
}

CustomerReviews.$inject = ['$interval'];

export const customerReviews = {
  controller: CustomerReviews,
  templateUrl: require('ngtemplate!./customer-reviews.html'),
  bindings: {
    twitterCardCols: '<',
    tweetIds: '<',
    maxTweets: '<',
    rotateInterval: '<'
  }
}
  