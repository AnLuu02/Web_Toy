// đăng kí tài khoản user

function createUser() {
    var name = document.getElementById('name');
    var address = document.getElementById('address');
    var phone = document.getElementById('phone');
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var checkRong = true;
    if (!name.value) {
        document.getElementById('nameLoi').style.display = 'block';
        document.getElementById('nameLoi').innerHTML = '<span style="color:red;font-size:15px">Tên không hợp lệ</span>';
        checkRong=false
    
    } else {
        document.getElementById('nameLoi').style.display = 'none';
    }
    if (!address.value) {
        document.getElementById('addressLoi').style.display = 'block';
        document.getElementById('addressLoi').innerHTML = '<span style="color:red;font-size:15px">Địa chỉ không hợp lệ</span>';
        checkRong=false
    } else {
        document.getElementById('addressLoi').style.display = 'none';
    }
    if (!phone.value) {
        document.getElementById('phoneLoi').style.display = 'block';
        document.getElementById('phoneLoi').innerHTML = '<span style="color:red;font-size:15px">Số điện thoại không hợp lệ</span>';
        checkRong=false
    } else {
        if (isNaN(Number(phone.value))) {
            document.getElementById('phoneLoi').style.display = 'block';
            document.getElementById('phoneLoi').innerHTML = '<span style="color:red;font-size:15px">Số điện thoại không hợp lệ</span>';
            checkRong=false
        } else {
            if (Number(phone.value) < 100000000 || Number(phone.value) > 999999999) {
                document.getElementById('phoneLoi').style.display = 'block';
                document.getElementById('phoneLoi').innerHTML = '<span style="color:red;font-size:15px">Số điện thoại không đúng</span>';
                checkRong=false
            } else {
                document.getElementById('phoneLoi').style.display = 'none';
            }
        }
    }
    if (!username.value) {
        document.getElementById('usernameLoi').style.display = 'block';
        document.getElementById('usernameLoi').innerHTML = '<span style="color:red;font-size:15px">Tên đăng nhập không hợp lệ</span>';
        checkRong=false
    } else {
        document.getElementById('usernameLoi').style.display = 'none';
    }
    if (!password.value) {
        document.getElementById('passwordLoi').style.display = 'block';
        document.getElementById('passwordLoi').innerHTML = '<span style="color:red;font-size:15px">Mật khẩu không được để trống</span>';
        checkRong=false
    } else {
        if (password.value.length < 8) {
            document.getElementById('passwordLoi').style.display = 'block';
            document.getElementById('passwordLoi').innerHTML = '<span style="color:red;font-size:15px">Mật khẩu phải trên 8 ký tự</span>';
            checkRong=false
        } else {
            document.getElementById('passwordLoi').style.display = 'none';
        }
    }
    if(checkRong == false){
        return false
    }
    var d = new Date();
    var ngayDangki = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var user = { username: username.value, password: password.value, name: name.value, address: address.value, phone: phone.value, ngayDangki: ngayDangki };
    var userArray = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')) : [];
    for (var i = 0; i < userArray.length; i++) {
        if (user.username == userArray[i].username) {
            document.getElementById('usernameLoi').style.display = 'block';
            document.getElementById('usernameLoi').innerHTML = '<span style="color:red;font-size:15px">Tên đăng nhập đã có người sử dụng</span>';
            return false;
        }
    }
    userArray.push(user);
    localStorage.setItem('user', JSON.stringify(userArray));
    alert('Bạn đã đăng ký thành công!')
    window.location='dangnhap.html'
}

// Đăng nhập 
function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var flag = true;
    if (!username) {
        document.getElementById('taikhoanLoi').style.display = 'block';
        document.getElementById('taikhoanLoi').innerHTML='Tài khoản không được để trống!!!'
        flag = false;
    } else {
        document.getElementById('taikhoanLoi').style.display = 'none';
    }
    if (!password) {
        document.getElementById('matkhauLoi').style.display = 'block';
        document.getElementById('matkhauLoi').innerHTML='Mật khẩu không được để trống!!!'
        flag = false;
    } else {
        document.getElementById('matkhauLoi').style.display = 'none';
    }
    if (flag == false) {
        return false;
    }
    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (username == userArray[i].username ) {
            if (password == userArray[i].password) {
                localStorage.setItem('userlogin', JSON.stringify(userArray[i]));
                alert('Đăng nhập thành công.')
                window.location='.././index.html'
                return true;
            }
        }
    }
    document.getElementById('matkhauLoi').style.display = 'block';
    document.getElementById('matkhauLoi').innerHTML = '<span style="color:red;font-size:15px">Sai thông tin đăng nhập</span>';
    return false;
}

