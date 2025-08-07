import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const exportStyledExcel = async (data: any[], fileName: string) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Danh sách đơn hàng");

    // Header
    sheet.columns = [
      { header: "Mã đơn hàng", key: "maDonHang", width: 20 },
      { header: "Người nhận", key: "nguoiNhan", width: 25 },
      { header: "Điện thoại", key: "dienThoai", width: 15 },
      { header: "Trạng thái", key: "trangThai", width: 20 },
      { header: "Sản phẩm", key: "sanPham", width: 30 },
      { header: "Ngày đặt", key: "ngayDat", width: 15 },
    ];

    // Style header
    sheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFCCE5FF" },
      };
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
      };
    });

    // Thêm dữ liệu
    data.forEach((item) => {
      sheet.addRow(item);
    });

    // Tạo file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${fileName}.xlsx`);
  };
  export default exportStyledExcel;