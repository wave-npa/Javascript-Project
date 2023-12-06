//************** Xử lý Lưu trữ ***********
var Dia_chi_Dich_vu = "http://localhost:1000"
var Dia_chi_Media = "http://localhost:1001"
//************** Xử lý Lưu trữ ***********
// Ghi
function Ghi_Du_lieu_Cua_hang(Cua_hang){
  var Tham_so=`Ma_so_Xu_ly=GHI_CUA_HANG`
  var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
  var Xu_ly_HTTP = new XMLHttpRequest() 
  Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
  
  var Chuoi_goi=JSON.stringify(Cua_hang)
  Xu_ly_HTTP.send(Chuoi_goi)
  
  var Chuoi_Kq = Xu_ly_HTTP.responseText
  return Chuoi_Kq
}

// Đọc
function Doc_Du_lieu_Cua_hang(){
  var Tham_so=`Ma_so_Xu_ly=DOC_CUA_HANG`
  var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
  var Xu_ly_HTTP = new XMLHttpRequest() 
  Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false) // Lập trình Đồng bộ
  Xu_ly_HTTP.send()
  var Chuoi_JSON = Xu_ly_HTTP.responseText
  if(Chuoi_JSON!="")
    return JSON.parse(Chuoi_JSON) 
}

function Doc_Du_lieu_Dien_thoai(){
  var Tham_so=`Ma_so_Xu_ly=DOC_DIEN_THOAI`
  var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
  var Xu_ly_HTTP = new XMLHttpRequest() 
  Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false) // Lập trình Đồng bộ
  Xu_ly_HTTP.send()
  var Chuoi_JSON = Xu_ly_HTTP.responseText
  if(Chuoi_JSON!="")
    return JSON.parse(Chuoi_JSON) 
}

// Xuất Cửa hàng
function Xuat_Cua_hang(Cua_hang,Th_Cha){
    var chuoi_html=`
    <img src="${Dia_chi_Media}/PET.png" class="btn" />
        <div class="text-center btn btn-outline-primary">${Cua_hang.Ten}
            <br>
            <small>Email: ${Cua_hang.Email}</small>
        </div>
    `
    Th_Cha.innerHTML=chuoi_html
}
// Xuất Điện thoại
function Xuat_Dien_thoai(Dien_thoai,Th_Cha){
  var chuoi_html=`
  <div class="card" style="width:20rem">
      <img class="card-img-top" src="${Dia_chi_Media}/${Dien_thoai.Hinh}" alt="">
      <div class="card-body">
          <h4 class="card-title">${Dien_thoai.Hinh}</h4>
          <p class="card-text">Giá: ${Dien_thoai.Gia_ban.toLocaleString()} </p>
          Hệ điều hành: ${Dien_thoai.He_dieu_hanh}
      </div>
  </div>
  `
  Th_Cha.innerHTML=chuoi_html;

}
