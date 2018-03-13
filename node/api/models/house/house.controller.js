'use strict';
var Controller = require('../../utils/controller');
var Helper = require('../../utils/helper');
var co = require('co');
var _= require('lodash');

module.exports = function(House){
  class HouseController extends Controller {
    constructor(){
	   super(House);
	}
	
    get(req,res) {
      co(function* () {
        let hosues = yield this.Model.find(req.query).exec();
        return hosues;
      }.bind(this))
      .then(Helper.respondWithResult(res))
      .catch(Helper.handleError(res));
    };
	
	getAll(req,res) {
	console.log("Enter in a getAll() Method:"+JSON.stringify(req.query));
	co(function* () {
        let hosues = yield this.Model.find({"person":req.params.person}).exec();
        return hosues;
      }.bind(this))
      .then(Helper.respondWithResult(res))
      .catch(Helper.handleError(res));
    };
	
	
	create(req,res) {
	console.log("Enter in a create() Method:"+JSON.stringify(req.query));
    co(function* () {
	 let object = new this.Model();
	 for (let prop in req.body){
        if(req.body[prop] instanceof Array){
          object[prop] = req.body[prop].map(entity=>{return entity})
          delete req.body[prop];
        }
      }
      object = _.extend(object,req.body);
	  console.log("object>>>>>>>>>"+JSON.stringify(object));
      let response = yield object.save();
      return response;
    }.bind(this))
    .then(Helper.respondWithResult(res,201))
    .catch(Helper.handleError(res));
  };
  }
  return HouseController;
}