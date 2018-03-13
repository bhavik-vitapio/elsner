'use strict';

let mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;
mongoose.Promise = Promise;

var HouseSchema = new mongoose.Schema({
  type: String,
  colour: String,
  person:{type: Schema.Types.ObjectId, ref: 'Person',required: 'Person is required!'}
}, {
  usePushEach: true
});

module.exports = mongoose.model('House', HouseSchema);
