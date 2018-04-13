# easy-file-share
Easy File Share with React.
누구나! 쉽게!(?!) 파일을 공유할 수 있도록 도와주는 서비스? 프로그램? 입니다.  
~~물론..쉽진않지만..db설정이라던가...커맨드라던ㄱ...~~  
여튼... 열심히 개발중 입니다...!

# Install
git Clone.

# Usage


# Config

### server/config.js
```
{
    port:Number,
    socket:Number,
    socketClient:String,
    mongoDB:String,
    TRACKERS:Array, 
}
```
### Example
```
{
    port:25252,
    socket:9000,
    socketClient:"http://localhost:9000/",
    mongoDB:"mongodb://localhost/",
    TRACKERS:[
        ["udp://tracker.leechers-paradise.org:6969"],
        ["udp://tracker.opentrackr.org:1337"],
        ["udp://explodie.org:6969"],
        ["udp://tracker.empire-js.us:1337"],
        ["wss://tracker.btorrent.xyz"],
        ["wss://tracker.openwebtorrent.com"],
        ["wss://tracker.fastcast.nz"],
    ]
}
```

###


## Stack
### Client

#### React
>react-dropzone  
react-masonry-component  
react-motion  
react-redux  
react-router-dom  
react-transition-group  
reactstrap  

#### HTTP Request
>axios  

#### Redux
>redux-thunk  
immutable  
redux-devtools-extension  
### Server

#### Koa web framework
>koa-bodyparser  
koa-helmet  
koa-multer  
koa-passport  
koa-redis  
koa-router  
koa-session  
koa-static  
koa-webpack  
koa-webpack-middleware  

#### Image Processing System
>gm - GraphicsMagick  

#### Database connect
>promise-mysql  

#### Session
>redis

#### Authentication
>Passport  
passport-local  

#### uuidgenerator
>uuid  

### Development Environment(?)
#### webpack
>webpack-dev-server  
babel-loader  
node-sass  
sass-loader  
style-loader  
css-loader
autoprefixer  
postcss-loader  

#### babel
>babel-plugin-transform-object-rest-spread  
babel-preset-es2015  
babel-preset-react  
