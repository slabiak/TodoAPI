const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
if (err) {
    return console.log('Unable to connect to MongoDb server');
}
console.log('Connected to MongoDB server');
//deleteMany
// db.collection('Todos').deleteMany({text: 'isc z bazylem'}).then((res)=>{
//     console.log(res);
// })


//deleteOne

// db.collection('Todos').deleteOne({text: 'isc z bazylem'}).then((res)=>{
//     console.log(res);
// })
// findOneAndDelete

// db.collection('Todos').findOneAndDelete({completed: false}).then((res)=>{
//     console.log(res);
// })

// db.collection('Users').deleteMany({name: 'bazyl'}).then((res)=>{
//     console.log(res);
// })
db.collection('Users').deleteOne({_id: new ObjectID('5b2564570875f72f709a6e25')}).then((res)=>{
    console.log(res);
})
});