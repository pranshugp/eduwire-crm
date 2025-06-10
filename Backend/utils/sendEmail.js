// email/sendEmail.js
const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pranshugupta641@gmail.com", // your Gmail
      pass: "jtzajosznyyskosx", // your 16-digit Gmail app password
    },
  });

  const mailOptions = {
    from: '"Eduwire System" <pranshugupta641@gmail.com>',
    to,
    subject,
    text,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`✅ Email sent to ${to}:`, info.response);
}

module.exports = sendEmail;
