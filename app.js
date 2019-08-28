var express=require('express');
var path=require('path');
var hbs=require('hbs');
var mongoose=require('mongoose');
var session=require('express-session');
var passport=require('passport');
var flash=require('connect-flash');
var MongoStore=require('connect-mongo')(session)

var app=express();
var routes=require('./routes/index');
var userRoutes=require('./routes/user');

mongoose.connect('mongodb://localhost:27017/shopdb', {useNewUrlParser: true});
require('./config/passport')

app.set('view engine','hbs')
hbs.registerPartials(path.join(__dirname, '/partials' ))
app.use(express.static(__dirname + '/public')) 
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret:'mysupersecret',
    resave:'true',
    uninitialised:'true',
    saveUninitialized:'true',
    store: new MongoStore({mongooseConnection:mongoose.connection}),  //to store sessions
    cookie: {maxAge:null}
 }))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
    res.locals.login=req.isAuthenticated();
   // console.log(req.session);
    res.locals.session=req.session;  //variables created to use session object in templates
    next();
})

app.use('/user',userRoutes);
app.use('/',routes);

/*app.use(function(req,res,next){
  var err=new Error('Not found');
  err.status=404;
  next(err);
})*/

app.listen(8081);