function checkDangNhap(){
    var userArr=localStorage.getItem('userlogin')?JSON.parse(localStorage.getItem('userlogin')) : [];
    
    if(userArr.username != null && userArr.username != []){
        document.getElementById('loginaccount').style.display='none'
        document.getElementById('accountUser').style.display='block'
        document.getElementById('accountUser').innerHTML='<div style="padding:10px;color:red">'+userArr.name+'</div><div><a href="html/lichsumuahang.html"  >Lịch sử</a></div><div id="logout" onclick="logout()"><a href="index.html">Logout</a></div>'
    }
        
}

function checkDangNhap1(){
    var userArr=localStorage.getItem('userlogin')?JSON.parse(localStorage.getItem('userlogin')) : [];
    
    if(userArr.username != null && userArr.username != []){
        document.getElementById('loginaccount').style.display='none'
        document.getElementById('accountUser').style.display='block'
        document.getElementById('accountUser').innerHTML='<div style="padding:10px;color:red">'+userArr.name+'</div><div><a href="../html/lichsumuahang.html"  >Lịch sử</a></div><div id="logout" onclick="logout()"><a href="../index.html">Logout</a></div>'
    }
        
}

// đăng xuất

function logout() {
    if(confirm('Bạn muốn đăng xuất chứ?')){
        localStorage.removeItem('userlogin');
        localStorage.removeItem('giohang');
    }
}

// tạo dữ liệu sản phẩm

