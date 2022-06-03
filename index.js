const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});
var Subscriber = [];
// Subscribe Route
app.post("/subscribe", (req, res) => {
  console.log(req.query.name);
  console.log(req.body);
  const subscription = req.body;  

  Subscriber.push({
    sw: subscription, 
    name: req.query.name
  });
 
  res.status(201).json({});
});

app.get('/ads',function(req,res){
  Subscriber.forEach(element => {
    console.log(element.name);
    let payload = JSON.stringify({ title: `Hi ! ${element.name}` });
    webpush
    .sendNotification(element.sw, payload)
    .catch(err => console.error(err));
  });
  res.status(201).json({});
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
