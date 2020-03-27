
var redis = require('redis');
var client = redis.createClient(6379);

// client.on('connect', function() {
//     console.log('Redis client connected');
// });

// client.on('error', function (err) {
//     console.log('Something went wrong ' + err);
// });

// client.set('Test Key', 'Test Value', redis.print);
// client.get('Test Key', function (error, result) {
//     if (error) {
//         console.log(error);
//         throw error;
//     }
//     console.log('GET result ->' + result);
// });

// module1 = require('../controllers/parking.controller.js'),  
// module1.setClient(client);

// module.export = client;