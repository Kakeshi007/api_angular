require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const model = require('./model.js');
const gcm = require('gcm');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
}); 


var db = require('knex')({
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
  });

app.get('/bank/', async(req, res, next)=>{
    try {
        var rs = await model.getBankAll(db);
        res.send({ok:true,rs:rs});
    } catch (error) {
        res.send({ok:false, error:error.message});
    }
});

app.get('/bank/:id', async(req, res, next)=>{
    try {
        var rs = await model.getBankById(db, req.params.id);
        res.send({ok:true, rs:rs})
    } catch (error) {
        res.send({ok:false, error:error.message});
    }
});


app.listen(3000);