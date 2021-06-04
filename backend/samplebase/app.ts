const fs = require('fs')


// koa
const koaBody = require('koa-body');
const Koa = require('koa');
const cors = require('@koa/cors');
const KoaJWT = require('koa-jwt')


const app = new Koa();

// JSON web token middleware
const raw = fs.readFileSync('samplebase/api/jwt_config.json');
const secret = JSON.parse(raw).secret;
// app.use(KoaJWT({ secret: secret }).unless({ path: [/^\/login/] }));


// get api routes
const id = require('./api/id');
const sampleSet = require('./api/sampleSets');
const sample = require('./api/sample');


// connecting to MongoDB with mongoose
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const db = mongoose.connection;
const mongo_host = process.env.MONGODB || 'localhost'
const connection = mongoose.connect(`mongodb://${mongo_host}:27017/=samplebase`, {useNewUrlParser: true, useUnifiedTopology: true});
const storage = new GridFsStorage({ db: connection });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to MongoDB')
 
});



// set routes and listen to localhost:33913
app.use(cors())
app.use(koaBody());
app.use(id.routes())
app.use(sampleSet.routes())
app.use(sample.routes())

app.listen(33913); //33913 '/api' gesplittet im HA-Proxy

module.exports = storage