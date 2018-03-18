/**
 * HappyNodeTokenizer
 * v0.3.0
 *
 * A basic, Twitter-aware tokenizer.
 *
 * Help me make this better:
 * https://github.com/phugh/happynodetokenizer
 *
 * Based on HappierFunTokenizing.py - Copyright 2011, Christopher Potts
 * by: Christopher Potts, updated: H. Andrew Schwartz (www.wwbp.org)
 *
 * (C) 2017-18 P. Hughes
 * Licence : Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 * http://creativecommons.org/licenses/by-nc-sa/3.0/
 *
 * Default options (opts):
 *  {
 *    "output": "array",  // output tokens as an "array" (default) or "string"
 *    "delim": ","        // delimiter for string outputs (default = ",")
 *  }
 *
 * Usage example:
 * const hnt = require("happynodetokenizer");
 * const text = "A big long string of text...";
 * const opts = {"output": "array", "delim": ","}
 * const tokens = hnt(text, opts);
 * console.log(tokens)
 *
 * @param {string} str    string to tokenize
 * @param {Object} opts   options object
 * @return {(Array|string)}   array of tokens or deliminated string
 */

(function() {
  'use strict';
  const he = require('he');

  /**
   * @function tokenizer
   * @param  {string} str  string to tokenize
   * @param  {Object} opts options object
   * @return {(Array|string)} array of tokens or deliminated string
   */
  const tokenizer = (str, opts) => {
    // if there is no string return null
    if (!str) {
      console.error('HappyNodeTokenizer needs input! Returning null.');
      return null;
    }
    // ensure we're dealing with a string
    if (typeof str !== 'string') str = str.toString();
    // set default options if none are provided
    if (!opts) {
      opts = {
        'output': 'array',
        'delim': ',',
      };
    }
    // if no output type is specified default to array
    opts.output = opts.output || 'array';
    // if string output is chosen but no delimiter is given default to comma
    opts.delim = opts.delim || ',';
    // define regex
    const reg = new RegExp(/(?:(?:\+?[01][\-\s.]*)?(?:[\(]?\d{3}[\-\s.\)]*)?\d{3}[\-\s.]*\d{4})|(?:[<>]?[:;=8>][\-o\*\']?[\)\]\(\[dDpPxX\/\:\}\{@\|\\]|[\)\]\(\[dDpPxX\/\:\}\{@\|\\][\-o\*\']?[:;=8<][<>]?|<3|\(?\(?\#?\(?\(?\#?[>\-\^\*\+o\~][\_\.\|oO\,][<\-\^\*\+o\~][\#\;]?\)?\)?)|(?:(?:http[s]?\:\/\/)?(?:[\w\_\-]+\.)+(?:com|net|gov|edu|info|org|ly|be|gl|co|gs|pr|me|cc|us|gd|nl|ws|am|im|fm|kr|to|jp|sg))|(?:http[s]?\:\/\/)|(?:\[[a-z_]+\])|(?:\/\w+\?(?:\;?\w+\=\w+)+)|<[^>]+>|(?:@[\w_]+)|(?:\#+[\w_]+[\w\'_\-]*[\w_]+)|(?:[a-z][a-z'\-_]+[a-z])|(?:[+\-]?\d+[,\/.:-]\d+[+\-]?)|(?:[\w_]+)|(?:\.(?:\s*\.){1,})|(?:\S)/, 'gi'); // eslint-disable-line
    // fix HTML elements
    const unicode = he.decode(str);
    // tokenize!
    const tokens = unicode.match(reg);
    // if there's nothing there return null
    if (tokens.length <= 0 || !tokens) {
      if (opts.output.match(/string/gi)) {
        console.warn('HappyNodeTokenizer: no tokens found. Returning empty string.');
        return '';
      } else {
        console.warn('HappyNodeTokenizer: no tokens found. Returning empty array.');
        return [];
      }
    }
    // else return what was requested
    if (opts.output.match(/string/gi)) {
      // make the tokens array into a string and return
      return tokens.join(opts.delim);
    } else {
      // return the tokens array
      return tokens;
    }
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = tokenizer;
    }
    exports.tokenizer = tokenizer;
  } else {
    global.tokenizer = tokenizer;
  }
})();
