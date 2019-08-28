var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:'User'},
    email:{type:Schema.Types.String,ref:'User'},
    bookname:{type:String,required:true},
    authorname:{type:String,required:true},
    category: {type:String,required:true},
    description:{type:String,required:true},
    condition:{type:String,required:true},
    language:{type:String,required:true},
    image:{type:String,required:true},
    date:{type:String,required:true},
    price:{type:Number,required:true}
});

module.exports= mongoose.model('SellBooks',schema);