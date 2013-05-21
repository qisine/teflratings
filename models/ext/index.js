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
    return updateParent(targetModel, "$push", cb);
  }
}

var removeFromParent = function(targetModel) {
  return function(cb) {
    updateParent(targetModel, "$pull", cb);
  }
}

module.exports.parentSync = function(targetModel) {
  targetModel = targetModel || "Parent";
  return function(schema) {
    schema.methods["addTo" + targetModel] = addToParent(targetModel);
    schema.methods["removeFrom" + targetModel] = removeFromParent(targetModel);
  }
}
