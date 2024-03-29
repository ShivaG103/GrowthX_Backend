const OTP = require("../../models/OTP");
const user = require("../../models/user");
const otpGenerator = require("otp-generator");

exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    const checkPresent = await user.findOne({ email });

    // If user found with provided email
    if (checkPresent) {
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      });
    }

    var otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
        digits: true,
      });
    }

    const OTPCreated = await OTP.create({ email, otp });

    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};