var data = [
    {id:1001,chatlieu:'Nhựa',img: 'img/5.jpg', name : 'Ferari Vàng', gia:50000},
    {id:1002,chatlieu:'Nhựa',img: 'img/6.jpg', name : 'XE CÔNG TRƯỜNG', gia:725000},
    {id:1003,chatlieu:'Nhựa',img: 'img/7.jpg', name : 'XE ĐIỀU KHIỂN', gia:325000},
    {id:1004,chatlieu:'Nhựa',img: 'img/8.jpg', name : 'XE BỒN', gia:25000},
    {id:1005,chatlieu:'Nhựa',img: 'img/18.jpg', name : 'XE CHỞ CÁT', gia:625000},
    {id:1006,chatlieu:'Nhựa',img: 'img/25.jpg', name : 'XE BIẾN HÌNH', gia:125000},
    {id:1007,chatlieu:'Nhựa',img: 'img/36.jpg', name : 'XE ĐỊA HÌNH', gia:225000},
    {id:1008,chatlieu:'Nhựa',img: 'img/27.jpg', name : 'XE CÔNG TRƯỜNG', gia:425000},
    {id:1009,chatlieu:'Nhựa',img: 'img/21.jpg', name : 'XE ĐỒ CHƠI', gia:90000},
    {id:1010,chatlieu:'Cao su',img: 'img/10.jpg', name : 'BÚP BÊ 1', gia:125000},
    {id:1011,chatlieu:'Cao su',img: 'img/11.jpg', name : 'BÚP BÊ 2', gia:125000},
    {id:1012,chatlieu:'Cao su',img: 'img/12.jpg', name : 'BÚP BÊ 3', gia:55000},
    {id:1013,chatlieu:'Cao su',img: 'img/13.jpg', name : 'BÚP BÊ 4', gia:75000},
    {id:1014,chatlieu:'Cao su',img: 'img/16.jpg', name : 'NÀNG TIÊN CÁ', gia:65000},
    {id:1015,chatlieu:'Cao su',img: 'img/15.jpg', name : 'BỘ TÔ MÀU 1', gia:55000},
    {id:1026,chatlieu:'Cao su',img: 'img/14.jpg', name : 'BỘ TÔ MÀU 2', gia:97000},
    {id:1017,chatlieu:'Cao su',img: 'img/17.jpg', name : 'SPIDER MAN', gia:550000},
    {id:1018,chatlieu:'Nhựa',img: 'img/9.jpg', name : 'ĐỒ CHƠI MAGETIC ', gia:270000},
    {id:1019,chatlieu:'Nhựa',img: 'img/19.jpg', name : 'ĐỒ CHƠI MEGATIC 2', gia:330000},
    {id:1020,chatlieu:'Nhựa',img: 'img/20.jpg', name : 'BỘ ĐỒ CHƠI LẮP RÁP', gia:420000},
    {id:1021,chatlieu:'Nhựa',img: 'img/4.jpg', name : 'TẠO HÌNH NGHỆ THUẬT', gia:450000},
    {id:1022,chatlieu:'Nhựa',img: 'img/22.jpg', name : 'LEGO CLASSIC', gia:470000},
    {id:1023,chatlieu:'Nhựa',img: 'img/23.jpg', name : 'ROBOT', gia:120000},
    {id:1024,chatlieu:'Nhựa',img: 'img/24.jpg', name : 'LEGO', gia:140000},
    {id:1025,chatlieu:'Nhựa',img: 'img/1.jpg', name : 'ĐỒ CHƠI XẾP HÌNH', gia:550000},
    {id:1026,chatlieu:'Nhựa',img: 'img/26.jpg', name : 'ROBOT XANH TRẮNG', gia:230000},
    {id:1027,chatlieu:'Nhựa',img: 'img/3.jpg', name : 'BỘ ĐỒ CHƠI BINGO', gia:270000},
    {id:1028,chatlieu:'Nhựa',img: 'img/28.jpg', name : 'MÁY ẢNH', gia:280000},
    {id:1029,chatlieu:'Nhựa',img: 'img/29.jpg', name : 'ĐỒ CHƠI KHỐI', gia:560000},
    {id:1030,chatlieu:'Cao su',img: 'img/30.jpg', name : 'AMONG US', gia:200000},
    {id:1031,chatlieu:'Nhựa',img: 'img/31.jpg', name : 'MÁY SINH TỐ', gia:300000},
    {id:1032,chatlieu:'Nhựa',img: 'img/32.jpg', name : 'ĐỒ CHƠI BẾP', gia:400000},
    {id:1033,chatlieu:'Nhựa',img: 'img/33.jpg', name : 'ĐỒ CHƠI BÁC SĨ', gia:500000},
    {id:1034,chatlieu:'Gỗ',img: 'img/34.jpg', name : 'NHÀ GỖ', gia:600000},
    {id:1035,chatlieu:'Nhựa',img: 'img/35.jpg', name : 'ĐỒ CHƠI THỎ', gia:200000},
    {id:1036,chatlieu:'Nhựa',img: 'img/2.jpg', name : 'THÂY MA VÀ ĐẬU THẦN', gia:300000} 
];

function createproduct(){
    let item=localStorage.getItem('sanpham')?JSON.parse(localStorage.getItem('sanpham')) : [];
    let list=this.data
    if(localStorage.getItem('sanpham') === null){
        for (let i = 0; i < list.length; i++) {
            item.push(list[i]);
        }
    }
    localStorage.setItem('sanpham',JSON.stringify(item));       
}


// xuất dữ liệu ra trang 

function viewData1(){
    document.getElementById('sanpham1').style.display='block'
    document.getElementById('sanpham2').style.display='none'
    document.getElementById('sanpham3').style.display='none'
    document.getElementById('chitiet').style.display='none'
    var list= JSON.parse(localStorage.getItem('sanpham'));
    var dsItem=''
    let dem=0;
    for (let j = 0; j <3; j++) {
        dsItem +='<ul style=" list-style-type: none;display: flex;justify-content: space-around;" >'
        for(let i=dem;i < dem+4;i++){
            dsItem +='<div class="hanghoa"><li><div onclick="chitietInfo('+list[i].id+')"><img src="'+list[i].img+'" alt=""></div></li><p>'+list[i].name+'</p><div style="display:flex;justify-content: space-between;align-items: center;"><button style="color:white;background-color: #1E90FF;padding:9px;border-radius:5px" onclick="themvaogiohang('+list[i].id+')">Thêm vào giỏ</button><span style="color:red;font-size:20px">'+list[i].gia+' đ</span></div></div>'
        }
        dem=dem+4
        dsItem+='</ul>';
    }
    document.getElementById('sanpham1').innerHTML = dsItem;
}

