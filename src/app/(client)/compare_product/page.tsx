import "../css/product.css";
import "../css/compare.css";
export default function Compare_product() {
  return (
    <>
      <section
        className="bread-crumb background-cover"
        style={{
          backgroundImage:
            "url(//bizweb.dktcdn.net/100/505/077/themes/934930/assets/section_breadcrumb.jpg?1730865096645)",
          backgroundPosition: "center",
        }}
      >
        <div className="breadcrumb-container">
          <div className="title-page">
            <h2>So sánh sản phẩm</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <a href="/" title="Trang chủ">
                <span>Trang chủ</span>
              </a>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li>
              <strong>
                <span>So sánh sản phẩm</span>
              </strong>
            </li>
            <li></li>
          </ul>
        </div>
      </section>
 
      <main style={{marginBottom:"600px",marginTop:"30px"}}>
        <div className="container1">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="null-table d-block">
              <p className="img-empty">
                <i className="fa fa-archive" aria-hidden="true"></i>
              </p>
              <p>Bạn chưa có sản phẩm nào để so sánh hãy thêm vào nhé</p>
            </div>
          </div>
          {/* <div className="col-xs-12 col-sm-12 col-md-12" id="pageCompare">
				<div className="content-page compare-table table-responsive d-block">
					<table className="table">
						<tbody>
							<tr className="image">
								<td>Hình ảnh</td>
								<td><img className="img-fluid" src="//bizweb.dktcdn.net/thumb/medium/100/505/077/products/layer1d87b62817a694e059205f86f.jpg?v=1702350240540" alt="Giày Nam Nike Air Max"/></td>
								<td></td>
								<td></td>
							</tr>
							<tr className="title">
								<td>Tên sản phẩm</td>
								<td><h3><a href="/giay-nam-nike-air-max">Giày Nam Nike Air Max</a></h3></td>
								<td></td>
								<td></td>
							</tr>
							<tr className="price">
								<td>Giá</td>
								<td>3.200.000₫</td>
								<td></td>
								<td></td>
							</tr>
							<tr className="available">
								<td>Tình trạng</td>
								<td>Còn hàng</td>
								<td></td>
								<td></td>
							</tr>
							<tr className="type">
								<td>Loại</td>
								<td>Đang cập nhật ...</td>
								<td></td>
								<td></td>
							</tr>
							<tr className="vendor">
								<td>Nhà cung cấp</td>
								<td>Đang cập nhật ...</td>
								<td></td>
								<td></td>
							</tr>
							<tr className="description itemMainCompare">
								<td>Công dụng nổi bật</td>
								<td><p>Đang cập nhật...</p><a className="remove-item removeItem" href="javascript:;" data-compare="giay-nam-nike-air-max">Xóa</a></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div> */}
        </div>
      </main>
    </>
  );
}
