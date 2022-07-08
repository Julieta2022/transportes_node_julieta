var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config(); //para que cargue los datos del archivo .env. NO requiere que se cree una variable para dotenv, porque no se la llama abajo a traves de app.use, sino que el dotenv requiere una función

var session = require('express-session');

var indexRouter = require('./routes/index'); //routes/index.js
var nosotrosRouter = require('./routes/nosotros'); //routes/nosortros.js
var serviciosRouter = require('./routes/servicios'); //routes/servicios.js
var galeriaRouter = require('./routes/galeria'); //routes/galeria.js
var novedadesRouter = require('./routes/novedades'); //routes/novedades.js
var contactoRouter = require('./routes/contacto'); //routes/contacto.js
var loginRouter = require('./routes/admin/login'); //routes/admin/login.js
var adminRouter = require('./routes/admin/novedades'); //routes/admin/novedades.js



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret:'qwertyuiop123456',//valor random, es un dato que necesita la sesión es necesario acordarselo. Se guarda en la memoria del servidor.
    cookie: {MaxAge:null},// para indicar el tiempo que queremos q dure la sesión abierta. 1000*60 por ejemplo
    resave:false,
    saveUninitialized:true
}))

secured = async(req,res,next) => {
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario) {
      next();
    } else{
      res.redirect('/admin/login')
    }
  }catch(error){
    console.log(error)
  }
}

app.use('/', indexRouter);
app.use('/nosotros', nosotrosRouter);
app.use('/servicios', serviciosRouter);
app.use('/galeria', galeriaRouter);
app.use('/novedades', novedadesRouter);
app.use('/contacto', contactoRouter);
app.use('/admin/login', loginRouter);
app.use ('/admin/novedades', secured,adminRouter); //aqui se pone el secured porque para que pase a la página de novedades necesito autenticar y autorizar primero

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
