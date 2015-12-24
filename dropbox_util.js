var request = require("request")
var qs      = require("querystring")
var path    = require("path")

exports.app = function(config){
  var root   = config.root  || "sandbox"
  var helpers = require("./helpers")(config)

  return {
    root: root,

    client: function(options){
      var options = options
      return {

        get: function(path, args, cb){
         
          //url: https://content.dropboxapi.com/1/files/auto/<path>
          var url = helpers.url({
            hostname: "content.dropboxapi.com", 
            action: "files",
            path: path
          })

          var args = {
            "method": "GET",
            "url": url,
             "headers": { "content-type": "application/x-www-form-urlencoded",
                           "Authorization": "Bearer " + options
                        },
            "encoding": null
          }
          
          return request(args, function(e, r, b) {
            console.log("e:" + r.statusCode)
            if (e) {
               cb(null, null, null);
            } else {
              var headers = (r.headers['x-dropbox-metadata'] !== undefined) ? helpers.parseJSON(r.headers['x-dropbox-metadata']) : {};
              cb(r.statusCode, b, headers);
            }
          })
        }

      }  
    }  
  }
}