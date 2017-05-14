var express = require('express');
var path = require("path")
var app = express();

app.set('port', (process.env.PORT || 5000));

function fixMonth(num) {
  switch (num) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
  }
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/:date', function (req, res) {
  var input = req.params.date;
  if (!input.includes(' ')) input = Number(input)*1000;
  var date = new Date(input);
  var unix, natural;
  
  if (!date.getTime()) {
    unix = null;
    natural = null;
  } else {
    unix = Math.floor(date.getTime() / 1000);
    natural = fixMonth(date.getMonth()+1) + " " + date.getDate() + ", " + date.getFullYear(); 
  }
  
  res.send({
    "unix": unix,
    "natural": natural
  });
})

// app.listen(8080, function () {
//   console.log('Example app listening on port 8080!');
//   //console.log(new Date("/December, 15 2015").getMonth());
// })

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});