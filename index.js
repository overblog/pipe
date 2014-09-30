'use strict'

var _ = require('lodash')
var es = require('event-stream')
var autoprefixer = require('gulp-autoprefixer')
var concat = require('gulp-concat')
var rework = require('gulp-rework')

// rework tasks
var calc = require('rework-calc')
var color = require('rework-color-function')
var media = require('rework-custom-media')
var ielimits = require('rework-ie-limits')
var inherit = require('rework-inherit')
var macro = require('rework-macro')
var npm = require('rework-npm')
var vars = require('rework-vars')
var convert = require('./lib/rework-convert-units')

exports.autoprefixer = autoprefixer

exports.rework = function(options) {
  options = _.defaults(options || {}, {
    fontSize: '14px',
  });

  return rework(
    npm({path: options.path}),
    vars(),
    macro,
    calc,
    color,
    media(),
    inherit(),
    convert(options.fontSize),
    ielimits
  )
}

exports.rename =
exports.concat = concat

exports.merge = function(streams) {
  return es.merge.apply(null, streams)
}