function viewData2(){
    document.getElementById('sanpham1').style.display='none'
    document.getElementById('sanpham2').style.display='block'
    document.getElementById('sanpham3').style.display='none'
    document.getElementById('chitiet').style.display='none'
    var list= JSON.parse(localStorage.getItem('sanpham'));
    var dsItem=''
    let dem=12;
    for (let j = 0; j <3; j++) {
        dsItem +='<ul style=" list-style-type: none;display: flex;justify-content: space-around;" >'
        for(let i=dem;i < dem+4;i++){
            dsItem +='<div class="hanghoa"><li><div onclick="chitietInfo('+list[i].id+')"><img src="'+list[i].img+'" alt=""></div></li><p>'+list[i].name+'</p><div style="display:flex;justify-content: space-between;align-items: center;"><button style="color:white;background-color: #1E90FF;padding:9px;border-radius:5px" onclick="themvaogiohang('+list[i].id+')">Thêm vào giỏ</button><span style="color:red;font-size:20px">'+list[i].gia+' đ</span></div></div>'
        }
        dem=dem+4
        dsItem+='</ul>';
    }
    document.getElementById('sanpham2').innerHTML = dsItem;
}

function viewData3(){
    document.getElementById('sanpham1').style.display='none'
    document.getElementById('sanpham2').style.display='none'
    document.getElementById('sanpham3').style.display='block'
    document.getElementById('chitiet').style.display='none'
    var list= JSON.parse(localStorage.getItem('sanpham'));
    var dsItem=''
    let dem=24;
    for (let j = 0; j <3; j++) {
        dsItem +='<ul style=" list-style-type: none;display: flex;justify-content: space-around;" >'
        for(let i=dem;i < dem+4;i++){
            dsItem +='<div class="hanghoa"><li><div onclick="chitietInfo('+list[i].id+')"><img src="'+list[i].img+'" alt=""></div></li><p>'+list[i].name+'</p><div style="display:flex;justify-content: space-between;align-items: center;"><button style="color:white;background-color: #1E90FF;padding:9px;border-radius:5px" onclick="themvaogiohang('+list[i].id+')">Thêm vào giỏ</button><span style="color:red;font-size:20px">'+list[i].gia+' đ</span></div></div>'
        }
        dem=dem+4
        dsItem+='</ul>';
    }
    document.getElementById('sanpham3').innerHTML = dsItem;
}

function xe(){
    document.getElementById('chitiet2').style.display='none'
    var list= JSON.parse(localStorage.getItem('sanpham'));
    var dsItem=''
    let dem=0;
    for (let j = 0; j <2; j++) {
        dsItem +='<ul style=" list-style-type: none;display: flex;justify-content: space-around;" >'
        for(let i=dem;i < dem+4;i++){
            dsItem +='<div class="hanghoa"><li><div onclick="chitietInfo2('+list[i].id+')"><img src="../'+list[i].img+'" alt=""></div></li><p>'+list[i].name+'</p><div style="display:flex;justify-content: space-between;align-items: center;"><button style="color:white;background-color: #1E90FF;padding:9px;border-radius:5px" onclick="themvaogiohang('+list[i].id+')">Thêm vào giỏ</button><span style="color:red;font-size:20px">'+list[i].gia+' đ</span></div></div>'
        }
        dem=dem+4
        dsItem+='</ul>';
    }
    document.getElementById('xemohinh').innerHTML = dsItem;
}

function bupbe(){
    document.getElementById('chitiet3').style.display='none'
    var list= JSON.parse(localStorage.getItem('sanpham'));
    var dsItem=''
    let dem=9;
    for (let j = 0; j <2; j++) {
        dsItem +='<ul style=" list-style-type: none;display: flex;justify-content: space-around;" >'
        for(let i=dem;i < dem+4;i++){
            dsItem +='<div class="hanghoa"><li><div onclick="chitietInfo3('+list[i].id+')"><img src="../'+list[i].img+'" alt=""></div></li><p>'+list[i].name+'</p><div style="display:flex;justify-content: space-between;align-items: center;"><button style="color:white;background-color: #1E90FF;padding:9px;border-radius:5px" onclick="themvaogiohang('+list[i].id+')">Thêm vào giỏ</button><span style="color:red;font-size:20px">'+list[i].gia+' đ</span></div></div>'
        }
        dem=dem+4
        dsItem+='</ul>';
    }
    document.getElementById('bupbe').innerHTML = dsItem;
}

