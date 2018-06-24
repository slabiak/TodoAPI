const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];


beforeEach((done)=> {
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(()=>done());
});

describe('POST /todos', ()=>{
    it('should create a new todo', (done)=>{
        var text = 'test todo text';

        request(app)
        .post('/todos')
        .send({text: text})
        .expect(200)
        .expect((res) =>{
            expect(res.body.text).toBe(text);
        })
        .end((err,resp) =>{
            if(err){
                return done(err);
            }
Todo.find({text}).then((todos)=>{
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe(text);
    done();
}).catch((e) => done(e));
        });
    });

//
it('should not create todo with invalid body data', (done)=>{
    var text = '';
    
            request(app)
            .post('/todos')
            .send({})
            .end((err,resp) =>{
                if(err){
                    return done(err);
                }

    Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
    }).catch((e) => done(e));
            });
});



});

//
describe('GET /todo/:id', ()=>{
    it ('should return todo docs', (done)=>{
    request(app)
    .get(`/todo/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
    });


    it('should return 404 if todo not found', (done)=>{
        request(app)
        .get(`/todo/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });
    

    it('should return 404 for non-object ids', (done)=>{
        request(app)
        .get(`/todo/12345`)
        .expect(404)
        .end(done);
    });
    });


    describe('DELETE /todos/:id', ()=>{

        it('should remove a todo', (done)=>{
            var hexId = todos[1]._id.toHexString();

            request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res)=>{
                if(err){
                    return done(err);
                }

                Todo.findById(hexId).then((todo)=>{
                    expect(todo).toNotExist();
                    done();
                }).catch((e)=>{
                    done(e);
                });
            });
        });

        it('should return 404 if todo not found', (done)=>{
            request(app)
            .delete(`/todo/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
        });

        it('should return 404 if object id is invalid', (done)=>{
            request(app)
            .delete(`/todo/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
        });
    });



    describe('PATCH /todos/:id', () =>{
        it('should update the todo', (done) => {
            var hexId = todos[0]._id.toHexString();
            var newText = 'new text here';
            request(app)
            .patch(`/todos/${hexId}`)
            .send({text: newText,
            completed: true})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(newText);
                expect(res.body.todo.completed).toBeTruthy();
              //  expect(res.body.todo.completedAt).
            
            }).end(done);

        });


        it('should clear completedAt when todo is not completed', (done) =>{
            var hexId = todos[0]._id.toHexString();
            var newText = 'new text here 2';

            request(app)
            .patch(`/todos/${hexId}`)
            .send({text: newText,
            completed: false})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(newText);
                expect(res.body.todo.completed).toBeFalsy();
                expect(res.body.todo.completedAt).toNotExist();
              //  expect(res.body.todo.completedAt).
            
            }).end(done);
        });
    });