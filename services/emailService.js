require("dotenv").config();



const nodemailer = require("nodemailer");
const { PassThrough } = require("stream");



async function sendRawEmailWithAttachments({ to, subject, html, text = '', attachments = [] }) {
    const transporter = nodemailer.createTransport({
        secure:false,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER, // This MUST be the literal string 'apikey'
            pass: process.env.SMTP_PASS, // Your actual SendGrid API Key
        },
        // Stupid configuration coming from ChatGPT and break the whole thing!!
        // streamTransport: true,
        // buffer: true,
    });

    const mailOptions = {
        from: process.env.SMTP_SENDER,
        to,
        // bcc:"development2@german-emirates-club.com",
        subject,
        text,
        html,
        attachments, // Example format below
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log('Email sent:', response.messageId);
        return response;
    } catch (error) {
        console.error('SendGrid SMTP error:', error);
        throw error;
    }
}




async function email_reset_password(reqBody) {
  const { password } = reqBody;
  try {
    const currentYear = new Date().getFullYear();
    const org_name = "German Industrial Club";

const htmlBody = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>${org_name} - Reset Password</title>
  </head>
  <body style="margin:0; padding:0; background-color: #F5F5F5; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F5F5F5">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden; margin: 40px auto;">
            
            <!-- Header -->
            <tr>
              <td bgcolor="#0D1B2A" style="color: #ffffff; text-align: center; padding: 20px; font-size: 22px; font-weight: bold;">
                ${org_name} - Password Reset
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="color: #0D1B2A; font-size: 16px; line-height: 1.6; padding: 30px;">
                <p style="color: #0D1B2A;">Hello,</p>
                <p style="color: #0D1B2A;">
                  Please use the following temporary password to reset your password:
                </p>
                <p style="text-align: center; margin: 30px 0;">
                  <span style="font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #D4AF37;">
                    ${password}
                  </span>
                </p>
                <p style="color: #0D1B2A;">
                  For your security, please reset your password immediately after logging in.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="font-size: 13px; color: #555555; text-align: center; padding: 20px; border-top: 1px solid #dddddd;">
                &copy; ${currentYear} ${org_name}. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;


    return await sendRawEmailWithAttachments({
      to: reqBody.email,
      subject: `${org_name} - Reset Your Password`,
      html: htmlBody,
      text: `Your temporary password is: ${password}. Please log in and reset your password immediately.`,
    });

  } catch (error) {
    console.log(error);
    throw error;
  }
}





module.exports = {email_reset_password };
