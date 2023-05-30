var twilio = require('twilio')
class XL_Goi_tin_nhan {
    Goi_tin_nhan(so_dien_thoai, noi_dung) {
        var accountSid = 'AC81307e6da46272f59ae922428bddf3ac';
        var authToken = 'f5b3dfde93f5d6a693efe8751584beb6';
        var client = new twilio(accountSid, authToken);
        return client.messages.create({
            body: noi_dung,
            to: so_dien_thoai,
            from: '+18504186659'
        })
    }
}
var Goi_tin_nhan=new XL_Goi_tin_nhan()
module.exports=Goi_tin_nhan