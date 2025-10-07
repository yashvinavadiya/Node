import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: String,
  genre: String,
  price: Number,
  issueDate: Date,
  returnDate: Date,
  studentName: String,
  studentId: String,

  // Optional ISBN, but won’t cause duplicate key error
  isbn: { type: String, unique: true, sparse: true }
});

export default mongoose.model("Book", bookSchema);
