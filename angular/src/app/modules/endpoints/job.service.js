import angular from 'angular';
import moment from 'moment';

export class Job {
  constructor($http,$filter,Resource) {

    let Job = Resource('jobs',{},{
      fun: {
        method: 'GET',
        isArray: false,
        params: {
          id: 'fun'
        }
      },
      add: {
        method: 'POST',
        isArray: false,
        params: {
          id: 'add'
        }
      },
      status: {
        method: 'POST',
        params: {
          controller: 'status'
        }
      },
      nextStatus: {
        method: 'GET',
        params: {
          controller: 'next-status'
        }
      },
      stripe: {
        method: 'POST',
        params: {
          id: 'stripe'
        }
      }
    });

    Job.pickupTimeRange = 1 * 60 * 60 * 1000;
    Job.pickupTimeRanges = [
      '8am - 9am',
      '9am - 10am',
      '10am - 11am',
      '11am - 12pm',
      '12pm - 1pm',
      '1pm - 2pm',
      '2pm - 3pm',
      '3pm - 4pm',
      '4pm - 5pm',
      '5pm - 6pm',
      '6pm - 7pm'
    ];
    Job.dropoffTimeRange = 2 * 60 * 60 * 1000;

    Job.statuses = [
      'Order confirmed',
      'On the way',
      'Picked up',
      'At engineer',
      'Repaired',
      'Being returned',
      'Dropped off',
      'Invoiced',
      'Payment taken',
      'Cancelled',
      'Unfixable',
      'Refunded',
      'Card declined'
    ]

    Job.average = function(){
      let data = {};
      var request = $http.get(`${Job.endpoint}/average`);
      data.$promise = request;
      request.then((response) => angular.extend(data,response.data));
      request.catch((error) => console.log(error));
      return data;
    }

    Job.reviews = function(){
      let data = {};
      var request = $http.get(`${Job.endpoint}/reviews`);
      data.$promise = request;
      request.then((response) => angular.extend(data,response.data));
      request.catch((error) => console.log(error));
      return data;
    }

    Job.estimate = function(pickupTime){
      let estimate = {};
      let average = Job.average();
      pickupTime = (new Date(pickupTime)).valueOf() + Job.pickupTimeRange / 2
      estimate.$promise = average.$promise;
      average.$promise.then(() => {
        let dropoffTime = pickupTime + (average.time || Job.pickupTimeRange);
        average.range = average.range || Job.dropoffTimeRange;
        angular.extend(estimate,{
          from: new Date( dropoffTime - average.range / 2 ),
          to: new Date( dropoffTime + average.range / 2 )
        });
      })
      return estimate;
    };

    Job.geocode = function(address){
      let data = {};
      var request = $http({method: 'GET', url:`${process.env.API_URL}/api/geocode`, params: {address: address}});
      data.$promise = request;
      request.then((response) => angular.extend(data,response.data))
      request.catch((error) => console.log(error))
      return data;
    };

    Job.vacant = function(params){
      let data = [];
      let extra_day = Job.pickupTimeRanges.reduce((extra_day, range) => {
        extra_day[range] = true;
        return extra_day;
      }, {});
      var request = $http({method: 'GET', url:`${process.env.API_URL}/api/jobs/vacant`, params: params});
      data.$promise = request;
      request.then((response) => angular.extend(data,response.data.concat(extra_day)))
      request.catch((error) => console.log(error))
      return data;
    };

    Job.prototype.price = function(){
      let repair_price = this.repairs.reduce((price, repair) => {
        if(repair.is_rerepair) return price;
        let issues = repair.issues || [];
        let issue_price = issues.reduce((price, issue) => {
          return price + issue.price;
        }, 0)
        return price + issue_price;
      }, 0)
      let upsell_price = 0
      if(this.upsell_items && this.upsell_items.length){
        upsell_price = this.upsell_items.reduce((price, item) => {
          return price + item.price
        }, 0)
      }
      return upsell_price + repair_price
    }

    Job.prototype.$transform = function(){
      this.pickup_time = moment(this.pickup_time)
    }

    Job.prototype.updateFun = function() {
      let endpoint = `${process.env.API_URL}/api/jobs/fun/${this.fun_id}`
      var request = $http.put(endpoint,this.$prepare());
      request.then((response) => console.log(response))
      request.catch((error) => console.error(error))
      return request;
    }

    Job.prototype.createCustomerComment = function(comment) {
      let endpoint = `${process.env.API_URL}/api/jobs/fun/${this.fun_id}/comments`
      var request = $http.post(endpoint,comment);
      request.then((response) => this.comments.push(response.data))
      request.catch((error) => console.error(error))
      return request;
    }

    Job.prototype.updateCustomerComment = function(comment) {
      let endpoint = `${process.env.API_URL}/api/jobs/fun/${this.fun_id}/comments/${comment._id}`
      var request = $http.put(endpoint,comment);
      request.then((response) => console.log(response))
      request.catch((error) => console.error(error))
      return request;
    }

    /**
      * Format Personal Details
      * Only return if line1 and postcode in pickup address
      */
    Job.prototype.formatPersonalDetails = function(){
      this.personal = this.personal || {};
      let details = [ this.personal.name, this.personal.phone, this.personal.email ];
      if (details.every((item) => item && item.length)){    
        return details.join(', ');
      }
    };

    /**
      * Format Job Address
      * Only return if line1 and postcode in pickup address
      */
    Job.prototype.formatAddress = function(){
      let pickupAddress = this.pickup_address || {};
      if (pickupAddress.line1 && pickupAddress.postcode){    
        return [
          pickupAddress.company,
          pickupAddress.line1,
          pickupAddress.line2,
          pickupAddress.city,
          pickupAddress.postcode
        ].filter((item) => item && item.length).join(', ');
      }
    };

    /**
      * Format Job Pickup Time
      * Only return if there is a pickup time
      */
    Job.prototype.formatTime = function(){
      if(this.pickup_time){    
        let pickupTime = new Date(this.pickup_time);
        let output = pickupTime.isToday() ? 'Today' : $filter('date')(pickupTime,'MMM d');
        if(this.pickup_time_range) output += ' between ' + this.pickup_time_range;
        return output;
      }
    }

    /**
      * Format Job Device
      * Only return something if device selected
      */
    Job.prototype.formatDevice = function(){
      this.repairs[0].device = this.repairs[0].device || {};;
      this.repairs[0].device.colour = this.repairs[0].device.colour || {};
      let device = [this.repairs[0].device.colour.name, this.repairs[0].device.brand, this.repairs[0].device.model];
      if (device.every((item) => item && item.length)){
        return device.join(' ');
      }
    }

    /**
      * Format Job Issues
      * Only return if there are issues selected
      */
    Job.prototype.formatIssues = function(){
      this.repairs[0].issues = this.repairs[0].issues || [];
      let issues = this.repairs[0].issues.map(issue=>issue.issue);
      if (issues && issues.length){
        return issues.join(', ');
      }
    }

    return Job;

  }

}

Job.$inject = ['$http','$filter','Resource']

