`use strict`;

///////////////////////////////////////////////////

// webserver setting.
const port = 25253; 
// config json file load.
const config = require('./config.json');

///////////////////////////////////////////////////

// node modules.
const path = require('path');
const fs = require('fs');
// koa modules.
const Koa = require('koa');
const koaHelmet = require('koa-helmet');
const koaRouter = require('koa-router');
const passport = require('koa-passport');
const pp_setting = require('./passport')(passport,'userid','userpw');
const koaServe = require('koa-static');
const koaSession = require('koa-session');
const redisStore = require('koa-redis');
const koaParser = require('koa-bodyparser');
const koaMulter = require('koa-multer');
// multer setting.
const uploads_directory = path.resolve(__dirname + "/../uploads/");
const files_directory = path.resolve(__dirname + "/../uploads/files/");
const thumbnails_directory = path.resolve(__dirname + "/../uploads/thumbnails/");
// uuid v5
const crypto = require('crypto');
const uuidv5 = require('uuid/v5');

// database
const querynyaa = require('./query');

const app = new Koa();
app.use(koaHelmet());
const router = new koaRouter();

// webpack Dev Setting.
const webpack = require('webpack');
const devMiddleware = require("koa-webpack-middleware").devMiddleware;
const hotMiddleware = require("koa-webpack-middleware").hotMiddleware;
const webpack_config = require('../webpack.config');
var webpack_compile = webpack(webpack_config);
app.use(devMiddleware(webpack_compile,{
    noInfo: true,
    publicPath: webpack_config.output.publicPath
}));

const sessionConfig = {
    key: 'koa:sess',
    maxAge: 60*360*600,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    store:new redisStore()
};

app.keys = [config.session_secret];
app.use(koaParser({formLimit:"1024mb"}));
app.use(koaSession(sessionConfig,app));
app.use(passport.initialize());
app.use(passport.session());

function LoginCheckMiddleware(ctx,next){
    if(ctx.isAuthenticated()){
        return next();
    }else{
        ctx.status = 403;
    }
}
router.post('/login',passport.authenticate('local'), (ctx,next) => {
    ctx.body = {
        status:"success"
    }
})

router.post('/auth', LoginCheckMiddleware, (ctx,next) => {
    ctx.body = {
        status:"success",
        userid:ctx.state.user.userid
    }
})

app.use(koaServe(path.resolve(__dirname + '/../dist/'),{maxAge:200}));
app.use(router.routes());
// page404.html load
const page404 = fs.readFileSync((path.resolve(__dirname + '/../dist/index.html')),'utf8');
// Error page Setting.
app.use(async (ctx,next) => {
    switch (ctx.status){
        case 404:
            ctx.status = 404;
            ctx.body = page404;
        break;
    }
})
app.listen(port);