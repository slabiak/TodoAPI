const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
if (err) {
    return console.log('Unable to connect to MongoDb server');
}
console.log('Connected to MongoDB server');
// db.collection('Todos').find().toArray().then((docs)=>{
// console.log('Todos');
// console.log(JSON.stringify(docs,undefined,2));
// }, (err)=> {
//     console.log('unable to fetch todos', err)
// })

db.collection('Users').find({name: 'bazyl'}).toArray().then((docs)=>{
    console.log('Todos');
    console.log(JSON.stringify(docs,undefined,2));
    }, (err)=> {
        console.log('unable to fetch todos', err)
    })
});