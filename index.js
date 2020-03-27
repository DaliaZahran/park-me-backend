const express = require('express');
// const { mongoose } = require('./startup/db.js');
const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// const cors = require('cors');
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
require('./startup/routes.js')(app);


const port = process.env.PORT || 8080;
app.listen(port,function () {
    console.log('server working')
});



// var corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200,
//   }
// app.use(cors(corsOptions));

// app.use(express.static('public'));