"use client";
import "@/src/app/admin/css/product_add_admin.css";
import Link from "next/link";
export default function Products_Add() {
return (
    <main className="main-content">
      <div className="header-bar">
        <div className="header-left">
          <button className="btn btn-back">
            <i className="fa-solid fa-arrow-left"></i> Trở về
          </button>
          <button className="btn-add" type="submit" form="add-product-form">
            <i className="fa fa-plus"></i> Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div className="tab active">Thông tin sản phẩm</div>
        <div className="tab">Nhập số lượng sản phẩm</div>
        <div className="tab">Thêm ảnh feedback cho sản phẩm</div>
      </div>

      {/* Nội dung tab 1: Thông tin sản phẩm */}
      <div className="tab-content" style={{ display: "block" }}>
        <form id="add-product-form" className="add-product-form">
          <div className="form-grid">
            {/* LEFT */}
            <div>
              <div className="form-group">
                <label htmlFor="ten_sp">Tên sản phẩm *</label>
                <input
                  type="text"
                  id="ten_sp"
                  name="ten_sp"
                  defaultValue="VANS VAULT STYLE 36 BLACK"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mo_ta">Mô tả *</label>
                <textarea
                  id="mo_ta"
                  name="mo_ta"
                  defaultValue={`🔸 Chất lượng Rep 1:1  
- Nên mang lên 1 size so với tiêu chuẩn  
- Vận chuyển toàn quốc | Kiểm Tra Hàng Trước Khi Thanh Toán  
- 100% Ảnh chụp trực tiếp tại Tu Shoes  
- Bảo Hành Trọn Đời Sản Phẩm  
- Đổi Trả 7 Ngày Không Kể Lý Do`}
                ></textarea>
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <div className="form-group">
                <label htmlFor="trang_thai">Trạng thái</label>
                <select id="trang_thai">
                  <option>Mở bán</option>
                  <option>Ngưng bán</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="nhan_hieu">Nhãn hiệu sản phẩm *</label>
                <select id="nhan_hieu" defaultValue="VANZ">
                  <option value="VANZ">VANZ</option>
                  <option value="Nike">Nike</option>
                  <option value="Adidas">Adidas</option>
                </select>
              </div>

              <div className="form-group">
                <label>Danh mục sản phẩm *</label>
                <div className="dropdown-multiselect" id="danh-muc-wrapper">
                  <div className="dropdown-selected" id="dropdown-selected">
                    Chọn danh mục
                  </div>
                  <div className="dropdown-options" id="dropdown-options">
                    <label>
                      <input type="checkbox" value="Giày Nam" /> Giày Nam
                    </label>
                    <label>
                      <input type="checkbox" value="Giày Nữ" /> Giày Nữ
                    </label>
                    <label>
                      <input type="checkbox" value="Giày Trẻ em" /> Giày Trẻ em
                    </label>
                    <label>
                      <input type="checkbox" value="Sneaker" /> Sneaker
                    </label>
                    <label>
                      <input type="checkbox" value="Chạy bộ" /> Chạy bộ
                    </label>
                    <label>
                      <input type="checkbox" value="Thể thao" /> Thể thao
                    </label>
                  </div>
                </div>
                <div
                  id="selected-tags"
                  className="tags-input"
                  style={{ marginTop: "10px" }}
                ></div>
              </div>

              <div className="form-group">
                <label htmlFor="gia_goc">
                  Giá gốc tham khảo (VND)
                  <small>
                    (Giá này sẽ được dùng mặc định nếu không nhập giá riêng
                    trong tab 2)
                  </small>
                </label>
                <input type="number" id="gia_goc" name="gia_goc" />
              </div>

              <div className="form-group">
                <label htmlFor="gia_ban">
                  Giá bán tham khảo (VND)
                  <small>
                    (Giá này sẽ được dùng mặc định nếu không nhập giá riêng
                    trong tab 2)
                  </small>
                </label>
                <input type="number" id="gia_ban" name="gia_ban" />
              </div>
            </div>
          </div>
        </form>

        <div className="form-group">
          <label>
            Ảnh sản phẩm <small>(Lưu ý: Nền đế nền trắng)</small>
          </label>
          <div className="product-images">
            <div className="image-thumb">
              <img
                src="/images/products/chaybo/ConverseRunStarMotion(1).webp"
                alt="Ảnh 1"
              />
            </div>
            <div className="image-thumb">
              <img
                src="/images/products/chaybo/ConverseRunStarMotion(2).webp"
                alt="Ảnh 2"
              />
            </div>
            <div className="image-thumb">
              <img
                src="/images/products/chaybo/ConverseRunStarMotion(3).webp"
                alt="Ảnh 3"
              />
            </div>
            <div className="image-thumb">
              <img
                src="/images/products/chaybo/ConverseRunStarMotion.webp"
                alt="Ảnh 4"
              />
            </div>
          </div>
          <button type="button" className="choose-image-btn">
            Chọn ảnh
          </button>
        </div>
      </div>
    </main>
)
}