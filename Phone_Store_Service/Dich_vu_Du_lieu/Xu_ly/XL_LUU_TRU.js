
// Khai báo thư viện xử lý file của NODEJS
var File = require("fs") 
// Khai báo đường dẫn thư mục chứa tập tin JSON
var Duong_dan_Thu_muc_Du_lieu = "Du_lieu_Luu_tru"

// Xây dựng các hàm Xử lý tập tin: Đọc, Ghi 

function Doc_Thong_tin_Dich_vu() {
  var Duong_dan = "index.html"
  var Chuoi_Thong_tin = File.readFileSync(Duong_dan, "UTF-8")
  return Chuoi_Thong_tin
}

function Doc_Thong_tin_Cua_hang() {
  var Duong_dan = `${Duong_dan_Thu_muc_Du_lieu}/Cua_hang.json`
  var Chuoi_Thong_tin = File.readFileSync(Duong_dan, "UTF-8")
  return JSON.parse(Chuoi_Thong_tin) // Đối tượng
}

function Doc_Thong_tin_Dien_thoai() {
  var Duong_dan = `${Duong_dan_Thu_muc_Du_lieu}/Dien_thoai.json`
  var Chuoi_Thong_tin = File.readFileSync(Duong_dan, "UTF-8")
  return JSON.parse(Chuoi_Thong_tin) // Đối tượng
}



// Khai báo Lớp Nghiệp vụ  
class XL_LUU_TRU {
    // Xây dựng Phương thức Doc_Du_lieu
    Doc_Du_lieu(){
      var Du_lieu={};
      Du_lieu.Cua_hang=Doc_Thong_tin_Cua_hang()
      Du_lieu.Dien_thoai=Doc_Thong_tin_Dien_thoai()
      return Du_lieu
    }

    Ghi_Cua_hang(Doi_tuong_Cua_hang) {
      var Kq = "OK"
      try {
        var Duong_dan = Duong_dan_Thu_muc_Du_lieu + "//" + "Cua_hang.json"
        var Chuoi = JSON.stringify(Doi_tuong_Cua_hang, null, "\t")
        File.writeFileSync(Duong_dan, Chuoi, "UTF-8")
      } catch (Loi) {
        Kq = Loi
      }
      return Kq
    }

}
// Khởi tạo đối tượng từ lớp Nghiệp vụ
var Xu_ly = new XL_LUU_TRU
// Chèn Xu_ly => Thư viện của Ứng dụng 
module.exports = Xu_ly




