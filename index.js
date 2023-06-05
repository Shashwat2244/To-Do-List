const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;

const db = require('./config/mongoose');
const Todo = require('./models/list');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


app.post('/create-item', function(req,res){

    Todo.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }).then(newTodo => {
        console.log('**********', newTodo);
        res.redirect('back');
    }).catch(err => {
        console.log('Error in creating a Todo', err);
    })
})

app.get('/delete-item', function(req,res){
    let id = req.query.id;
    Todo.findByIdAndDelete(id).then(() => {
        return res.redirect('back');
    }).catch((err) => {
       console.log('Error in DELETING object from database', err);
    });
});


app.get('/', function(req,res){
    Todo.find({}).then((todolist) => {
        return res.render('home', {title: "Todo List App",todo_list: todolist});
    }).catch((err) => {
        console.log('error in fetching contacts from db');
    });
});

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server');
    }
    console.log('Server running on port : ', port);
});