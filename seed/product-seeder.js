var Product=require('../models/product');
var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopdb')

var products= [
    new Product({
     imagePath:"https://prodimage.images-bn.com/pimages/9780545162074_p0_v2_s550x406.jpg",
     title:"Harry Potter Series",
     price:2000
    }),
    
    new Product({
        imagePath:"https://images-na.ssl-images-amazon.com/images/I/510uIcLWISL._SX327_BO1,204,203,200_.jpg",
        title:"Angels and Demons",
        price:500
       }),
    
    new Product({
        imagePath:"https://images-na.ssl-images-amazon.com/images/I/51IArD%2BInCL._SX320_BO1,204,203,200_.jpg",
        title:"The Great Gatsby",
        price:200
       }),
    
    new Product({
        imagePath:"https://images-na.ssl-images-amazon.com/images/I/51cPZA%2Bwi8L._SY498_BO1,204,203,200_.jpg",
        title:"Sherelok Holmes",
        price:500
       }),

    new Product({
        imagePath:"https://images-na.ssl-images-amazon.com/images/I/51N-QD-%2BO4L._SX325_BO1,204,203,200_.jpg",
        title:"The Phoenix",
        price:300
       }),
    
    new Product({
        imagePath:"https://images-na.ssl-images-amazon.com/images/I/51vItaP4aNL._SX323_BO1,204,203,200_.jpg",
        title:"A Girl To Remember",
        price:100
       }),
    
    new Product({
        imagePath:"https://images-na.ssl-images-amazon.com/images/I/41dr%2BAy2zjL._SX326_BO1,204,203,200_.jpg",
        title:"Fault in our Stars",
        price:224
       }),
    
    new Product({
        imagePath:"https://images-na.ssl-images-amazon.com/images/I/41YOGfaGsEL._SX324_BO1,204,203,200_.jpg",
        title:"13 Reasons Why",
        price:350
       }),
    
    new Product({
        imagePath:"https://images-na.ssl-images-amazon.com/images/I/410llGwMZGL._SX328_BO1,204,203,200_.jpg",
        title:"The Alchemist",
        price:178
       }),
    
    new Product({
        imagePath:"https://images-na.ssl-images-amazon.com/images/I/417NSfZZIWL._SX328_BO1,204,203,200_.jpg",
        title:"The Girl in Room 105",
        price:118
       }),

    new Product({
        imagePath:"https://images-na.ssl-images-amazon.com/images/I/418ClB3DZ-L._SX298_BO1,204,203,200_.jpg",
        title:"The Diary of a Young Girl",
        price:150
       }),

    new Product({
        imagePath:"https://images-na.ssl-images-amazon.com/images/I/41kd7Y23TZL._SX365_BO1,204,203,200_.jpg",
        title:"General Knowledge",
        price:128
       }),
    
    ]

    var done=0;
    for(var i=0;i<products.length;i++)
    {
        products[i].save(function(err,result){
            done++;
            if(done===products.length){
            exit();}
        })
    }

    function exit(){
        mongoose.disconnect();
    }