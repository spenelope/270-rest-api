const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const port = 443;
const app = express();
const fs = require('fs')
const https = require('https')

let invalidLoginAttempts=0;



app.use(express.static('public'));
app.use(bodyParser.json());

//app.listen(port, ()=>{});
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
    passphrase: "P@ssw0rd"
  }, app).listen(port, () => {
    console.log('Listening...')
  });

app.get('/', (req,res)=>{
    res.send("Hello browser");
});

app.post('/login',(req,res) => {
    console.log(JSON.stringify(req.body));
    if (invalidLoginAttempts>=5){
        res.status(401);//unauthorized
        res.send("Max attempts reach");
    }
    // console.log("Here is the password " + req.body.password)
    // let password = md5(req.body.password) 

    else if (req.body.userName ==="penelopesanchez" && md5(req.body.password) ==="161ebd7d45089b3446ee4e0d86dbcf92"){
        res.send("Welcome!")
    }
    else{
        // invalidLoginAttempts=invalidLoginAttempts+1;
        console.log(invalidLoginAttempts+"invalid attemps")
        invalidLoginAttempts++;
        res.status(401);//unauthorized
        res.send("Who are you?");
    }
})
