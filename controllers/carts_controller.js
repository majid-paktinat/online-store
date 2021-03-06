const express = require("express");

const router = express.Router();

// {USERID:req.body.userid, PRODUCTID:req.body.productid, PRODUCTQUANTITY:req.body.productquantity}
let cartFields; // {u:req.body.userid, p:req.body.productid, q:req.body.productquantity}

// Import the model (cat.js) to use its database functions.
const cart = require("../models/cart.js");

// Create all our routes and set up logic within those routes where required.
router.get("/api/carts", function(req, res) {      //ok
  cart.selectAllCarts(function(data) {
    var hbsObject = {
      carts: data
    };
    res.json(data);
    //res.render("index", hbsObject);
  });
});

router.get("/api/cartFields", function(req, res) {
  console.log("'/api/cartFields' reads cartFields...");
  //console.log(cartFields)
  res.send(cartFields); 
});

router.get("/api/cart/:userid", function(req, res) {
  console.log("inside /api/cart/:userid");
  const userid = req.params.userid;
  cart.selectCart(userid, function(data) {
    res.send(data);
  });
});

router.post("/api/carts", function(req, res) {
  cart.insertCart(req.body.userid, req.body.productid, req.body.productquantity, function(result) {
    console.log("'/api/carts' writes cartFields...");
    cartFields = {USERID:req.body.userid, PRODUCTID:req.body.productid, PRODUCTQUANTITY:req.body.productquantity};
    res.json({ id: result.insertId });// Send back the ID of the new cart 
  });
}); 

router.put("/api/carts/update/:cartid", function(req, res) {   //ok
  const cartid = req.params.cartid;
  console.log("CartID for <update> is equal to : ", cartid);
  
  cart.updateCart(cartid, req.body.userid, req.body.productid, req.body.productquantity, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end(); // If no rows were changed, then the ID must not exist, so 404
    } else {
      res.status(200).end();
    }
  });
});

router.put("/api/carts/update/:cartid/:quantity", function(req, res) {   //ok
  const cartid = req.params.cartid;
  const quantity = req.params.quantity;
  
  console.log("Cart quantity is being updated");
  
  cart.updateCart1(cartid, quantity, function(result) {
    console.log(result);
    if (result.changedRows == 0) {
      return res.status(404).end(); // If no rows were changed, then the ID must not exist, so 404
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/carts/delete/:cartid", function(req, res) {  //ok
  const cartid = req.params.cartid;
  console.log("ID for <delete> is equal to : ", cartid);

  cart.deleteCart(cartid, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end(); // If no rows were changed, then the ID must not exist, so 404
    } else {
      res.status(200).end();
    }
  });
});


// Export routes for server.js to use.
module.exports = router;
