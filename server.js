const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const port = 443;
const app = express();
const fs = require('fs')
const https = require('https')
app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/', (req,res)=>{
    res.send("Hello browser");
});
app.post('/login',(req,res) => {
    console.log(JSON.stringify(req.body));
    console.log("Here is the password " + req.body.password)
    if (req.body.userName =="spenelope" && md5(req.body.password) =="161ebd7d45089b3446ee4e0d86dbcf92"){
        res.send("Welcome!")
    }
    else{
        res.send("Who are you?")
    }
})
//app.listen(port, ()=>{});
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
    passphrase: "P@ssw0rd"
  }, app).listen(443, () => {
    console.log('Listening...')
  });