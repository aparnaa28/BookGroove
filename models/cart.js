module.exports=function Cart(oldCart){
    this.items=oldCart.items||{};
    this.totalprice=oldCart.totalprice||0;
    this.totalqty=oldCart.totalqty||0;

    this.add= function add(item,id){
      
        var storedItem= this.items[id];
        if(!storedItem){
            storedItem=this.items[id]= {item:item, qty:0, price:0}
        }

        storedItem.qty++;
        storedItem.price= storedItem.item.price * storedItem.qty;
        this.totalqty++;
        this.totalprice+= storedItem.item.price;
    };

    this.reduceByOne=function(id){
        this.items[id].qty--;
        this.items[id].price -=this.items[id].item.price;
        this.totalqty--;
        this.totalprice-=this.items[id].item.price;

        if(this.items[id].qty <= 0){
            delete this.items[id]
        }
    }

    this.removeall=function(id){
        this.items[id].qty -=this.items[id].qty;
        this.items[id].price -=this.items[id].price;
        this.totalprice -=this.items[id].price;

        delete this.items[id];
    }

    this.generateArray=function(){
        var array=[];
        for(var id in this.items){
            array.push(this.items[id]);
        }

        return array;
    }
}