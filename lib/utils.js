exports = module.exports = {};

exports.genRandomId = function(){
  return Math.random().toString(36).replace(/[^a-z]+/g, '').slice(0,4);
};
