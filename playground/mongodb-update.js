const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
if (err) {
    return console.log('Unable to connect to MongoDb server');
}
console.log('Connected to MongoDB server');

// db.collection('Todos').findOneAndUpdate({
//     _id : new ObjectID('5b26069e10982f73cd1618f3')
// },{
//     $set: {
//         completed: true
//     }
// },
// {
//     returnOriginal: false
// }
// ).then((res)=>{
//     console.log(res);
// });
db.collection('Users').findOneAndUpdate({
    _id : new ObjectID('5b2602a410982f73cd161791')
},{
    $set: {
        name: 'Tomasz'
    },
    $inc: {
        age: 1
    }
},
{
    returnOriginal: false
}
).then((res)=>{
    console.log(res);
});
});