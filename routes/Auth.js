const express=require('express');
const router=express.Router();

const {register}=require('../controllers/Auth/register');
const {login} = require('../controllers/Auth/login');

router.post('/register',register);

router.post('/login', login);

module.exports=router;