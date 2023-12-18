const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },

    description: {
      type: String,
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

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
