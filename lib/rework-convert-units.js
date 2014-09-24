'use strict'

var visit = require('rework-visit')

module.exports = function(defaultBaseFontSize) {
  return function convert(style) {
    visit(style, function(declarations) {

      var index = 0
      var length = declarations.length
      var declaration

      for (; index < length; index++) {
        declaration = declarations[index]

        if (!declaration.value || declaration.type != 'declaration') continue

        declaration.value = resolveValue(declaration.value, defaultBaseFontSize)
      }
    })
  }
}

function resolveValue(value, defaultBaseFontSize) {
  return value.replace(/\bem\([^)]+\)/g, function(em) {
    return convert(em.match(/\((\d+px)(?:\s*,\s*(\d+px))?\)/), defaultBaseFontSize)
  })
}

function convert(value, defaultBaseFontSize) {
  var rawSize = value[1]
  var size // px, em, rem, pt ?
  var rawBaseFontSize = value[2] || defaultBaseFontSize || '16px' // assume px, i have to work on that (config file?)
  var baseFontSize

  if (rawSize === parseInt(rawSize, 10)) { // handle strings without unit (px by default)
    rawSize += 'px'
  }

  size = distinguishValueUnit(rawSize) // todo: handle several units
  baseFontSize = distinguishValueUnit(rawBaseFontSize)

  return (~~((size.value / baseFontSize.value) * 1000) / 1000) + 'em'
}

function distinguishValueUnit(str) {
  var matches

  matches = /^(\d+)(.*)$/i.exec(str)
  if (matches.length != 3) {
    return 'error'
  }

  return {
    value: parseInt(matches[1], 10),
    unit: matches[2]
  }
}
