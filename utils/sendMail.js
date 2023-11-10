const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASS } = require("./secret.js");
// new user admin access mail
const newUserAccessSendMail = ({ to, msg }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
  transporter.sendMail({
    from: `WolMart <${EMAIL_USER}>`, // sender address
    to: to, // list of receivers
    subject: "your Account login access is Mail", // Subject line
    text: msg,
  });
};

// user email validation
const validateEmail = ({ to, name, token }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
  transporter.sendMail({
    from: `WolMart <${EMAIL_USER}>`, // sender address
    to: to, // list of receivers
    subject: "Account activision Email", // Subject line
    html: `<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f0f0f0;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    <tr>
      <td style=" background-color: #007BFF;">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2Lt4Ty98F5C4fwHTNVcLXbE1MbodO6EiQ&usqp=CAU" alt="Header Image" width="100%" style="display: block;">
      </td>
    </tr>
    <tr>
      <td bgcolor="#ffffff" style="border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
        <h1 style="color: #007BFF; margin-bottom: 20px;">Account Verification</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #444;">Hello ${name},</p>
        <p style="font-size: 16px; line-height: 1.6; color: #444;">please check below email verifications button</p>
        <p style="font-size: 16px; line-height: 1.6; color: #444;">Thank you for signing up with us! Please click the button below to verify your account:</p>
        <a href="${token}" target="_blank" style="display: inline-block; background-color: #007BFF; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin-top: 20px;">Verify Account</a>
        <a href="${token}" target="_blank" style="display: inline-block; background-color: #007BFF; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin-top: 20px;">${token}</a>
        <p style="font-size: 16px; line-height: 1.6; color: #444;">If you didn't request this verification, you can safely ignore this email.</p>
        <div style="margin-top: 40px; color: #666; font-size: 14px;">
          <p>Wolmart</p>
        </div>
      </td>
    </tr>
    <tr>
      <td bgcolor="#FFF"  style="border-radius: 5px; padding: 20px; text-align: center;">
        <a href="https://www.facebook.com/" target="_blank" style="display: inline-block; margin-right: 10px;">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlZPeIdiBf7ZuJyImLv6qz0c2YCxeqKNe4tA&usqp=CAU" alt="Facebook" width="32" height="32" style="display: block; border-radius: 50%; background-color: #fff; padding: 5px;">
        </a>
        <a href="https://twitter.com/" target="_blank" style="display: inline-block; margin-right: 10px;">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToXRLt-PeOJjWUvDncMfzLy3NkpveAiGXr7A&usqp=CAU" alt="Twitter" width="32" height="32" style="display: block; border-radius: 50%; background-color: #fff; padding: 5px;">
        </a>
        <a href="https://www.instagram.com/" target="_blank" style="display: inline-block; margin-right: 10px;">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr0hhUw7Nx7rr3mnN4UKwV2RvFVHX2x5mrAA&usqp=CAU" alt="Instagram" width="32" height="32" style="display: block; border-radius: 50%; background-color: #fff; padding: 5px;">
        </a>
      </td>
    </tr>
  </table>
</body>
      `,
  });
};

//module exports sendMail
module.exports = { newUserAccessSendMail, validateEmail };
