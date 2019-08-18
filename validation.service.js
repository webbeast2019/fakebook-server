const Joi = require('@hapi/joi');
// prevent xss, see: https://www.regextester.com/96339
// note: do not use global (g) flag for regex with joi. see breaking changes: https://github.com/hapijs/joi/issues/1615
const xssSafe = /(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script|style(\s*)=|(<\s*)meta/i;
// create validation scheme - see: https://www.npmjs.com/package/@hapi/joi
const scheme = Joi.object().keys({
  _id: Joi.string().alphanum(),
  image: Joi.string(),
  text: Joi.string().regex(xssSafe, {invert:true}).min(3).max(4000).required(),
});

exports.scheme = scheme;

exports.validate = (obj) => {
  const result =  scheme.validate(obj);
  if(result.error) {
    result.errorMessages = extractErrorMessages(result.error);
  }
  return result;
};

function extractErrorMessages(err) {
  return err.details.map(item => {
    console.log(item);
    if(item.type.includes('regex')) {
      return `"${item.context.key}" is invalid`;
    } else {
      return  item.message;
    }
  })
}

