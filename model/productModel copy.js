const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      required: true,
      default: 0,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    brand: {
      type: String,
      default: "No brand",
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      trim: true,
    },

    description: {
      type: String,
      trim:true,
    },
    cloudinary_id: {
      type: String,
    },
    // images: {
    //   type: Object,
    //   default: `https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-260nw-643080895.jpg`,
    // },

    images: [
      {
        type: String,
        default: `https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-260nw-643080895.jpg`,
      },
    ],


  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
