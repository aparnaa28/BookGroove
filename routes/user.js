const express=require('express');
const route= express.Router();
const csrf=require('csurf');
const passport=require('passport')

const csrfProtection=csrf();  //setting the csrf middleware
route.use(csrfProtection);


route.get('/',function(req,res,next){
  next();
})

route.get('/signup',(req,res)=>{
    var messages=req.flash('error')
    res.render('user/signup',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length >0})
  })
  
  route.post('/signup',passport.authenticate('local.signup',{
    successRedirect:'/user/signin',
    failureRedirect:'/user/signup',
    failureFlash:true
  })
  )
  
 
  route.get('/signin',(req,res)=>{
    var messages=req.flash('error')
    res.render('user/signin',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length >0})
  })
  
  route.post('/signin',passport.authenticate('local.signin',{
    successRedirect:'/sell',
    failureRedirect:'/user/signin',
    failureFlash:true
  })
  )

  route.get('/sell',(req,res)=>{
    res.render('seller')
})

  route.get('/logout',(req,res,next)=>{
      req.logOut();
      res.redirect('/');
  })
  

  module.exports=route

 