const {MongoClient}=require('mongodb');
const client= new MongoClient('mongodb://localhost:27017',{ useNewUrlParser: true })

const getdb=()=>client.connect().then(()=>{
    const db=client.db('shopdb')
    //console.log(db)
    return db;
})

const getBooks=()=>
getdb()
.then((db)=>db.collection('books'))
.then((collection)=>collection.find())
.then((cursor)=>cursor.toArray())

const insertBooks=(book)=>
getdb()
.then((db)=>db.collection('books'))
.then((collection)=>collection.insertOne(book))

module.exports={
    getBooks,
    insertBooks
}



