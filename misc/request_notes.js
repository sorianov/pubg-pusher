var request = require("request");

var options = { method: 'GET',
  url: 'https://pubgtracker.com/api/profile/pc/just____',
  headers:
   { 'cache-control': 'no-cache',
     'trn-api-key': process.env.PUBGTRACKER_API_KEY } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
