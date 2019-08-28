const express=require('express');
const route= express.Router();
const Cart=require('../models/cart');
const Product=require('../models/product');
const Order=require('../models/orders');
const SellBooks=require('../models/books');


route.get('/',(req,res)=>{
    res.render('home');
})


route.get('/MyBooks',(req,res)=>{

  SellBooks.find({user:req.user},function(err,books){
    if(err){
      return res.write(err);
    }
    console.log('books');
    res.render('mybooks',{books:books});
  })
  
})


route.get('/sell',(req,res)=>{
    res.render('seller')
})

route.post('/sell',(req,res)=>{
    var newbook=new SellBooks({
      user:req.user,
      email:req.user.email,
      bookname:req.body.bookname,
      authorname:req.body.authorname,
      condition:req.body.condition,
      date:req.body.date,
      price:req.body.price,
      description:req.body.description,
      image:req.body.image,
      category:req.body.category,
      language:req.body.language
    })
    newbook.save(function(err,result){
      if(err){
      console.log(err);
      }
      else{
      res.redirect('/MyBooks');
      }
    })
})


route.get('/viewbooks',(req,res)=>{

  Product.find(function(err,docs){
    var productchunks=[];
    var chunkSize=4;
    for(var i=0;i<docs.length;i+=chunkSize)
    {
      productchunks.push(docs.slice(i,i+chunkSize))
    }
    res.render('books',{products:productchunks})
  })
  })

  route.get('/add-to-cart/:id',(req,res,next)=>{
    var productId=req.params.id;
    console.log(req.session)
    var cart=new Cart(req.session.cart? req.session.cart:{});

    Product.findById(productId,function(err,product){
      if(err)
      {
        return res.redirect('/viewbooks');
      }
      
       cart.add(product,product.id);
       req.session.cart=cart;
       console.log(req.session.cart);
       res.redirect('/viewbooks');
      
    })
  })

  
  route.get('/shopping-cart',(req,res,next)=>{
    if(!req.session.cart){
      console.log(req.session.cart)
      return res.render('cart',{products:null})
    }
    var cart=new Cart(req.session.cart);
    res.render('cart',{products:cart.generateArray(),totalPrice:cart.totalprice});
  })

  route.get('/reduce/:id',(req,res)=>{
    var productId=req.params.id;
    var cart=new Cart(req.session.cart?req.session.cart:{});
    cart.reduceByOne(productId);
    req.session.cart=cart;
    res.redirect('/shopping-cart');
  })

  route.get('/remove/:id',(req,res)=>{
    var productId=req.params.id;
    var cart=new Cart(req.session.cart ? req.session.cart : {});
    cart.removeall(productId);
    req.session.cart=cart;
    res.redirect('/shopping-cart');
  })


  route.get('/payment',(req,res)=>{
    if(!req.session.cart){
      return res.redirect('cart');
    }
    var cart=new Cart(req.session.cart);
    res.render('payment',{total:cart.totalprice})
  })

  route.post('/payment',(req,res)=>{
    var cart=new Cart(req.session.cart);
    var order=new Order({
      user:req.user,
      cart:cart,
      name:req.body.name,
      address:req.body.address
    })
    order.save(function(err,result){
      req.session.cart=null;
      res.redirect('/checkout');
    })
    
  })

  route.get('/myorders',(req,res)=>{
    Order.find({user:req.user},function(err,orders){
      if(err){
        return res.write(err);
      }
      var cart;
      orders.forEach(function(order){
        cart=new Cart(order.cart);
        order.items=cart.generateArray();
      })
      res.render('myorders',{orders:orders});
    })
  })
  

  route.get('/checkout',(req,res)=>{
    res.render('checkout');
  })

  route.get('/adminlogin',(req,res)=>{
    res.render('admin/admin');
  })

  route.post('/adminlogin',(req,res)=>{
    var email=req.body.email;
    var password=req.body.password;

    if(email=="aparna28@gmail.com" && password=="aparna28")
    {
      res.redirect('/adminbooks');
    }
    else{
      res.redirect('/adminlogin');
    }
  })

  route.get('/adminlogout',(req,res)=>{
    res.redirect('/');
  })

  route.get('/adminbooks',(req,res)=>{
    SellBooks.find((err,books)=>{
      if(err){
        console.log(err);
      }
      else{
        res.render('admin/adminbooks',{books:books});
      }
    })
  })

  route.get('/adminorders',(req,res)=>{

     Order.find((err,orders)=>{
       if(err){
         console.log(err);
       }
       else{
         res.render('admin/adminorders',{orders:orders});
       }
     })
  })

  route.get('/adminusers',(req,res)=>{
    Order.find((err,orders)=>{
      if(err)
      {
        console.log(err);
      }
      else{
        console.log(orders);
        res.render('admin/adminusers',{orders:orders});
      }
    })
  })

module.exports=route

