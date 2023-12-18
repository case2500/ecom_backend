const mongoose = require("mongoose");

const category = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "1",
  },
  cloudinary_id: {
    type: String,
  },
  image: {
    type: Object,
    default: `https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-260nw-643080895.jpg`,
  },
},
{
  timestamps: true,
}
);

const Category = mongoose.model("Category", category);
module.exports = Category;
