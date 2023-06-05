const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: { 
        type: Date,
        required: false
    }
})

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;