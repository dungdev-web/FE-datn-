import "../css/about.css";
import "../css/style.css";
export default function About(){
    return(
        <main>
        <div className="intro-banner">
            <div className="intro-content">
                <h1>GIỚI THIỆU</h1>
                <p><a href="/index.html">Trang chủ</a> • Giới thiệu</p>
            </div>
        </div>
        <div className="about-us">
            <div className="about-text">
                <h2>VỀ CHÚNG TÔI</h2>
                <p>TeRaShoe là một cửa hàng chuyên kinh doanh thời trang thể thao chất lượng cao với mục tiêu mang
                    đến cho khách hàng những sản phẩm đẳng cấp, chất lượng và sự thoải mái khi vận động. Với đội ngũ
                    nhân viên giàu kinh nghiệm và đam mê về thể thao, HaluShoe cam kết cung cấp những sản phẩm chất
                    lượng tốt nhất và chăm sóc khách hàng một cách chuyên nghiệp.</p>
            </div>
            <div className="about-image">
                <img src="/images/banner/Teamwork.jpg" alt="images" />
            </div>
        </div>


        <div className="timeline-container">
            <div className="timeline-line"></div>

            <div className="timeline-item left">
                <div className="timeline-content">
                    <div className="timeline-year">2010</div>
                    <h1 className="h1">Khai trương</h1>
                    <div className="p">Cửa hàng TeRaShoe có những điểm nổi bật như thiết kế đa dạng, phong phú và độc đáo, phù hợp
                        với nhiều loại hình thể thao. Ngoài ra, sản phẩm của TeRaShoe được làm từ các chất liệu cao
                        cấp, đảm bảo sự thoải mái và độ bền cao cho người sử dụng.</div>
                </div>
            </div>

            <div className="timeline-item right">
                <div className="timeline-content">
                    <div className="timeline-year">2015</div>
                    <h1 className="h1">
                        Đặt hàng online</h1>
                    <div className="p">TeRaShoe đã mở thêm 5 cửa hàng, nâng tổng số cửa hàng lên 20 cửa hàng và trở thành chuỗi
                        cửa hàng phát triển nhanh nhất tại Việt Nam.</div>
                </div>
            </div>

            <div className="timeline-item left">
                <div className="timeline-content">
                    <div className="timeline-year">2017</div>
                    <h1 className="h1">40 Cửa hàng</h1>
                    <div className="p">TeRaShoe đã mở cửa hàng thứ 40 bên ngoài Việt Nam. Domino's kỷ niệm 12 năm phát triển trên
                        khắp thế giới. Đồng thời, doanh thu toàn cầu đạt hơn 100 tỷ VNĐ.</div>
                </div>
            </div>
        </div>





    </main>
    )
}