var express = require('express');
var dbox = require('./dropbox_util')
var app = express();



//setup server
  var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});



var key = '3hp366tm6vkyvyy'
var secret =  'mupkjd55gkg1tr8'
//use dropbox-auth-cli to get access_token: https://github.com/watson/dropbox-auth-cli
//token gets saved in ~/.config/dropbox.json
var access_token = '6JwuirAWwaQAAAAAAAATk6t0v5s3k2l6suX-LySneiyOML7QQoimKaGUps7nfHme'       


var dropbox   = dbox.app({ "app_key": key, "app_secret": secret })


var client = dropbox.client(access_token)


client.get('recipt.jpg', access_token, function(status, reply, metadata){
  require('fs').writeFile('test.jpg', reply, function () {
    console.log('file saved!');
  });
})

