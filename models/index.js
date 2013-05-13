var fs = require("fs");

fs.readdirSync("./models").forEach(function(file) {
  var components = file.split('.');
  if(!~components.indexOf("index") && components && components.length > 1 && components[components.length - 1] === "js") {
    var model = require('./' + file);
    module.exports[model.modelName] = model;
  }
});
