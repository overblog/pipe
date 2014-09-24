'use strict'

var _ = require('lodash')
var es = require('event-stream')
var concat = require('gulp-concat')
var rework = require('gulp-rework')

// rework tasks
var myth = require('myth')
var ielimits = require('rework-ie-limits')
var npm = require('rework-npm')
var inherit = require('rework-inherit')
var convert = require('./lib/rework-convert-units')

exports.rework = function(options) {
  options = _.defaults(options || {}, {
    fontSize: '14px',
  });

  return rework(
    npm({path: options.path}),
    myth({
      fontVariant:   false,
      hexAlpha:      false,
      import:        false,
      rebecaapurple: false,
    }),
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
