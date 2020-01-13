require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const model = require('./model.js');
const gcm = require('gcm');
const cors = require('cors'); 

app.use(cors());

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

    res.header('Access-Control-Allow-Origin: *');

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

app.get('/customers/', async(req, res, next)=>{
    try {
        var rs = await model.getCustomer(db);
        res.send(rs)
    } catch (error) {
        res.send("error");
    }
});

app.put('/customer/:id', async(req, res, next)=>{
    var id = req.params.id;
    var company = req.body.company;
    var address = req.body.address;

    if(id && company && address){
        var data = {
            company : company,
            address : address
        };
      
    }
   
    try {
        var rs = await model.updateCompany(db,id,data);
        res.send({ok:true});
    } catch (error) {
        res.send({ok:false,error:error.message});
    }
});

app.delete('/customer/:id', async (req, res, next)=>{
    var id = req.params.id;
    try {
        if(id)
        {
            var rs = await model.deleteCustomer(db,req.params.id);
            res.send({ok:true});
        }
        else
        {
            res.send({ok:false,error:'Invalid',code: HttpStatus.INTERNAL_SERVER_ERROR});
        }
        
    } catch (error) {
        res.send({ok:false,error:error.message});
    }
})

app.post('/customer/', async(req, res, next)=>{
    var company = req.body.company;
    var address = req.body.address;
    var data = {
        company : company,
        address : address
    };

    try {
        var rs = await model.addCompany(db, data)
        res.send({ok:true})
    } catch (error) {
        res.send({ok:false,error:error.message});
    }
})

app.listen(3000);