const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const register = (req, res) => {
  let form = new userModel(req.body);
  form
    .save()
    .then(() => {
      console.log(req.body);
      res.send({ status: true, message: "request done" });
    })
    .catch((err) => {
      res.send({ status: false, message: "request failed" });
    });
};

// const SignIn=(req,res)=>{
//     userModel.findOne({email:req.body.email})
//     .then((user)=>{
//         console.log(user);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// }
const SignIn = (req, res) => {
  let { email, password } = req.body;
  userModel
    .findOne({ email: email })
    .then((user) => {
      user.comparedPassword(password, (err, isMatch) => {
        let secret = process.env.SECRET;
        console.log(isMatch);
        if (isMatch) {
          // res.send({status:true,message:"user found"})
          jwt.sign({ email }, secret, { expiresIn: "1h" }, (err, token) => {
            if (err) {
              console.log(err);
            } else {
              console.log(token);
              res.send({ status: true, message: "user  found ", token: token });
            }
          });
        } else {
          res.send({ status: false, message: "user not found " });
        }
      });

      console.log("user found");
    })
    .catch((err) => {
      console.log("wrong credentials");
    });
};

const formik = (req, res) => {
  let form = new userModel(req.body);
  form
    .save()
    .then(() => {
      console.log(req.body);
      res.send({ status: true, message: "request done" });
    })
    .catch((err) => {
      res.send({ status: false, message: "request failed" });
    });
};
const getDashboard = (req, res) => {
  let secret = process.env.SECRET;
  token = req.headers.authorization.split(" ")[1]

  jwt.verify(token,secret,(err, result)=>{
    if (err) {
      console.log(err);
      res.send({status:false,message:""})
    } else {
      console.log(result);
      res.send({status:true,message:"welcome",result})
    }
  });
};

module.exports = { register, SignIn, getDashboard, formik };