function nhua(){
    document.getElementById('chitiet4').style.display='none'
    var list= JSON.parse(localStorage.getItem('sanpham'));
    var dsItem=''
    let dem=17;
    for (let j = 0; j <2; j++) {
        dsItem +='<ul style=" list-style-type: none;display: flex;justify-content: space-around;" >'
        for(let i=dem;i < dem+4;i++){
            dsItem +='<div class="hanghoa"><li><div onclick="chitietInfo4('+list[i].id+')"><img src="../'+list[i].img+'" alt=""></div></li><p>'+list[i].name+'</p><div style="display:flex;justify-content: space-between;align-items: center;"><button style="color:white;background-color: #1E90FF;padding:9px;border-radius:5px" onclick="themvaogiohang('+list[i].id+')">Thêm vào giỏ</button><span style="color:red;font-size:20px">'+list[i].gia+' đ</span></div></div>'
        }
        dem=dem+4
        dsItem+='</ul>';
    }
    document.getElementById('nhua').innerHTML = dsItem;
}


// chi tiết sản phẩm
function chitietInfo(productID){
    document.getElementById('chitiet').style.display='block';
    var productArr=JSON.parse(localStorage.getItem('sanpham'));
    for( i=0;i<productArr.length;i++){
        if(productArr[i].id===productID){
            document.getElementById('name').innerHTML='<span style="color:red">Sản phẩm: '+productArr[i].name+'</span>';
            document.getElementById('gia').innerHTML='<span style="color:red">Giá: '+productArr[i].gia+' VNĐ</span>';
            document.getElementById('chatlieu').innerHTML='<span style="color:red">Chất liệu: '+productArr[i].chatlieu+'<br>Bảo hành: 12 tháng</span>';
            document.getElementById('img').src=productArr[i].img;
        };
    }
}

function closeChitiet(){
    document.getElementById('chitiet').style.display='none';
}

function chitietInfo1(productID){
    document.getElementById('chitiet1').style.display='block';
    var productArr=JSON.parse(localStorage.getItem('sanpham'));
    for( i=0;i<productArr.length;i++){
        if(productArr[i].id===productID){
            document.getElementById('name1').innerHTML='<span style="color:red">Sản phẩm: '+productArr[i].name+'</span>';
            document.getElementById('gia1').innerHTML='<span style="color:red">Giá: '+productArr[i].gia+' VNĐ</span>';
            document.getElementById('chatlieu1').innerHTML='<span style="color:red">Chất liệu: '+productArr[i].chatlieu+'<br>Bảo hành: 12 tháng</span>';
            document.getElementById('img1').src=productArr[i].img;
        };
    }
}

function closeChitiet1(){
    document.getElementById('chitiet1').style.display='none';
}

function chitietInfo2(productID){
    document.getElementById('chitiet2').style.display='block';
    var productArr=JSON.parse(localStorage.getItem('sanpham'));
    for( i=0;i<productArr.length;i++){
        if(productArr[i].id===productID){
            document.getElementById('name2').innerHTML='<span style="color:red">Sản phẩm: '+productArr[i].name+'</span>';
            document.getElementById('gia2').innerHTML='<span style="color:red">Giá: '+productArr[i].gia+' VNĐ</span>';
            document.getElementById('chatlieu2').innerHTML='<span style="color:red">Chất liệu: '+productArr[i].chatlieu+'<br>Bảo hành: 12 tháng</span>';
            document.getElementById('img2').src='../'+productArr[i].img+'';
        };
    }
}

function closeChitiet2(){
    document.getElementById('chitiet2').style.display='none';
}

