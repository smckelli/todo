const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const todoSchema = new Schema(
  {
    text: {
      type: String,
      required: 'You need to leave a task!',
      minlength: 1,
      maxlength: 280
    },
    complete: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);


const Todo = model('Todo', todoSchema);

module.exports = Todo;