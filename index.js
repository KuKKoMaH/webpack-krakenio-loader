var fs          = require('fs');
var loaderUtils = require('loader-utils');
var request     = require("request");

module.exports = function(content) {
  this.cacheable && this.cacheable();
  var callback = this.async();

  if(!callback) return content;

  var query = loaderUtils.parseQuery(this.query);
  var config = loaderUtils.getLoaderConfig(this, "krakenio") || {};

  if(!config.api_key || !config.api_secret) {
    callback(new Error('No kraken.io auth setting presented'));
    return content;
  }

  query.auth = {
    api_key: config.api_key,
    api_secret: config.api_secret
  };
  query.wait = true;

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