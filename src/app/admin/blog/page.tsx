import "../css/css.css";
import "../css/dashboard.css";
import "../css/blog_add.css";
export default function Blog() {
  return (
    <>
      <main className="main-content">
        <div className="post-list">
          <h2>Danh sách bài viết</h2>

          <div className="post-actions">
            <button className="btn btn-add">
              <i className="fa-solid fa-plus"></i> Thêm mới bài viết
            </button>
            <button className="btn btn-refresh">
              <i className="fa-solid fa-rotate-right"></i> Refresh
            </button>
            <button className="btn btn-search">
              <i className="fa-solid fa-magnifying-glass"></i> Tìm kiếm
            </button>
          </div>

          <table className="post-table">
            <thead>
              <tr>
                <th>Tên bài viết</th>
                <th>Ảnh</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Ngày sửa</th>
                <th>Thao tác</th>
              </tr>
              <tr className="filter-row">
                <th>
                  <input type="text" placeholder="Tìm tên bài viết..." />
                </th>
                <th></th>
                <th>
                  <select>
                    <option value="">Tất cả</option>
                    <option value="public">Công khai</option>
                    <option value="private">Riêng tư</option>
                  </select>
                </th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Giày Rep 1:1 Chuẩn Giá Rẻ Nhất - Tu Shoes</td>
                <td>
                  <img src="/images/blog/layer-2.webp" alt="Bài viết 1" />
                </td>
                <td className="status-column">
                  <span className="badge badge-public">Công khai</span>
                </td>
                <td>22-08-2021</td>
                <td>22-08-2021</td>
                <td>
                  <i className="fa-solid fa-pen edit-icon" title="Sửa mã"></i>
                  <i
                    className="fa-solid fa-trash delete-icon"
                    title="Xóa mã"
                  ></i>
                </td>
              </tr>
              <tr>
                <td>Giày Rep 1:1 là gì? Có nên chọn giày rep 1:1?...</td>
                <td>
                  <img src="/images/blog/layer-1.webp" alt="Bài viết 2" />
                </td>
                <td className="status-column">
                  <span className="badge badge-public">Công khai</span>
                </td>
                <td>22-08-2021</td>
                <td>22-08-2021</td>
                <td>
                  <i className="fa-solid fa-pen edit-icon" title="Sửa mã"></i>
                  <i
                    className="fa-solid fa-trash delete-icon"
                    title="Xóa mã"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="post-pagination">
            <button className="page-btn" disabled>
              <i className="fa-solid fa-angle-left"></i>
            </button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
