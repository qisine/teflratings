var getArgs = function(args) {
  return Array.prototype.slice.call(args, 1);
}

module.exports = { 
  getArgs: getArgs,
}
