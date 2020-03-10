const express = require("express");

const router = express.Router();

// Import the model (cat.js) to use its database functions.
const user = require("../models/user.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  user.selectAllUsers(function(data) {
    var hbsObject = {
      users: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/users", function(req, res) {
  user.insertUser(req.body.userid, req.body.userpassword, req.body.userfname, req.body.userlname, req.body.userrole, req.body.useremail, req.body.userphone, req.body.useraddress, function(result) {
    res.json({ id: result });// Send back the ID of the new user
  });
});

router.put("/api/users/update/:userid", function(req, res) {
  const userid = req.params.userid;
  console.log("UserID for <update> is equal to : ", userid);
  
  user.updateUser(userid, req.body.userfname, req.body.userlname, req.body.useremail, req.body.userphone, req.body.useraddress, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end(); // If no rows were changed, then the ID must not exist, so 404
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/users/delete/:userid", function(req, res) {
  const userid = req.params.userid;
  console.log("ID for <delete> is equal to : ", userid);

  user.deleteUser(userid, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end(); // If no rows were changed, then the ID must not exist, so 404
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
