const nodemailer = require("nodemailer")
require('dotenv').config();

const mailSender = async (email, title, body) => {
   
  try {
    let transporter = nodemailer.createTransport({
      service:"Gmail",
    
      auth:{
          user:process.env.MAIL_USER,
          pass:process.env.MAIL_PASS,
      },
  });

  //send mail 
  let info = await transporter.sendMail({
      from:`TEN Group`,
      to: `${email}`,
      subject: `${title}`,
      html:`${body}`,
  })
   
    return info
  } catch (error) {
    console.log('error-->',error)
    return error.message
  }
}

module.exports = mailSender;