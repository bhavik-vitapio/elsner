'use strict';

let mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;
mongoose.Promise = Promise;

var PersonSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  houses:[{type: Schema.Types.ObjectId, ref: 'House'}]
}, {
  usePushEach: true
});

module.exports = mongoose.model('Person', PersonSchema);
