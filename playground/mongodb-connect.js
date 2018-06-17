const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
if (err) {
    return console.log('Unable to connect to MongoDb server');
}
console.log('Connected to MongoDB server');
// db.collection('Todos').insertOne({
//     text: 'something to do',
//     completed: true
// }, (err, result)=>{
// if(err){
//    return console.log('ubable to insert todo',  err);
// }
// console.log(JSON.stringify(result.ops, undefined, 2));
// });
db.collection('Users').insertOne({
    name: 'tomsx',
    age: 25,
    location: 'leszno'
}, (err, result)=>{
if(err){
   return console.log('ubable to insert todo',  err);
}
console.log(JSON.stringify(result.ops, undefined, 2));
});
db.close();
});