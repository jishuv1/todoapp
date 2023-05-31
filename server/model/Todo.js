import mongoose from 'mongoose';

// Defining the todo schema
const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

// Create the todo model
export default mongoose.model('Todo', todoSchema);
