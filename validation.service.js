const Joi = require('@hapi/joi');
// prevent xss, see: https://www.regextester.com/96339
// note: do not use global (g) flag for regex with joi. see breaking changes: https://github.com/hapijs/joi/issues/1615
const xssSafe = /(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script|style(\s*)=|(<\s*)meta/i;
// create validation scheme - see: https://www.npmjs.com/package/@hapi/joi
const scheme = Joi.object().keys({
  text: Joi.string().regex(xssSafe).min(3).max(4000).required()
});


exports.validate = (obj) => {
  return scheme.validate(obj);
};

exports.scheme = scheme;

const result = exports.validate({hi: "a"});
console.log(result);
