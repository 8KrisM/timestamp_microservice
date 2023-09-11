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
  let date;
  if (!isNaN(paramDate)) date = new Date(Number(req.params.date));
  else date = new Date(req.params.date);
  if (date.toString() === "Invalid Date") res.json({ err: date.toString() });
  else res.json({ unix: date.getTime(), utc: date });
});


var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
