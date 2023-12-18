const mongoose = require("mongoose");

const autonumber = mongoose.Schema({

    noauto: {
      type: Number,
    },
    des: {
      type: Number,
      default:100,
      trim: true,
    },
  },

  {
    timestamps: true,
  }

);

const Autonumber = mongoose.model("Autonumber", autonumber);
module.exports = Autonumber;