function chitietInfo3(productID){
    document.getElementById('chitiet3').style.display='block';
    var productArr=JSON.parse(localStorage.getItem('sanpham'));
    for( i=0;i<productArr.length;i++){
        if(productArr[i].id===productID){
            document.getElementById('name3').innerHTML='<span style="color:red">Sản phẩm: '+productArr[i].name+'</span>';
            document.getElementById('gia3').innerHTML='<span style="color:red">Giá: '+productArr[i].gia+' VNĐ</span>';
            document.getElementById('chatlieu3').innerHTML='<span style="color:red">Chất liệu: '+productArr[i].chatlieu+'<br>Bảo hành: 12 tháng</span>';
            document.getElementById('img3').src='../'+productArr[i].img+'';
        };
    }
}

function closeChitiet3(){
    document.getElementById('chitiet3').style.display='none';
}

function chitietInfo4(productID){
    document.getElementById('chitiet4').style.display='block';
    var productArr=JSON.parse(localStorage.getItem('sanpham'));
    for( i=0;i<productArr.length;i++){
        if(productArr[i].id===productID){
            document.getElementById('name4').innerHTML='<span style="color:red">Sản phẩm: '+productArr[i].name+'</span>';
            document.getElementById('gia4').innerHTML='<span style="color:red">Giá: '+productArr[i].gia+' VNĐ</span>';
            document.getElementById('chatlieu4').innerHTML='<span style="color:red">Chất liệu: '+productArr[i].chatlieu+'<br>Bảo hành: 12 tháng</span>';
            document.getElementById('img4').src='../'+productArr[i].img+'';
        };
    }
}

function closeChitiet4(){
    document.getElementById('chitiet4').style.display='none';
}


// tìm kiếm sản phẩm

function timkiemSanpham(){
    document.getElementById('timkiem-sanpham').style.display='block'
    document.getElementById('bannerr').style.display='none'
    document.getElementById('sanpham').style.display='none'
    document.getElementById('chitiet1').style.display='none'
    var search=document.getElementById('timkiem').value.toUpperCase();
    var dsItem='';
    var dem=1;
    var item= JSON.parse(localStorage.getItem('sanpham'));
    dsItem +='<ul style=" list-style-type: none;">'
    for(let i=0;i<item.length;i++){
        if(item[i].name.includes(search)){
            dem++;
            dsItem +='<div class="hanghoa" style="width:250px;"><li><div onclick="chitietInfo1('+item[i].id+')"><img src="'+item[i].img+'" alt=""></div></li><p>'+item[i].name+'</p><div style="display:flex;justify-content: space-between;align-items: center;"><button style="color:white;background-color: #1E90FF;padding:9px;border-radius:5px" onclick="themvaogiohang('+item[i].id+')">Thêm vào giỏ</button><span style="color:red;font-size:20px">'+item[i].gia+' đ</span></div></div>'
            if(dem==4){
                dsItem+='<br>'
            }
        }
    }
    dsItem+='</ul>';
    if(search==='') dsItem='';
    document.getElementById('ds-timkiem-sanpham').innerHTML = dsItem;
}

// Giỏ hàng
function themvaogiohang(id){
    var itemArr = JSON.parse(localStorage.getItem('sanpham'));
    var soluong;
    if(soluong==null){
        soluong=1;
    }
    else{
        soluong=document.getElementById('soluong').value;
    }
    var itemTemp;
    for (var i = 0; i < itemArr.length; i++) {
        if (itemArr[i].id === id) {
            itemTemp = itemArr[i];
        }
    }
    
    if (localStorage.getItem('giohang') === null || localStorage.getItem('giohang') === '[]') {
        var giohangArr = [];
        itemTemp.soluong = soluong;
        itemTemp.tongtien = soluong * itemTemp.gia;
        giohangArr.unshift(itemTemp);
        localStorage.setItem('giohang', JSON.stringify(giohangArr));

    } else {
        var giohangArr = JSON.parse(localStorage.getItem('giohang'));
        var checkTontai=false;
        for (let i = 0; i < giohangArr.length; i++) {
            if(giohangArr[i].id==itemTemp.id){
                alert('Sản phẩm đã có trong giỏ hàng.')
                itemTemp.soluong++;
                checkTontai=true;
            }
        }
        if(checkTontai==false){
            itemTemp.soluong = soluong;
            itemTemp.tongtien = soluong * itemTemp.gia;
            giohangArr.unshift(itemTemp);
            localStorage.setItem('giohang', JSON.stringify(giohangArr));
        }
    }
}
    

