var   School = require('./school')
    , Review = require('./review');

var SchoolSearch = function(params) {
  this.params = params;
  if(this.params) this.parseParams();
}

SchoolSearch.prototype.parseParams = function(params) {
  params = params || this.params;
  var   props = this.props = {}
      , ratings = this.ratings = {};
  ["englishName", "officialName", "companyNumber", "city"].forEach(function(e) {
    props[e] = params["kwds"];
  });
  ratings.gt = params.gt;
  ratings.lt = params.lt;
  return this;
}

SchoolSearch.prototype._propsToQueryHash = function() {
  var   queryHash = {}
      , pKeys = this.props && Object.keys(this.props);

  if(pKeys && pKeys.length) {
    var or = queryHash["$or"] = [];
    pKeys.forEach(function(e) {
      var prop = {};
      prop[e] = new RegExp(this.props[e], "i");
      or.push(prop);
    }, this);
  }
  return queryHash;
}

SchoolSearch.prototype._ratingsToQueryHash = function() {
  var queryHash = {};
  queryHash["$gte"] = parseInt(this.ratings.gt) || 0;
  queryHash["$lte"] = parseInt(this.ratings.lt) || 5;
  return queryHash;
}

SchoolSearch.prototype.find = function(cb) {
  Review.aggregate(
    {$group: {_id: "$school", avgRating: { $avg: "$rating"}}},
    {$match: {avgRating: this._ratingsToQueryHash()}},
       (function(err, reviews) {
         if(err) return cb(err, null);
         var queryHash = this._propsToQueryHash();
         queryHash._id = {$in: reviews.map(function(r) { return r._id})};
         School.find(queryHash)
                .populate("reviews")
                .exec(function(err, schools) {
                  cb(err, schools);
                });
       }).bind(this)
  );
}

SchoolSearch.modelName = "SchoolSearch";
module.exports = SchoolSearch;
