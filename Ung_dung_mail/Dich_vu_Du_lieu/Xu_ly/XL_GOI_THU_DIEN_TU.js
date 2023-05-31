var nodemailer = require('nodemailer');
class XL_GOI_THU_DIEN_TU {
  Goi_Thu_Lien_he(from, to, subject, body) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '', // user gmail
        pass: '' // pass gmail
      }
    });

    var mailOptions = {
      from: `Nhà hàng Thu Trân <${from}>`,
      to: to,
      subject: subject,
      html: body
    };
    // Gọi phương thức sendMail -> Promise
    return transporter.sendMail(mailOptions);
  }
}

var Goi_thu = new XL_GOI_THU_DIEN_TU()
module.exports = Goi_thu