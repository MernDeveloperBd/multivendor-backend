const nodemailer = require('nodemailer');

async function sendVerificationEmail(to, subject, body) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "kenakatabazarbd@gmail.com",
            pass: "yxynfawxnnaiqhqi",
        }
    });
    const mailOptions = {
        from: 'kenakatabazarbd@gmail.com',
        to,
        subject,
        html:body
    }
     await transporter.sendMail(mailOptions)
};

module.exports = sendVerificationEmail;