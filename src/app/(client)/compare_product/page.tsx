import "../css/product.css";
import "../css/compare.css";
export default function Compare_product() {
  return (
    <>
     <section
  className="bread-crumb background-cover relative"
  style={{
    backgroundImage: "url(/images/banner/banner_dieuhuong1.png)",
    backgroundPosition: "center",
    backgroundSize: "cover",
  }}
>
  {/* Lớp phủ làm mờ nền */}
<div className="absolute inset-0 bg-gray-500/50 backdrop-blur-none z-0"></div>


  {/* Nội dung chính */}
  <div className="breadcrumb-container relative z-10 text-white">
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

      <main style={{ marginTop: "30px" }} className="main">
        <div className="container1">
          <div className="row">
            {/* <div className="col-xs-12 col-sm-12 col-md-12" id="none">
            <div className="null-table d-block">
              <p className="img-empty">
                <i className="fa fa-archive" aria-hidden="true"></i>
              </p>
              <p>Bạn chưa có sản phẩm nào để so sánh hãy thêm vào nhé</p>
            </div>
          </div> */}
            <div className="col-xs-12 col-sm-12 col-md-12" id="pageCompare">
              <div className="content-page compare-table table-responsive d-block">
                <table className="table">
                  <tbody>
                    <tr className="image">
                      <td>Hình ảnh</td>
                      <td>
                        <img
                          className="img-fluid"
                          src="//bizweb.dktcdn.net/thumb/medium/100/505/077/products/layer1d87b62817a694e059205f86f.jpg?v=1702350240540"
                          alt="Giày Nam Nike Air Max"
                        />
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="title">
                      <td>Tên sản phẩm</td>
                      <td>
                        <h3>
                          <a href="/giay-nam-nike-air-max">
                            Giày Nam Nike Air Max
                          </a>
                        </h3>
                      </td>
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
                      <td>
                        <p>Đang cập nhật...</p>
                        <a
                          className="remove-item removeItem"
                          href="javascript:;"
                          data-compare="giay-nam-nike-air-max"
                        >
                          Xóa
                        </a>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mb-4 mt-[20px] mobile">
              <div className="flex">
                {/* Product Image - Left side */}
                <div className="w-32 h-32 bg-gray-50 flex justify-center items-center flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg flex items-center justify-center">
                    <img
                      className="img-fluid"
                      src="//bizweb.dktcdn.net/thumb/medium/100/505/077/products/layer1d87b62817a694e059205f86f.jpg?v=1702350240540"
                      alt="Giày Nam Nike Air Max"
                    />
                  </div>
                </div>

                {/* Product Details - Right side */}
                <div className="flex-1 !p-[10px]">
                  <div className="space-y-2">
                    {/* Product Name */}
                    <div className="flex items-center !justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        Giày Nam Nike Air Max
                      </h3>
                      {/* Tình trạng */}
                      <div className="text-xs text-gray-500">
                        Tình trạng:{" "}
                        <span className="text-xs text-gray-600">Còn hàng</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div>
                      <span className="text-lg font-bold text-red-600">
                        3.200.000₫
                      </span>
                    </div>

                    {/* Supplier */}
                    <div className="text-xs text-gray-500">
                      Loại:{" "}
                      <span className="text-xs text-gray-600">Đang cập nhật...</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Nhà cung cấp:  <span className="text-xs text-gray-600">Đang cập nhật...</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Công dụng nổi b:  <span className="text-xs text-gray-600">Đang cập nhật...</span>
                    </div>

                    {/* Action Button */}
                    <div className="pt-1">
                      <button className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-1.5 px-4 rounded transition-colors duration-200 !p-[5px]">
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
