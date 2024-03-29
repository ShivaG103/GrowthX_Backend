const express=require('express');
const router=express.Router();

const {register}=require('../controllers/Auth/register');
const {login} = require('../controllers/Auth/login');
const { sendotp } = require("../controllers/Auth/otp");

router.post("/register", register);

router.post("/login", login);
router.post("/send-otp", sendotp);

module.exports=router;