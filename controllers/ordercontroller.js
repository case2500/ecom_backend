const asyncHandler = require("express");
const { Order } = require("../model/orderModel");
// const {Order} = require('../models/order');
const express = require("express");
const { OrderItem } = require("../model/order-item.js");
const Product = require("../model/productModel.js");

// ************ createOrder
const createOrder = async (req, res) => {
  // console.log("req.body.orderItems"+JSON.stringify(req.body.orderItems))
  try {
      const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.id,
      });
      // + - products
      let bulkOption = req.body.orderItems.map((productNewOrder) => {
        console.log("productNewOrder=" + productNewOrder.id);
        return {
          updateOne: {
            filter: { _id: productNewOrder.id },
            update: {
              $inc: {
                quantity: -productNewOrder.quantity,
                sold: +productNewOrder.quantity,
              },
            },
          },
        };
      });
      let updated = Product.bulkWrite(bulkOption, {});
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );
  const orderItemsIdsResolved = await orderItemsIds;


const maxcount = await Order.find({ }).sort({autonumber:-1}).limit(1)
const max = maxcount.map(p =>(p.autonumber))
console.log("max==>"+max)
  let order = new Order({
    orderItems: orderItemsIdsResolved,
    user: req.body.userid,
    totalPrice: req.body.totalprice,
    autonumber:Number(max)+1
  });
  order = await order.save();
  if (!order) return res.status(400).send("the order cannot be created!");
  res.send(req.body);
  } catch (error) {
    console.log(error)
  }

};

// ****** Get all order
const getOrders = async (req, res) => {
  console.log("get");
  const neworder = await Order.find({})
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        //  populate: "category",
      },
    })
    .sort({ dateOrdered: -1 });
  console.log(neworder);
  res.status(200).json(neworder);
};

// ****** Get single order
const getOrder = async (req, res) => {
  console.log(req.params);
  const orderuserid = req.params.id;
  // console.log("tableName="+tableName)
  const order = await Order.find({ user: orderuserid })
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        //  populate: "category",
      },
    })
    .sort({ dateOrdered: -1 });
  // console.log(order.map(p=>(p.totalPrice)))
  console.log(order);
  if (!order) {
    res.status(404);
    throw new Error("order not found");
  }
  res.status(200).json(order);
};

// ************ Delete order product
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  // if product doesnt exist
  if (!order) {
    res.status(404);
    throw new Error("order not found");
  }
  await order.remove();
  res.status(200).json({ message: "order deleted." });
});

// ************ Update Order
const updateOrder = async (req, res) => {
  console.log("userid=>" + req.params.id);
  const id = req.params.id;
  console.log("id===" + id);
  const filter = { _id: id };
  const update = { status: "ยกเลิก" };
  const order = Order.find({ _id: id });
  if (order) {
    let updatedorder = await Order.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).json(updatedorder);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

//updateCompany
// ************ Update Company
const updateCompany = async (req, res) => {
   try {
    console.log(req.body.newdeliverycompany);
    var { _id, newdeliverycompany } = req.body;
    const filter = { _id: _id };
    const update = { deliverycompany: newdeliverycompany };   
     const opts = { new: true };
    let results = await Order.findOneAndUpdate(filter, update, opts);
    // console.log(results);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};




const updateshipping = async (req, res) => {
  try {
    console.log(req.body);
    var { _id, newNoshipping } = req.body;
    const filter = { _id: _id };
    const update = { Noshipping: newNoshipping };
    const opts = { new: true };
    let results = await Order.findOneAndUpdate(filter, update, opts);
    // console.log(results);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};


const updateOrderAdmin = async (req, res) => {
  try {
    console.log(req.body);
    var { _id, newstatus } = req.body;
    const filter = { _id: _id };
    const update = { status: newstatus };
    const opts = { new: true };
    let results = await Order.findOneAndUpdate(filter, update, opts);
    // console.log(results);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  updateOrderAdmin,
  updateshipping,
  updateCompany
};