function xoaItemGiahang(id) {
    var giohangArr = JSON.parse(localStorage.getItem('giohang'));
    for (var i = 0; i < giohangArr.length; i++) {
        if (giohangArr[i].id == id) {
            if(confirm('Bạn muôn xóa sản phẩm này ?')){
                giohangArr.splice(i, 1);
            }
        }
    }
    localStorage.setItem('giohang', JSON.stringify(giohangArr));
    showGiohang()
}

function xoaGiohang() {
    if(confirm('Bạn muốn xóa tất cả chứ ?')){
        localStorage.removeItem('giohang');
    }
    showGiohang()
}

function updateGiohang(soluong, id) {
    var giohangArr = JSON.parse(localStorage.getItem('giohang'));
    for (var i = 0; i < giohangArr.length; i++) {
        if (giohangArr[i].id == id) {
            giohangArr[i].soluong = soluong;
        }
    }
    localStorage.setItem('giohang', JSON.stringify(giohangArr));
    showGiohang()
}

function giamSoluong(id) {
    var giohangArr = JSON.parse(localStorage.getItem('giohang'));
    for (var i = 0; i < giohangArr.length; i++) {
        if (giohangArr[i].id === id) {
            if (giohangArr[i].soluong > 1) giohangArr[i].soluong--;
        }
    }
    localStorage.setItem('giohang', JSON.stringify(giohangArr));
    showGiohang()
}

function tangSoluong(id) {
    var giohangArr = JSON.parse(localStorage.getItem('giohang'));
    for (var i = 0; i < giohangArr.length; i++) {
        if (giohangArr[i].id === id) {
            giohangArr[i].soluong++;
        }
    }
    localStorage.setItem('giohang', JSON.stringify(giohangArr));
    showGiohang()
}

function showGiohang(){
    var tongtien=0;
    var thanhtien=0;
    if (localStorage.getItem('giohang') === null || localStorage.getItem('giohang') == '[]') {
        var s = '<tr><th>Không có sản phẩm nào trong giỏ hàng</th></tr>';
        document.getElementById('giohangrong').innerHTML = s;
        document.getElementById('tongtien').innerHTML = 0;
    } else {
        var giohangArr=localStorage.getItem('giohang')?JSON.parse(localStorage.getItem('giohang')) : [];
        var s = '<tr><th>Sản phẩm</th><th>Tên</th><th>Giá gốc</th><th>Số lượng</th><th>Tổng</th></tr>';
        
        for (var i = 0; i < giohangArr.length; i++) {
            thanhtien+=giohangArr[i].gia * giohangArr[i].soluong;
            tongtien = giohangArr[i].gia * giohangArr[i].soluong;
            s+='<tr><td><img src="../' + giohangArr[i].img + '" height="50px"></td><td>' + giohangArr[i].name +'</td><td>' + giohangArr[i].gia + '</td><td><button onClick="giamSoluong('+giohangArr[i].id+')">-</button><input id="soluong" type="text" disabled value="' + giohangArr[i].soluong + '"onchange="updateGiohang('+giohangArr[i].soluong+','+giohangArr[i].id+')"><button onClick="tangSoluong('+giohangArr[i].id+')">+</button></td><td>'+tongtien+'</td><td><button onClick="xoaItemGiahang('+giohangArr[i].id+')">&times;</button></td></tr>'
           
        }
        document.getElementById('giohangrong').innerHTML = s;
        document.getElementById('tongtien').innerHTML = thanhtien;
    }
}

