
class XL_Dien_thoai{
    constructor(Ten,Ma_so,Don_gia_Ban){
        this.Ten=Ten
        this.Ma_so=Ma_so,
        this.Don_gia_Ban=Don_gia_Ban
    }
    Xuat_Thong_tin_Dien_thoai(){
        return `Mã số:${this.Ten}` 
    }
}

function Tong_Hai_so(a,b){
    return a+b
}

// ES7
export {XL_Dien_thoai,Tong_Hai_so}
