"use client";
import React from "react";
import "../../css/product_add.css";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { API_BASE_URL } from "@/config/env";
import type QuillType from "quill"; // import type

import "quill/dist/quill.snow.css";
export default function Add_pro() {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<InstanceType<typeof QuillType> | null>(null);

  const defaultContent = `🔸 Chất lượng Rep 1:1 - Nên mang lên 1 size
so với tiêu chuẩn - Vận chuyển toàn quốc | Kiểm Tra Hàng
Trước Khi Thanh Toán - 100% Ảnh chụp trực tiếp tại Tu Shoes
- Bảo Hành Trọn Đời Sản Phẩm - Đổi Trả 7 Ngày Không Kể Lý Do`;
  useEffect(() => {
    const loadQuill = async () => {
      const QuillModule = await import("quill");
      const Quill = QuillModule.default;

      if (editorRef.current && !quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: "Nhập nội dung...",
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              ["link", "image"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
            ],
          },
        });

        quillRef.current.root.innerHTML = defaultContent;

        quillRef.current.on("text-change", () => {
          const html = quillRef.current?.root.innerHTML;
          console.log("Nội dung mới:", html);
        });
      }
    };

    loadQuill();
  }, []);
  useEffect(() => {
    // ============ Tabs =============
    const tabs = document.querySelectorAll(".tab");
    const tabContents = document.querySelectorAll(".tab-content");

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        tabContents.forEach((content, i) => {
          (content as HTMLElement).style.display =
            i === index ? "block" : "none";
        });
      });
    });

    // ============ Variant Add/Remove ============
    const variantList = document.getElementById("variant-list");
    if (variantList) {
      variantList.addEventListener("click", (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("btn-add-variant")) {
          const row = target.closest(".variant-row");
          const newRow = row?.cloneNode(true) as HTMLElement;

          newRow?.querySelectorAll("input").forEach((input) => {
            const el = input as HTMLInputElement;
            el.value = el.type === "hidden" ? "black|Đen" : "";
          });

          const btn = newRow.querySelector(".btn-add-variant") as HTMLElement;
          if (btn) {
            btn.textContent = "-";
            btn.classList.remove("btn-add-variant");
            btn.classList.add("btn-remove-variant");
          }

          variantList.appendChild(newRow);
        }

        if (target.classList.contains("btn-remove-variant")) {
          const row = target.closest(".variant-row");
          if (row) variantList.removeChild(row);
        }
      });
    }

    // ============ Dropdown Color Select ============
    document.querySelectorAll(".dropdown-option").forEach((option) => {
      option.addEventListener("click", (e) => {
        const opt = e.currentTarget as HTMLElement;
        const wrapper = opt.closest(".custom-select-wrapper")!;
        const selected = wrapper.querySelector(".selected-option")!;
        const input = wrapper.querySelector(
          "input[type=hidden]"
        ) as HTMLInputElement;

        const colorCircle = selected.querySelector(
          ".color-circle"
        ) as HTMLElement;
        const colorName = selected.querySelector(".color-name") as HTMLElement;
        const chosenName = opt.querySelector(".color-name")?.textContent;

        colorCircle.style.backgroundColor =
          opt.style.getPropertyValue("--color");
        colorName.textContent = chosenName || "";
        input.value = opt.getAttribute("data-value") || "";

        wrapper.querySelector(".dropdown")?.classList.remove("show");
      });
    });

    // ============ Custom Select Dropdown ============
    function closeAllDropdowns(current?: Element) {
      document.querySelectorAll(".custom-select").forEach((select) => {
        if (!current || select !== current) {
          select.querySelector(".dropdown")?.classList.remove("show");
        }
      });
    }

    document.querySelectorAll(".custom-select").forEach((select) => {
      select.addEventListener("click", (e) => {
        e.stopPropagation();
        closeAllDropdowns(select);
        const dropdown = select.querySelector(".dropdown");
        dropdown?.classList.toggle("show");
      });
    });

    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });

    // ============ Multi-select Danh Mục ============
    const danhMucWrapper = document.getElementById("danh-muc-wrapper");
    const dropdownSelected = document.getElementById("dropdown-selected");
    const dropdownOptions = document.getElementById("dropdown-options");
    const selectedTags = document.getElementById("selected-tags");

    if (danhMucWrapper && dropdownSelected && dropdownOptions && selectedTags) {
      dropdownSelected.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownOptions.classList.toggle("show");
      });

      const checkboxes = dropdownOptions.querySelectorAll(
        "input[type=checkbox]"
      ) as NodeListOf<HTMLInputElement>;

      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const value = checkbox.value;

          if (checkbox.checked) {
            const tag = document.createElement("span");
            tag.className = "tag";
            tag.textContent = value;

            const removeBtn = document.createElement("button");
            removeBtn.innerHTML = "&times;";
            removeBtn.style.marginLeft = "5px";
            removeBtn.addEventListener("click", () => {
              checkbox.checked = false;
              selectedTags.removeChild(tag);
            });

            tag.appendChild(removeBtn);
            selectedTags.appendChild(tag);
          } else {
            const tags = selectedTags.querySelectorAll(".tag");
            tags.forEach((tag) => {
              if (tag.textContent?.includes(value)) {
                selectedTags.removeChild(tag);
              }
            });
          }
        });
      });
    }

    // ============ Close dropdowns on outside click ============
    const handleClickOutside = () => {
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("show");
      });

      dropdownOptions?.classList.remove("show");
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const dropdownWrapper = document.getElementById("danh-muc-wrapper");
    const dropdownSelected = document.getElementById("dropdown-selected");
    const dropdownOptions = document.getElementById("dropdown-options");
    const selectedTagsContainer = document.getElementById("selected-tags");

    if (
      !dropdownWrapper ||
      !dropdownSelected ||
      !dropdownOptions ||
      !selectedTagsContainer
    )
      return;

    const checkboxes = dropdownOptions.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    );

    const renderTags = () => {
      selectedTagsContainer.innerHTML = "";
      const selected: string[] = [];

      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          selected.push(checkbox.value);

          const tag = document.createElement("span");
          tag.className = "tag";
          tag.textContent = checkbox.value;

          const removeBtn = document.createElement("span");
          removeBtn.textContent = " ×";
          removeBtn.style.marginLeft = "5px";
          removeBtn.style.cursor = "pointer";
          removeBtn.onclick = () => {
            checkbox.checked = false;
            renderTags();
          };

          tag.appendChild(removeBtn);
          selectedTagsContainer.appendChild(tag);
        }
      });

      dropdownSelected.textContent =
        selected.length > 0 ? selected.join(", ") : "Chọn danh mục";
    };

    dropdownWrapper.addEventListener("click", () => {
      dropdownWrapper.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!dropdownWrapper.contains(e.target as Node)) {
        dropdownWrapper.classList.remove("open");
      }
    });

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", renderTags);
    });

    renderTags();

    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener("change", renderTags);
      });
    };
  }, []);

  return (
    <>
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

      <div className="tabs">
        <div className="tab active">Thông tin sản phẩm</div>
        <div className="tab">Nhập số lượng sản phẩm</div>
        <div className="tab">Thêm ảnh feedback cho sản phẩm</div>
      </div>

      <div className="tab-content" style={{ display: "block" }}>
        <form id="add-product-form" className="add-product-form">
          <div className="form-grid">
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
                <div
                  ref={editorRef}
                  style={{ height: "300px", backgroundColor: "#fff" }}
                />
              </div>
            </div>

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
                      <input type="checkbox" defaultValue="Giày Nam" /> Giày Nam
                    </label>
                    <label>
                      <input type="checkbox" defaultValue="Giày Nữ" /> Giày Nữ
                    </label>
                    <label>
                      <input type="checkbox" defaultValue="Giày Trẻ em" /> Giày
                      Trẻ em
                    </label>
                    <label>
                      <input type="checkbox" defaultValue="Sneaker" /> Sneaker
                    </label>
                    <label>
                      <input type="checkbox" defaultValue="Chạy bộ" /> Chạy bộ
                    </label>
                    <label>
                      <input type="checkbox" defaultValue="Thể thao" /> Thể thao
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
                src={`${API_BASE_URL}/uploads/ConverseRunStarMotion(1).webp`}
                alt="Ảnh 1"
              />
            </div>
            <div className="image-thumb">
              <img
                src={`${API_BASE_URL}/uploads/ConverseRunStarMotion(2).webp`}
                alt="Ảnh 2"
              />
            </div>
            <div className="image-thumb">
              <img
                src={`${API_BASE_URL}/uploads/ConverseRunStarMotion(3).webp`}
                alt="Ảnh 3"
              />
            </div>
            <div className="image-thumb">
              <img
                src={`${API_BASE_URL}/uploads/ConverseRunStarMotion.webp`}
                alt="Ảnh 4"
              />
            </div>
          </div>
          <button type="button" className="choose-image-btn">
            Chọn ảnh
          </button>
        </div>
      </div>

      <div
        className="tab-content"
        id="so-luong-tab"
        style={{ display: "none" }}
      >
        <div className="form-group">
          <label>Nhập biến thể sản phẩm (Màu - Size - Giá - Số lượng)</label>
          <div id="variant-list">
            <div
              className="variant-row"
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "10px",
                alignItems: "center",
              }}
            >
              <div className="custom-select-wrapper" style={{ flex: "1" }}>
                <div className="custom-select">
                  <div className="selected-option">
                    <span
                      className="color-circle"
                      style={{ backgroundColor: "black" }}
                    ></span>
                    <span className="color-name">Đen</span>
                  </div>

                  <div className="dropdown">
                    <input
                      type="text"
                      className="color-search"
                      placeholder="Tìm màu..."
                    />
                    <div
                      className="dropdown-option"
                      data-defaultvalue="black|Đen"
                      style={{ "--color": "black" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Đen</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="white|Trắng"
                      style={{ "--color": "white" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Trắng</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="gray|Xám"
                      style={{ "--color": "gray" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Xám</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="lightgray|Xám nhạt"
                      style={{ "--color": "lightgray" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Xám nhạt</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="red|Đỏ"
                      style={{ "--color": "red" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Đỏ</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="darkred|Đỏ đậm"
                      style={{ "--color": "darkred" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Đỏ đậm</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="maroon|Nâu đỏ"
                      style={{ "--color": "maroon" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Nâu đỏ</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="pink|Hồng"
                      style={{ "--color": "pink" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Hồng</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="hotpink|Hồng đậm"
                      style={{ "--color": "hotpink" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Hồng đậm</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="blue|Xanh dương"
                      style={{ "--color": "blue" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Xanh dương</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="navy|Xanh navy"
                      style={{ "--color": "navy" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Xanh navy</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="skyblue|Xanh da trời"
                      style={{ "--color": "skyblue;" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Xanh da trời</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="teal|Xanh ngọc"
                      style={{ "--color": "teal" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Xanh ngọc</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="green|Xanh lá"
                      style={{ "--color": "green" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Xanh lá</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="lime|Xanh neon"
                      style={{ "--color": "lime" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Xanh neon</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="olive|Xanh oliu"
                      style={{ "--color": "olive" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Xanh oliu</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="orange|Cam"
                      style={{ "--color": "orange" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Cam</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="darkorange|Cam đậm"
                      style={{ "--color": "darkorange" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Cam đậm</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="yellow|Vàng"
                      style={{ "--color": "yellow" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Vàng</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="gold|Vàng kim"
                      style={{ "--color": "gold" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Vàng kim</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="beige|Be"
                      style={{ "--color": "beige" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Be</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="ivory|Trắng ngà"
                      style={{ "--color": "ivory" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Trắng ngà</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="purple|Tím"
                      style={{ "--color": "purple" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Tím</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="violet|Tím nhạt"
                      style={{ "--color": "violet" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Tím nhạt</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="indigo|Chàm"
                      style={{ "--color": "indigo" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Chàm</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="brown|Nâu"
                      style={{ "--color": "brown" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Nâu</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="saddlebrown|Nâu yên ngựa"
                      style={
                        { "--color": "saddlebrown" } as React.CSSProperties
                      }
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Nâu yên ngựa</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="chocolate|Socola"
                      style={{ "--color": "chocolate" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Socola</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="silver|Bạc"
                      style={{ "--color": "silver" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Bạc</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="cyan|Xanh cyan"
                      style={{ "--color": "cyan" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Xanh cyan</span>
                    </div>
                    <div
                      className="dropdown-option"
                      data-defaultvalue="magenta|Hồng tím"
                      style={{ "--color": "magenta" } as React.CSSProperties}
                    >
                      <span className="color-circle"></span>
                      <span className="color-name">Hồng tím</span>
                    </div>
                  </div>
                </div>
                <input type="hidden" name="color[]" defaultValue="black|Đen" />
              </div>
              <input
                type="text"
                name="size[]"
                placeholder="Size (VD: 39)"
                style={{ flex: "1" }}
              />
              <input
                type="number"
                name="price[]"
                placeholder="Giá bán (VND)"
                style={{ flex: "1" }}
              />
              <input
                type="number"
                name="price[]"
                placeholder="Giá khuyến mãi (VND)"
                style={{ flex: "1" }}
              />
              <input
                type="number"
                name="quantity[]"
                placeholder="Số lượng"
                style={{ flex: "1" }}
              />
              <button type="button" className="btn btn-add-variant">
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="tab-content"
        id="feedback-tab"
        style={{ display: "none" }}
      >
        <div className="form-group">
          <label>Thêm ảnh feedback từ khách hàng</label>
          <div className="product-images"></div>
          <button type="button" className="choose-image-btn">
            Tải ảnh lên
          </button>
        </div>
      </div>
    </>
  );
}
