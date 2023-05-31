//MongoDB
var NodeJs_Dich_vu = require("http")
var Luu_tru = require("../Xu_ly/XL_LUU_TRU_MONGODB")
// Thư viện Gởi thư
var Gui_thu=require("../Xu_ly/XL_GOI_THU_DIEN_TU")
//Thư viện tin nhắn
var SMS=require("../Xu_ly/XL_SMS")
var Port = normalizePort(process.env.PORT || 1000);

var Xu_ly_Tham_so = require('querystring')
var Du_lieu = {}
var Danh_sach_Dien_thoai = Luu_tru.Doc_Danh_sach_Dien_thoai()
var Cua_hang = Luu_tru.Doc_Thong_tin_Cua_hang()
var Nguoi_dung = Luu_tru.Doc_Danh_sach_Nguoi_dung()

Danh_sach_Dien_thoai.then(Kq => {
  Du_lieu.Danh_sach_Dien_thoai = Kq
})
Cua_hang.then(Kq => {
  Du_lieu.Cua_hang = Kq[0]
})
Nguoi_dung.then(Kq => {
  Du_lieu.Nguoi_dung = Kq
})

var Dich_vu = NodeJs_Dich_vu.createServer((Yeu_cau, Dap_ung) => {
  var Chuoi_Nhan = ""
  var Dia_chi_Xu_ly = Yeu_cau.url.replace("/", "")
  Yeu_cau.on('data', (chunk) => { Chuoi_Nhan += chunk })
  Yeu_cau.on('end', () => {
    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);

    var Tham_so = Xu_ly_Tham_so.parse(Dia_chi_Xu_ly.replace("?", ""))
    var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly
    var Chuoi_Kq = ""
    if (Ma_so_Xu_ly == "DOC_DANH_SACH_DIEN_THOAI") {
      var Danh_sach_Dien_thoai = {}
      Danh_sach_Dien_thoai = Du_lieu.Danh_sach_Dien_thoai
      Chuoi_Kq = JSON.stringify(Danh_sach_Dien_thoai)
      Dap_ung.end(Chuoi_Kq);
    } else if (Ma_so_Xu_ly == "DOC_CUA_HANG") {
      var Cua_hang = {}
      Cua_hang = Du_lieu.Cua_hang
      Chuoi_Kq = JSON.stringify(Cua_hang)
      Dap_ung.end(Chuoi_Kq);
    }else if (Ma_so_Xu_ly == "GOI_THU_LIEN_HE") {
      let from=`natuant3h@gmail.com`
      let to=`hoainam.pt642@gmail.com`
      let subject=`Khách hàng liên hệ`
      let body=Chuoi_Nhan
      let kqPro=Gui_thu.Goi_Thu_Lien_he(from,to,subject,body)
      kqPro.then(kq=>{
        console.log(kq)
        Chuoi_Kq="OK"
        Dap_ung.end(Chuoi_Kq);
      }).catch(loi=>{
        console.log(loi)
        Chuoi_Kq="Error"
        Dap_ung.end(Chuoi_Kq);
      })
    }else if (Ma_so_Xu_ly == "SMS") {
      let so_dien_thoai="+84838301003"
      let noi_dung=Chuoi_Nhan
      let kqPro=SMS.Goi_tin_nhan(so_dien_thoai, noi_dung)
      kqPro.then(kq=>{
        console.log(kq)
        Chuoi_Kq="OK"
        Dap_ung.end(Chuoi_Kq);
      }).catch(loi=>{
        console.log(loi)
        Chuoi_Kq="Error"
        Dap_ung.end(Chuoi_Kq);
      })
    } else {
      Chuoi_Kq = Luu_tru.Doc_Thong_tin_Dich_vu()
      Dap_ung.end(Chuoi_Kq);
    }
  })
})

Dich_vu.listen(Port,
  console.log(`Dịch vụ Dữ liệu đang thực thi tại địa chỉ: http://localhost:${Port}`)
);

Dich_vu.on('error', onError);
Dich_vu.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof Port === 'string'
    ? 'Pipe ' + Port
    : 'Port ' + Port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = Dich_vu.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