function muaHang() {
    var giohangArr = JSON.parse(localStorage.getItem('giohang'));
    if (localStorage.getItem('userlogin') === null) {
        alert('Bạn phải đăng nhập để mua sản phẩm', 'warning');
        window.location='dangnhap.html'
        return false;
    }
    var userLoginArr=localStorage.getItem('userlogin')?JSON.parse(localStorage.getItem('userlogin')) : [];
    if(userLoginArr.username == 'admin'){
        alert('Không thể mua hàng bằng tải khoản admin!!!')
        localStorage.removeItem('giohang');
        localStorage.removeItem('hoadon');
        return false
    }
    var info = '';
    var thanhtien = 0;
    if (localStorage.getItem('giohang') === null || localStorage.getItem('giohang') == '[]') {
        alert('Không có sản phẩm...')
        return false;
    }
    for (var i = 0; i < giohangArr.length; i++) {
        info += giohangArr[i].soluong + ' x ' + giohangArr[i].name +'<br>';
        thanhtien += giohangArr[i].soluong * giohangArr[i].gia;
    }
    var customer = JSON.parse(localStorage.getItem('userlogin'));
    var date = new Date();
    var d = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    if (localStorage.getItem('hoadon') === null) {
        var hoadonArr = [];
        var hoadon = { id: hoadonArr.length, info: info, thanhtien: thanhtien, customer: customer, date: d, status: 'Đã thanh toán' };
        hoadonArr.unshift(hoadon);
        localStorage.setItem('hoadon', JSON.stringify(hoadonArr));
    } else {
        var hoadonArr = JSON.parse(localStorage.getItem('hoadon'));
        var hoadon = { id: hoadonArr.length, info: info, thanhtien: thanhtien, customer: customer, date: d, status: 'Đã thanh toán' };
        hoadonArr.unshift(hoadon);
        localStorage.setItem('hoadon', JSON.stringify(hoadonArr));
    }
    localStorage.removeItem('giohang');
    showGiohang();
    showHoadon();
}



function closeHoadon(){
    document.getElementById('hoadon').style.display = 'none';
}


function showHoadon() {
    if (localStorage.getItem('hoadon') === null) {
        document.getElementById('hoadon').style.display = 'none';
    } else {
        var user = JSON.parse(localStorage.getItem('userlogin'))
        var hoadonArr = JSON.parse(localStorage.getItem('hoadon'));
        var s = '<h2>Đơn hàng đã đặt</h2>';
        for (var i = 0; i < hoadonArr.length; i++) {
            if (user.username == hoadonArr[i].customer.username) {
                document.getElementById('hoadon').style.display = 'block';
                s += '<div class="">' +
                    '<div><span style="color:blue">' + hoadonArr[i].info + '</span></div>' +
                    '<div>Tổng đơn: ' + hoadonArr[i].thanhtien + '</div>' +
                    '<div>Ngày xuất: ' + hoadonArr[i].date + '</div>' +
                    '<div>Tình trạng:<span style="color:red"> ' + hoadonArr[i].status + '</span></div>' +
                    '<div style="text-align:center"><button onclick="closeHoadon()" style="text-align: background-color: #A9A9A9; color:black;padding:5px">Close</button></div>'+'</div>';
            }
            break;
        }
        document.getElementById('hoadon').innerHTML = s;
    }
}

// end Giỏ hàng

//lịch sử mua hàng của user
function showLichSuMuaHang(){
    var hoadonArr=localStorage.getItem('hoadon')?JSON.parse(localStorage.getItem('hoadon')) : [];
    var userLoginArr=localStorage.getItem('userlogin')?JSON.parse(localStorage.getItem('userlogin')) : [];  
    if(userLoginArr.username==null || userLoginArr.username==[]){
        alert('Đăng nhập tài khoản để xem!!')
        return false
    }
    else{
        document.getElementById('khachhang').innerHTML='<h1 ">Lịch sử mua hàng của<span style="color: red"> '+userLoginArr.name+'</span></h1>'
        var s='<tr><th>STT</th><th>Thông tin</th><th>Thành tiền</th><th>Ngày xuất</th><th>Tên khách hàng</th><th>Tình trạng</th></tr>'
        var dem=1
        for (let i = 0; i < hoadonArr.length; i++) {
            if(hoadonArr[i].customer.username == userLoginArr.username){
                s+='<tr><td>'+(dem++)+'</td><td>'+hoadonArr[i].info+'</td><td>'+hoadonArr[i].thanhtien+' VNĐ</td><td>'+hoadonArr[i].date+'</td><td>'+hoadonArr[i].customer.name+'</td><td style="color:red">'+hoadonArr[i].status+'</td></tr>'
                document.getElementById('lichsumuahang').innerHTML=s;
            }
        }
    }
}
