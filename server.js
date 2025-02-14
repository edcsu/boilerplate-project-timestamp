// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// An empty date parameter should return the current time in a JSON object with both unix key and utc key
app.get("/api", function (req, res) {
  const currentdate  = Date.now();
  res.json({ unix: currentdate, utc : new Date(currentdate).toUTCString()});
});

// date API endpoint... 
app.get("/api/:date", (req, res) => {
  const date  = req.params.date;

  if (!isNaN(Date.parse(date))) {
    const stringDate = new Date(date);
    res.json({ unix: stringDate.getTime(), utc: stringDate.toUTCString() });
  } else if (/\d{5,}/.test(date)) {
      const numberDate = parseInt(date);
      res.json({ unix: numberDate, utc: new Date(numberDate).toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
