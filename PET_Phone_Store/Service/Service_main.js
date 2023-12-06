//Source
var meme=`../Memes`
var Duong_dan_Du_lieu=`../Media`
var Dia_chi_Dich_vu = "http://localhost:1000"
var Dia_chi_Media = "http://localhost:1001"
// Các hàm xử lý
//TOS
function Terms_and_Service(){
    var Xu_ly_HTTP=new XMLHttpRequest() // Ajax
    var Tap_tin=`terms_and_privacy.txt`
    var Dia_chi_Xu_ly=`${Duong_dan_Du_lieu}/${Tap_tin}`
    Xu_ly_HTTP.open(`GET`,`${Dia_chi_Xu_ly}`,false) // Xử lý Đồng bộ 
    Xu_ly_HTTP.send()
    var Chuoi_ket_qua=Xu_ly_HTTP.responseText.trim() // 
    return Chuoi_ket_qua
}
 
//download
function Tai_Memes(meme_code, new_name) {
    var element = document.createElement("a")
    document.body.appendChild(element)
    element.setAttribute("href", `${meme}/${meme_code}`)
    if(new_name!=undefined){
        element.setAttribute("download", `${new_name}`)
    }else{
        element.setAttribute("download","")
    }
        
    element.click()
    document.body.removeChild(element)
}

//txt reader
function Store_info_TXT(){
    var Xu_ly_HTTP=new XMLHttpRequest() // Ajax
    var Tap_tin=`store_info.txt`
    var Dia_chi_Xu_ly=`${Duong_dan_Du_lieu}/${Tap_tin}`
    Xu_ly_HTTP.open(`GET`,`${Dia_chi_Xu_ly}`,false) // Xử lý Đồng bộ 
    Xu_ly_HTTP.send()
    var Chuoi_ket_qua=Xu_ly_HTTP.responseText.trim() // 
    return Chuoi_ket_qua
}

function Store_content_TXT(){
    var Xu_ly_HTTP=new XMLHttpRequest() // Ajax
    var Tap_tin=`store_content.txt`
    var Dia_chi_Xu_ly=`${Duong_dan_Du_lieu}/${Tap_tin}`
    Xu_ly_HTTP.open(`GET`,`${Dia_chi_Xu_ly}`,false) // Xử lý Đồng bộ 
    Xu_ly_HTTP.send()
    var Chuoi_ket_qua=Xu_ly_HTTP.responseText.trim() // 
    return Chuoi_ket_qua
}
//json redear
/*function Dien_thoai_JSON(){
    var Xu_ly_HTTP=new XMLHttpRequest() // Ajax
    var Tap_tin=`dien_thoai.json`
    var Dia_chi_Xu_ly=`${Duong_dan_Du_lieu}/${Tap_tin}`
    Xu_ly_HTTP.open(`GET`,`${Dia_chi_Xu_ly}`,false) // Xử lý Đồng bộ 
    Xu_ly_HTTP.send()
    var Chuoi_ket_qua=Xu_ly_HTTP.responseText.trim() // 
    return Chuoi_ket_qua
}*/

//Using service
// ************************Read information*********************
function Doc_Danh_sach_Dien_thoai() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=DOC_DANH_SACH_DIEN_THOAI`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Doc_Thong_tin_Cua_hang() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=DOC_CUA_HANG`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

// ***************************** Xuất ***********************
function Xuat_Thong_tin_Store(Store, Th_Cha) {
    var Chuoi_HTML = `
    <img src="${Dia_chi_Media}/${Store.Ma_so}.png" class="btn" />
        <div class="text-center btn btn-outline-primary">${Store.Ten}
            <br>
            <small> ${Store.Dia_chi}</small>
    </div>
    `
    Th_Cha.innerHTML = Chuoi_HTML
}
function Xuat_Danh_sach_Dien_thoai(Danh_sach, Th_Cha) {
    Th_Cha.innerHTML = ""
    Danh_sach.forEach(Dien_thoai => {
        var The_hien = document.createElement("div")
        The_hien.className = "card m-1"
        The_hien.style.cssText = "width:18rem;float:left"
        var Noi_dung_HTML = `
        <img class="card-img-top" src="${Dia_chi_Media}/${Dien_thoai.Ma_so}.png" alt="">
        <div class="card-body">
            <p class="card-title text-primary">${Dien_thoai.Ten}</p>
            <p class="card-title text-info">${Dien_thoai.Nhom_Dien_thoai.Ma_so}</p>
            <p class="card-text text-danger">Giá:${Tao_Chuoi_The_hien_So_nguyen_duong(Dien_thoai.Don_gia_Ban)} đồng </p>
        </div>
        `
        The_hien.innerHTML = Noi_dung_HTML
        Th_Cha.appendChild(The_hien)

        The_hien.onclick = () => {

        }
    })
    Th_Thong_bao.innerHTML=`Our current amount of products is ${Danh_sach.length}`
}