const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  price: {
    type: Number,
    required: true,
    min: 1
  },
  inStock: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    enum: ["electronics", "clothes", "books", "other"],
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
