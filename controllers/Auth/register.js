const bcrypt = require("bcrypt");
const user = require("../../models/user");
const OTP = require("../../models/OTP");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, otp } = req.body;

    if (!firstName || !lastName || !email || !password || !role || !otp) {
      return res.status(400).json({
        success: false,
        message: "Fill all the details ",
      });
    }

    const isUser = await user.findOne({ email: email });
    if (isUser) {
      return res.status(400).json({
        success: false,
        message: "user already present",
      });
    }
    let active;
    let approve;

    //at signup time user is already active
    active = true;

    //firstly approve is false, manager will make is approved.
    approve = false;

    //find most recent otp for user
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(response);

    //validate otp
    if (response.length == 0) {
      //otp nahi mila
      return res.status(400).json({
        success: false,
        message: "The OTP is not Valid",
      });
    } else if (otp !== response[0].otp) {
      //invalid  oTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    //now hash the password
    let hashedPassword = await bcrypt.hash(password, 10);
    //console.log('hashed',hashedPassword);

    const newUser = await user.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      active,
      approve,
    });
    newUser.password = undefined;

    return res.status(200).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
