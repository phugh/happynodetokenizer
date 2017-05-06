/**
 * HappyNodeTokenizer
 * v0.1.1
 *
 * A basic, Twitter-aware tokenizer.
 *
 * Help me make this better:
 * https://github.com/phugh/happynodetokenizer
 *
 * Based on HappierFunTokenizing.py - Copyright 2011, Christopher Potts
 * by: Christopher Potts, updated: H. Andrew Schwartz (www.wwbp.org)
 *
 * (C) 2017 P. Hughes
 * Licence : Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 * http://creativecommons.org/licenses/by-nc-sa/3.0/
 *
 * Default options (opts):
 *  {
 *    "output": "array",  // output end result as an "array" (default) or "string"
 *    "delim": ","        // delimiter for string outputs
 *  }
 *
 * Useage example:
 * const hnt = require('happynodetokenizer);
 * const text = "A big long string of text...";
 * let tokens = hnt(text, {"output": "array", "delim": ","});
 * console.log(tokens)
 *
 * @param {string} str  input string to tokenize
 * @param {Object} opts options
 * @return {Array|string}
 */

'use strict'
;(function () {
  const root = this
  const previous = root.tokenizer

  const hasRequire = typeof require !== 'undefined'

  let he = root.he

  if (typeof _ === 'undefined') {
    if (hasRequire) {
      he = require('he')
    } else throw new Error('happynodetokenizer requires "he" module.')
  }

  const tokenizer = (str, opts) => {
    // if there is no string return null
    if (str == null) return null
    // set default options if none are provided
    if (opts == null) {
      opts = {
        'output': 'array',
        'delim': ','
      }
    }
    // if no output type is specified default to array
    opts.output = opts.output || 'array'
    // if string output is chosen but no delimiter is given default to csv
    opts.delim = opts.delim || ','
    // ensure we're dealing with a string
    if (typeof str !== 'string') str = str.toString()
    // define regex
    const reg = new RegExp(/(?:(?:\+?[01][\-\s.]*)?(?:[\(]?\d{3}[\-\s.\)]*)?\d{3}[\-\s.]*\d{4})|(?:[<>]?[:;=8>][\-o\*\']?[\)\]\(\[dDpPxX\/\:\}\{@\|\\]|[\)\]\(\[dDpPxX\/\:\}\{@\|\\][\-o\*\']?[:;=8<][<>]?|<3|\(?\(?\#?\(?\(?\#?[>\-\^\*\+o\~][\_\.\|oO\,][<\-\^\*\+o\~][\#\;]?\)?\)?)|(?:(?:http[s]?\:\/\/)?(?:[\w\_\-]+\.)+(?:com|net|gov|edu|info|org|ly|be|gl|co|gs|pr|me|cc|us|gd|nl|ws|am|im|fm|kr|to|jp|sg))|(?:http[s]?\:\/\/)|(?:\[[a-z_]+\])|(?:\/\w+\?(?:\;?\w+\=\w+)+)|<[^>]+>|(?:@[\w_]+)|(?:\#+[\w_]+[\w\'_\-]*[\w_]+)|(?:[a-z][a-z'\-_]+[a-z])|(?:[+\-]?\d+[,\/.:-]\d+[+\-]?)|(?:[\w_]+)|(?:\.(?:\s*\.){1,})|(?:\S)/, 'gi')
    // fix HTML elements
    const unicode = he.decode(str)
    // tokenize!
    const tokens = unicode.match(reg)
    if (opts.output === 'string') {
      // make the tokens array into a string and return
      return tokens.join(opts.delim)
    } else {
      // return the tokens array
      return tokens
    }
  }

  tokenizer.noConflict = function () {
    root.tokenizer = previous
    return tokenizer
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = tokenizer
    }
    exports.tokenizer = tokenizer
  } else {
    root.tokenizer = tokenizer
  }
}).call(this)
