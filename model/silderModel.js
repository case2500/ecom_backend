const mongoose = require("mongoose");

const silderSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    cloudinary_id: {
      type: String,
    },
    cover: {
      type: Object,
      default: `https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-260nw-643080895.jpg`,
    },
  },
  {
    timestamps: true,
  }
);

const Silder = mongoose.model("Silder", silderSchema);
module.exports = Silder;

// const Product = mongoose.model("Product", productSchema);
// module.exports = Product;