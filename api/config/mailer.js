const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: "bbtbebidas@gmail.com",
    pass: "yhcztrjlpvgwnwtx",
  },
});

transporter.verify(() => {
  console.log("Ready for send emails");
});

module.exports = transporter;
