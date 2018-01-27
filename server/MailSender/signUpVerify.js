var nodemailer = require('nodemailer');
var Config = require('./../config');
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Config.user || process.env.user,
        pass: Config.pass || process.env.pass
    }
});

 exports.sendMail = function (mailOptions) {
// send Mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
});
};