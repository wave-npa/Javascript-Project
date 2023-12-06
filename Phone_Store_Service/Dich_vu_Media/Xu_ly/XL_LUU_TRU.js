
var File = require("fs") // NODE
var Duong_dan_Thu_muc_Media="Media"

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Lỗi ...');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}


function Doc_Thong_tin_Dich_vu() {
  var Duong_dan = "index.html"
  var Chuoi_Thong_tin = File.readFileSync(Duong_dan, "UTF-8")
  return Chuoi_Thong_tin
}


class XL_LUU_TRU {
    
  Thong_tin_Dich_vu(){
    return Doc_Thong_tin_Dich_vu()
  }

  Doc_Nhi_phan_Media(Ten_Tap_tin){ 
    var Nhi_phan = ""
    var Duong_dan = Duong_dan_Thu_muc_Media + "//" + Ten_Tap_tin
    if (File.existsSync(Duong_dan))
      Nhi_phan = File.readFileSync(Duong_dan)
    return Nhi_phan

  }
}

var Xu_ly = new XL_LUU_TRU
module.exports = Xu_ly




