var request = require('request')
var argv = require('argv');

var authKey = '<<CHANGE HERE>>'
var apiUrl = 'https://fcm.googleapis.com/fcm/send'

argv.option([
  {
  	name: 'endpoint',
  	short: 'e',
  	type : 'string',
  	description :'pushを送信する先のエンドポイントを指定します',
  	example: "'node pushMessage.js --endpoint=value' or 'node pushMessage.js -e value'"
  }
]);
var arg = argv.run()
var endpoint = arg.options.endpoint

if ( endpoint ){
  var options = {
    url: apiUrl,
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Authorization':'key=' + authKey
    },
    json: true,
    form: {
      "to" : endpoint
    }
  }

  request(options, function (error, ret, body) {
    if (error){
      console.error('push send error')
      console.log(error)
    } else {
      console.log('push send done')
      console.dir(body)
    }
  })
} else {
  console.log('endpointを指定して下さい')
}
