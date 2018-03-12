const express=require("express");
const bodyParser= require("body-parser");
const mongoose= require("mongoose");
const path = require('path');
const cors= require('cors');

const routes= require("./routes/route.js");

const app= express();

                                                                    // DATABASE CONNECTION
mongoose.connect("mongodb://admin:admin@ds211558.mlab.com:11558/an");
mongoose.Promise=global.Promise;

                                                                        // Middleware
app.use(cors({
  origin: 'http://localhost:4200'
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/'));
app.use('/api', routes);

app.get('*', (req, res) =>
{
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.use(function (err,req,res,next)
{
  res.status(422).send({error: err.message});
});

app.get('/',function(req,res){
  res.status(200).send({done:"Done with it"});
})

process.env.jwtsecret = '$2a$06$GXmQiERBvYRGD91bIJLWRO2m4WGUpj7IRuSuve3pZ3B5rRtLIzm2G';

app.listen(process.env.PORT||3000,function ()
{
  console.log("*you are listeninig for request*");
});
