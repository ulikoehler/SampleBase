var router = require("koa-router")();
const argon2 = require('argon2');
const jwt_config = require('jwt_config.json');
const jwt = require('jsonwebtoken');


router.get("/api/logout", async ctx => {
  try {
     
    
    } catch (err) {
      // internal failure
      ctx.throw(500,'Internal Server Error');
    }
});

router.get("/api/login", async ctx => {
    try {
        // read user data
        const raw = fs.readFileSync('users.json');
        const users = JSON.parse(raw);
        
        // check if username exisitung AND password match
        // DO NOT DARE TO SET AN OWN SALT! --> https://github.com/ranisalt/node-argon2/wiki/Options
        const user =  users.find(async u => u.username === ctx.body.username && await argon2.verify(u.password,ctx.body.password));

        if(!user) ctx.throw(401,'Authorization Failed');

        // create JSON Web token
        const token = jwt.sign({ sub: user.username, role: user.role }, jwt_config.secret, { expiresIn: '7d' });

        ctx.body = {status: 'ok', token: token}

      
      } catch (err) {
        // internal failure
        ctx.throw(500,'Internal Server Error');
      }
});

module.exports = router;
