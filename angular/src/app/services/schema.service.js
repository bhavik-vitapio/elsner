import angular from 'angular';

class Schema {
  constructor(Job){
    this.Job = Job;
    this.schema = {};
    this.script = '';
    this.update({
      '@context': 'http://schema.org/',
      '@type': 'WebPage',
      'name': 'Repairly',
      'image': 'https://www.repairly.co.uk/logo.png',
      'aggregateRating': {
        '@type': 'AggregateRating',
        'worstRating': 1,
        'bestRating': 10,
        'ratingValue': 9,
        'reviewCount': 1034
      }
    })
  }
  update(schema){
    angular.extend(this.schema,schema);
    this.script = JSON.stringify(this.schema);
  }
  download(){
    let reviews = this.Job.reviews();
    reviews.$promise.then(() => {
      let top_reviews = reviews.top_reviews.slice(0,2);
      this.update({
        'aggregateRating': {
          '@type': 'AggregateRating',
          'worstRating': 1,
          'bestRating': 10,
          'ratingValue': reviews.rating_value,
          'reviewCount': reviews.review_count
        },
        'reviews': top_reviews.map((review) => ({
          '@type': 'Review',
          'author': review.name,
          'datePublished': review.date.split('T')[0],
          'itemReviewed': {
            '@type': 'Product',
            'name': review.repair
          },
          'reviewRating': {
            '@type': 'Rating',
            'worstRating': 1,
            'bestRating': 10,
            'ratingValue': review.score
          },
          'reviewBody': review.text
        }))
      })
    });
    reviews.$promise.catch((error) => {
      console.log('Could not download reviews',error);
    });
  }
}

Schema.$inject = ['Job'];

export default Schema;