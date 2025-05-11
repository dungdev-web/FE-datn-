import "../css/dashboard.css";
import "../css/css.css";
export default function Header_admin() {
  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo-wrapper">
            <img src="/images/logo/logo-den.png" alt="Logo" className="logo" />
          </div>
        </div>

        <div className="header-right">
          <div className="user-info">
            <img src="/images/logo/anhdep.jpg" alt="Admin" className="avatar" />
            <div className="email-role">
              <div className="email">admin@gmail.com</div>
              <div className="role">Administrator</div>
            </div>
          </div>
        </div>
      </header>
      <div className="sub-header">
        <div className="sub-header-left">
          <button className="menu-toggle">
            <i className="fa-solid fa-list"></i>
          </button>
        </div>
        <div className="sub-header-right">
          <span className="home-icon">
            <i className="fa-solid fa-house"></i>
          </span>{" "}
          / <span>Danh sách bài viết</span>
        </div>
      </div>
    </>
  );
}
