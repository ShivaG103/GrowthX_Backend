const bcrypt = require('bcrypt');
const user = require('../../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config();



exports.login = async (req, res) => {
    
    try {
        //get data from req body
        const {email, password} = req.body;
    
        //validate data
        if(!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
                success:false,
                message:"Please fill up all the Required Fields",
            });
        }
        //check user exists or not
        const userData = await user.findOne({email});
        if(!userData) {
            return res.status(401).json({
                success:false,
                message:"User is not Registered with Us Please Register to Continue",
            });
        }
        //generate jwt, after password matching
        if(await bcrypt.compare(password, userData.password)) {
            const token = jwt.sign(
              { email: userData.email, id: userData._id, role: userData.role },
              process.env.JWT_SECRET,
              {
                expiresIn: "24h",
              }
            );

            userData.password = undefined;

            //create cookie and send response
            const options = {
              expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
              httpOnly: true,
            };

            res.cookie('token', token, options).status(200).json({
                success:true,
                token,
                userData,
                message:"Logged in Successfully",
            });
        }
        else {
            return res.status(401).json({
                success:false,
                message:"Password is incorrect",
            });
        }
        

    } catch (error) {
        console.error(error)
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success:false,
            message:"Login Failure, please try again",
        });
    }
};