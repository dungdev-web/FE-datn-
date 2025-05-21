import "../css/product.css";
import "../css/account.css";
export default function Account(){
    return(
        <>
        <main>
            <div className="container1">
                <div className="row">
            
            <div className="col-xs-12 col-sm-12 col-lg-3 col-left-ac">
                <div className="block-account">
                    <h5 className="title-account">Trang tài khoản</h5>
                    <p>Xin chào, <span >cccc</span>&nbsp;!</p>
                    <ul>
						<li><a className="title-info" href="/account/logout" title="Đăng xuất">Đăng xuất</a></li>
                        <li>
                            <a  className="title-info active" href="javascript:void(0);">Thông tin tài khoản</a>
                        </li>
						
                        <li>
                            <a className="title-info" href="/account/orders">Đơn hàng của bạn</a>
                        </li>
                        <li>
                            <a className="title-info" href="/account/changepassword">Đổi mật khẩu</a>
                        </li>
                        <li>
                            <a className="title-info" href="/account/addresses">Sổ địa chỉ (1)</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">
                <h1 className="title-head margin-top-0">Thông tin tài khoản</h1>
                <div className="form-signup name-account m992">
                    <p><strong>Họ tên:</strong>  cccc</p>
                    <p> <strong>Email:</strong> dungldps41484@gmail.com</p>
                    
                    <p> <strong>Điện thoại:</strong> +84775895973 </p>
                    
                    
                    
                    <p><strong>Địa chỉ :</strong> 76 Đường 6 KP4 Bình Trưng Tây, TP. Thủ Đức, Hồ Chí Minh, Quận 3, TP Hồ Chí Minh, Vietnam</p>
                    
                </div>

            </div>
        </div>
            </div>
        </main>
        </>
    )
}