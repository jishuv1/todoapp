import mongoose from 'mongoose';

// Defining the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create the user model
export default mongoose.model('User', userSchema);
