// Khai báo thư viện http của node
var NodeJs_Dich_vu = require("http");
var Port = 1000;
var Xu_ly_Tham_so = require('querystring')
// Chèn thư viện XL_LUU_TRU
var Luu_tru = require("../Xu_ly/XL_LUU_TRU")
// Đọc Dữ liệu
var Du_lieu_Dich_vu=Luu_tru.Doc_Du_lieu()
// Xây dựng Dịch vụ
var Dich_vu = NodeJs_Dich_vu.createServer((Yeu_cau, Dap_ung) => {
  var Chuoi_Nhan = "";
  var Dia_chi_Xu_ly = Yeu_cau.url.replace("/", "").replace("?", "")
  var Tham_so = Xu_ly_Tham_so.parse(Dia_chi_Xu_ly)
  Yeu_cau.on('data', (chunk) => { Chuoi_Nhan += chunk })

  Yeu_cau.on('end', () => {
    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
    var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly
    var Chuoi_Kq = ""
    if (Ma_so_Xu_ly == "DOC_CUA_HANG") {
      // Lấy dữ liệu Cửa hàng
      var Cua_hang = Du_lieu_Dich_vu.Cua_hang
      Chuoi_Kq = JSON.stringify(Cua_hang)

    } else if (Ma_so_Xu_ly == "DOC_DIEN_THOAI") {
      var Dien_thoai=Du_lieu_Dich_vu.Dien_thoai
      Chuoi_Kq=JSON.stringify(Dien_thoai)

    } else if (Ma_so_Xu_ly == "GHI_CUA_HANG") {
      var Cua_hang=JSON.parse(Chuoi_Nhan);
      Chuoi_Kq = Luu_tru.Ghi_Cua_hang(Cua_hang)
      if(Chuoi_Kq=="OK"){
        Du_lieu_Dich_vu.Cua_hang=Cua_hang
      }
    } else {
      Chuoi_Kq = "Hello Word"
    }

    Dap_ung.end(Chuoi_Kq);
  })

})

// Run Service
Dich_vu.listen(Port,
  console.log(`Dịch vụ Dữ liệu đang thực thi tại địa chỉ: http://localhost:${Port}`)
)