const express = require("express");
const router = express.Router();
const {register, SignIn,formik, getDashboard} =require("../controller/user.controller")

router.post("/register",register)
router.post("/signIn",SignIn)
router.get("/dashboard", getDashboard)
router.post("/formik",formik)
module.exports = router; 