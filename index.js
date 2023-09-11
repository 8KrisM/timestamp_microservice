var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/:date?", function(req, res) {
  const paramDate = req.params.date;
  let date = new Date();
  if(!req.params.date) res.json({ unix: Number(date.getTime()), utc: date.toUTCString() });
  if (!isNaN(paramDate)) date = new Date(Number(req.params.date));
  else date = new Date(req.params.date);
  if (date.toString() === "Invalid Date") res.json({ error: date.toString() });
  else res.json({ unix: Number(date.getTime()), utc: date.toUTCString() });
});


var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
