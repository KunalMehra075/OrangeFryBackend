const express = require("express");
const { UserModel } = require("../models/users.model");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  AdminAuthenticator,
} = require("../middlewares/AdminAuthentication.middleware");

const userRouter = express.Router();

userRouter.get("/", AdminAuthenticator, async (req, res) => {
  try {
    const data = await UserModel.find();
    res.json({ data });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
userRouter.post("/register", async (req, res) => {
  let data = req.body;
  let email = req.body.email;
  let name = req.body.name;
  if (!data.role) {
    data.role = "Explorer";
  }
  try {
    let user = await UserModel.find({ email });
    let user1 = await UserModel.find({ name });
    if (user.length || user1.length) {
      res.json({ Message: "User Already Exists", exist: true, User: user });
    } else {
      bcrypt.hash(data.pass, 5, async function (err, hash) {
        if (hash) {
          data.pass = hash;
          const instance = new UserModel(data);
          await instance.save();
          res.json({ Message: "Added User Successfully", User: instance });
        } else {
          res.json({ Message: "Something Went Wrong" });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
userRouter.post("/login", async (req, res) => {
  let { email, pass } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (!user) {
      res.json({ Message: "User Dosent Exists", exist: false, Wrong: true });
    } else {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          jwt.sign({ user }, process.env.key, (err, token) => {
            if (token) {
              res.json({
                Message: "Login Successful",
                Wrong: false,
                token,
                user,
              });
            } else {
              res.json({ Message: "Wrong Credentials", Wrong: true });
            }
          });
        } else {
          res.json({ Message: "Wrong Credentials", Wrong: true });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
userRouter.delete("/delete/:id", AdminAuthenticator, async (req, res) => {
  let id = req.params.id;
  try {
    const data = await UserModel.findByIdAndDelete({ _id: id });
    res.json({ Message: "Deleted Successful", Deleted: data });
  } catch (err) {
    console.log(err);
    res.json({ Error: "Something Went Wrong" });
  }
});
userRouter.patch("/update/:id", AdminAuthenticator, async (req, res) => {
  let id = req.params.id;
  let payload = req.body;
  try {
    const data = await UserModel.findByIdAndDelete({ _id: id }, payload);
    res.json({ Message: "Updated Successful", Updated: data });
  } catch (err) {
    console.log(err);
    res.json({ Error: "Something Went Wrong" });
  }
});
module.exports = { userRouter };
