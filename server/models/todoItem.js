const mongoose = require('mongoose');

const TodoItemScheme = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false, // Inicialmente, las tareas no estarán completadas
  },
});

module.exports = mongoose.model('todo', TodoItemScheme);
