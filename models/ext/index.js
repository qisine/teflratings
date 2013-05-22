var updateParent = function(targetModel, method, cb) {
  var   update = {}
      , updateData = {};
  updateData[this.constructor.modelName.toLowerCase() + "s"] = this.id;
  update[method] = updateData;
  targetModel.findOneAndUpdate({_id: this[targetModel.modelName.toLowerCase()]}, update, function(err, updatedModel) {
    cb(err, updatedModel);
  });
}

var addToParent = function(targetModel) {
  return function(cb) {
    updateParent.call(this, targetModel, "$push", cb);
  }
}

var removeFromParent = function(targetModel) {
  return function(cb) {
    updateParent.call(this, targetModel, "$pull", cb);
  }
}

module.exports.parentSync = function(targetModel) {
  return function(schema) {
    schema.methods["addTo" + targetModel.modelName] = addToParent(targetModel);
    schema.methods["removeFrom" + targetModel.modelName] = removeFromParent(targetModel);
  }
}
