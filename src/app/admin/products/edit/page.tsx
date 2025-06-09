"use client";
import "@/src/app/admin/css/product_admin.css";
import Link from "next/link";
export default function Products_Add() {
return (
    <main class="main-content">
            <div class="header-bar">
                <div class="header-left">
                    <button class="btn btn-back"><i class="fa-solid fa-arrow-left"></i> Trở về</button>
                    <button class="btn-add" type="submit" form="add-product-form">
                        <i class="fa fa-plus"></i> Thêm sản phẩm
                    </button>
                </div>
            </div>

            <!-- Tabs -->
            <div class="tabs">
                <div class="tab active">Thông tin sản phẩm</div>
                <div class="tab">Nhập số lượng sản phẩm</div>
                <div class="tab">Thêm ảnh feedback cho sản phẩm</div>
            </div>

            <!-- Nội dung tab 1: Thông tin sản phẩm -->
            <div class="tab-content" style="display: block;">
                <form id="add-product-form" class="add-product-form">
                    <div class="form-grid">
                        <!-- LEFT -->
                        <div>
                            <div class="form-group">
                                <label for="ten_sp">Tên sản phẩm *</label>
                                <input type="text" id="ten_sp" name="ten_sp" value="VANS VAULT STYLE 36 BLACK" required>
                            </div>
                            <div class="form-group">
                                <label for="mo_ta">Mô tả *</label>
                                <textarea id="mo_ta" name="mo_ta">🔸 <a href="#">Chất lượng</a> Rep 1:1  
- Nên mang lên 1 size so với tiêu chuẩn  
- Vận chuyển toàn quốc | Kiểm Tra Hàng Trước Khi Thanh Toán  
- 100% Ảnh chụp trực tiếp tại Tu Shoes  
- Bảo Hành Trọn Đời Sản Phẩm  
- Đổi Trả 7 Ngày Không Kể Lý Do</textarea>
                            </div>
                        </div>

                        <!-- RIGHT -->
                        <div>
                            <div class="form-group">
                                <label for="trang_thai">Trạng thái</label>
                                <select id="trang_thai">
                                    <option>Mở bán</option>
                                    <option>Ngưng bán</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="nhan_hieu">Nhãn hiệu sản phẩm *</label>
                                <select id="nhan_hieu">
                                    <option selected>VANZ</option>
                                    <option>Nike</option>
                                    <option>Adidas</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Danh mục sản phẩm *</label>
                                <div class="dropdown-multiselect" id="danh-muc-wrapper">
                                    <div class="dropdown-selected" id="dropdown-selected">Chọn danh mục</div>
                                    <div class="dropdown-options" id="dropdown-options">
                                        <label><input type="checkbox" value="Giày Nam"> Giày Nam</label>
                                        <label><input type="checkbox" value="Giày Nữ"> Giày Nữ</label>
                                        <label><input type="checkbox" value="Giày Trẻ em"> Giày Trẻ em</label>
                                        <label><input type="checkbox" value="Sneaker"> Sneaker</label>
                                        <label><input type="checkbox" value="Chạy bộ"> Chạy bộ</label>
                                        <label><input type="checkbox" value="Thể thao"> Thể thao</label>
                                    </div>
                                </div>
                                <div id="selected-tags" class="tags-input" style="margin-top: 10px;"></div>
                            </div>

                            <div class="form-group">
                                <label for="gia_goc">
                                    Giá gốc tham khảo (VND)
                                    <small>(Giá này sẽ được dùng mặc định nếu không nhập giá riêng trong tab 2)</small>
                                </label>
                                <input type="number" id="gia_goc" name="gia_goc" value="">
                            </div>

                            <div class="form-group">
                                <label for="gia_ban">
                                    Giá bán tham khảo (VND)
                                    <small>(Giá này sẽ được dùng mặc định nếu không nhập giá riêng trong tab 2)</small>
                                </label>
                                <input type="number" id="gia_ban" name="gia_ban" value="">
                            </div>

                        </div>
                    </div>
                </form>

                <div class="form-group">
                    <label>Ảnh sản phẩm <small>(Lưu ý: Nền đế nền trắng)</small></label>
                    <div class="product-images">
                        <div class="image-thumb"><img src="/images/products/chaybo/ConverseRunStarMotion(1).webp"
                                alt="Ảnh 1"></div>
                        <div class="image-thumb"><img src="/images/products/chaybo/ConverseRunStarMotion(2).webp"
                                alt="Ảnh 2"></div>
                        <div class="image-thumb"><img src="/images/products/chaybo/ConverseRunStarMotion(3).webp"
                                alt="Ảnh 3"></div>
                        <div class="image-thumb"><img src="/images/products/chaybo/ConverseRunStarMotion.webp"
                                alt="Ảnh 4"></div>
                    </div>
                    <button type="button" class="choose-image-btn">Chọn ảnh</button>
                </div>
            </div>

            <!-- Nội dung tab 2: Nhập số lượng sản phẩm -->
            <div class="tab-content" id="so-luong-tab" style="display: none;">
                <div class="form-group">
                    <label>Nhập biến thể sản phẩm (Màu - Size - Giá - Số lượng)</label>
                    <div id="variant-list">
                        <div class="variant-row"
                            style="display: flex; gap: 10px; margin-bottom: 10px; align-items: center;">
                            <div class="custom-select-wrapper" style="flex: 1;">
                                <div class="custom-select" onclick="toggleDropdown(this)">
                                    <div class="selected-option">
                                        <span class="color-circle" style="background-color: black;"></span>
                                        <span class="color-name">Đen</span>
                                    </div>


                                    <div class="dropdown">
                                        <input type="text" class="color-search" placeholder="Tìm màu..."
                                            onkeyup="filterColors(this)">
                                        <div class="dropdown-option" data-value="black|Đen" style="--color: black;">
                                            <span class="color-circle"></span><span class="color-name">Đen</span>
                                        </div>
                                        <div class="dropdown-option" data-value="white|Trắng" style="--color: white;">
                                            <span class="color-circle"></span><span class="color-name">Trắng</span>
                                        </div>
                                        <div class="dropdown-option" data-value="gray|Xám" style="--color: gray;">
                                            <span class="color-circle"></span><span class="color-name">Xám</span>
                                        </div>
                                        <div class="dropdown-option" data-value="lightgray|Xám nhạt"
                                            style="--color: lightgray;">
                                            <span class="color-circle"></span><span class="color-name">Xám nhạt</span>
                                        </div>
                                        <div class="dropdown-option" data-value="red|Đỏ" style="--color: red;">
                                            <span class="color-circle"></span><span class="color-name">Đỏ</span>
                                        </div>
                                        <div class="dropdown-option" data-value="darkred|Đỏ đậm"
                                            style="--color: darkred;">
                                            <span class="color-circle"></span><span class="color-name">Đỏ đậm</span>
                                        </div>
                                        <div class="dropdown-option" data-value="maroon|Nâu đỏ"
                                            style="--color: maroon;">
                                            <span class="color-circle"></span><span class="color-name">Nâu đỏ</span>
                                        </div>
                                        <div class="dropdown-option" data-value="pink|Hồng" style="--color: pink;">
                                            <span class="color-circle"></span><span class="color-name">Hồng</span>
                                        </div>
                                        <div class="dropdown-option" data-value="hotpink|Hồng đậm"
                                            style="--color: hotpink;">
                                            <span class="color-circle"></span><span class="color-name">Hồng đậm</span>
                                        </div>
                                        <div class="dropdown-option" data-value="blue|Xanh dương"
                                            style="--color: blue;">
                                            <span class="color-circle"></span><span class="color-name">Xanh dương</span>
                                        </div>
                                        <div class="dropdown-option" data-value="navy|Xanh navy" style="--color: navy;">
                                            <span class="color-circle"></span><span class="color-name">Xanh navy</span>
                                        </div>
                                        <div class="dropdown-option" data-value="skyblue|Xanh da trời"
                                            style="--color: skyblue;">
                                            <span class="color-circle"></span><span class="color-name">Xanh da
                                                trời</span>
                                        </div>
                                        <div class="dropdown-option" data-value="teal|Xanh ngọc" style="--color: teal;">
                                            <span class="color-circle"></span><span class="color-name">Xanh ngọc</span>
                                        </div>
                                        <div class="dropdown-option" data-value="green|Xanh lá" style="--color: green;">
                                            <span class="color-circle"></span><span class="color-name">Xanh lá</span>
                                        </div>
                                        <div class="dropdown-option" data-value="lime|Xanh neon" style="--color: lime;">
                                            <span class="color-circle"></span><span class="color-name">Xanh neon</span>
                                        </div>
                                        <div class="dropdown-option" data-value="olive|Xanh oliu"
                                            style="--color: olive;">
                                            <span class="color-circle"></span><span class="color-name">Xanh oliu</span>
                                        </div>
                                        <div class="dropdown-option" data-value="orange|Cam" style="--color: orange;">
                                            <span class="color-circle"></span><span class="color-name">Cam</span>
                                        </div>
                                        <div class="dropdown-option" data-value="darkorange|Cam đậm"
                                            style="--color: darkorange;">
                                            <span class="color-circle"></span><span class="color-name">Cam đậm</span>
                                        </div>
                                        <div class="dropdown-option" data-value="yellow|Vàng" style="--color: yellow;">
                                            <span class="color-circle"></span><span class="color-name">Vàng</span>
                                        </div>
                                        <div class="dropdown-option" data-value="gold|Vàng kim" style="--color: gold;">
                                            <span class="color-circle"></span><span class="color-name">Vàng kim</span>
                                        </div>
                                        <div class="dropdown-option" data-value="beige|Be" style="--color: beige;">
                                            <span class="color-circle"></span><span class="color-name">Be</span>
                                        </div>
                                        <div class="dropdown-option" data-value="ivory|Trắng ngà"
                                            style="--color: ivory;">
                                            <span class="color-circle"></span><span class="color-name">Trắng ngà</span>
                                        </div>
                                        <div class="dropdown-option" data-value="purple|Tím" style="--color: purple;">
                                            <span class="color-circle"></span><span class="color-name">Tím</span>
                                        </div>
                                        <div class="dropdown-option" data-value="violet|Tím nhạt"
                                            style="--color: violet;">
                                            <span class="color-circle"></span><span class="color-name">Tím nhạt</span>
                                        </div>
                                        <div class="dropdown-option" data-value="indigo|Chàm" style="--color: indigo;">
                                            <span class="color-circle"></span><span class="color-name">Chàm</span>
                                        </div>
                                        <div class="dropdown-option" data-value="brown|Nâu" style="--color: brown;">
                                            <span class="color-circle"></span><span class="color-name">Nâu</span>
                                        </div>
                                        <div class="dropdown-option" data-value="saddlebrown|Nâu yên ngựa"
                                            style="--color: saddlebrown;">
                                            <span class="color-circle"></span><span class="color-name">Nâu yên
                                                ngựa</span>
                                        </div>
                                        <div class="dropdown-option" data-value="chocolate|Socola"
                                            style="--color: chocolate;">
                                            <span class="color-circle"></span><span class="color-name">Socola</span>
                                        </div>
                                        <div class="dropdown-option" data-value="silver|Bạc" style="--color: silver;">
                                            <span class="color-circle"></span><span class="color-name">Bạc</span>
                                        </div>
                                        <div class="dropdown-option" data-value="cyan|Xanh cyan" style="--color: cyan;">
                                            <span class="color-circle"></span><span class="color-name">Xanh cyan</span>
                                        </div>
                                        <div class="dropdown-option" data-value="magenta|Hồng tím"
                                            style="--color: magenta;">
                                            <span class="color-circle"></span><span class="color-name">Hồng tím</span>
                                        </div>
                                    </div>

                                </div>
                                <input type="hidden" name="color[]" value="black|Đen" />
                            </div>
                            <input type="text" name="size[]" placeholder="Size (VD: 39)" style="flex: 1;" />
                            <input type="number" name="price[]" placeholder="Giá bán (VND)" style="flex: 1;" />
                            <input type="number" name="price[]" placeholder="Giá khuyến mãi (VND)" style="flex: 1;" />
                            <input type="number" name="quantity[]" placeholder="Số lượng" style="flex: 1;" />
                            <button type="button" class="btn btn-add-variant">+</button>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Nội dung tab 3: Ảnh feedback -->
            <div class="tab-content" id="feedback-tab" style="display: none;">
                <div class="form-group">
                    <label>Thêm ảnh feedback từ khách hàng</label>
                    <div class="product-images">
                        <!-- Ảnh ví dụ hoặc trống -->
                    </div>
                    <button type="button" class="choose-image-btn">Tải ảnh lên</button>
                </div>
            </div>
        </main>
)
}