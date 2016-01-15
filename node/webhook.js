var config = require('./config');
var crypto = require('crypto');
var https = require('https');
var query = require('querystring');

// A sample message being sent to fishy
var message = JSON.stringify(
{
    command: "message",
    data: "Hello, this is a test message!"
});

console.log("Generating hash...");

// The hashing algorithm we want to use
// Can be anything supported on your system, run `openssl list-message-digest-algorithms` to see yours
var algo = 'sha512';

// Generate a HMAC hash to verify the message being sent
var hash = crypto.createHmac(algo, config.password).update(message).digest('hex');

var data =
{
    hash: algo + '=' + hash,
    payload: message
};

console.log("Sending data...");

// Send data to the url provided in the config file
https.get(config.url + '?' + query.stringify(data), function()
{
    console.log("Webhook delivered!");
    process.exit();
});
