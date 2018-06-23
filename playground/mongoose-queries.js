const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '66b2dd5fcc93fdc1c7e88e617';




User.findById(id).then((user)=>{
    if(!user){
        return console.log('user not found');
    }
    console.log(user);
}).catch((e)=>{
    console.log('incorrect id');
});