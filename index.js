var fs          = require('fs');
var loaderUtils = require('loader-utils');
var request     = require("request");

module.exports = function(content) {
  this.cacheable && this.cacheable();
  var callback = this.async();

  if(!callback) return content;

  var query = loaderUtils.getOptions(this);
  var config = loaderUtils.getLoaderConfig(this, "krakenio") || {};

  if(!query.auth) {
    callback(new Error('No kraken.io auth setting presented'));
    return content;
  }

  var formData = {
    data: JSON.stringify(query),
    file: fs.createReadStream(this.resourcePath),
  };

  request.post({
    url: "https://api.kraken.io/v1/upload",
    strictSSL: false,
    formData: formData
  }, function (err, res, body) {
    if (err) {
      return callback(err);
    }

    var resp = JSON.parse(body);
    request.get({
      url: resp.kraked_url,
      strictSSL: false,
      encoding: null
    }, function(err, res, file){
      callback(null, file);
    });
  });
};