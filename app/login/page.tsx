import "../css/login.css";
export default function Login(){
    return(
        <>
        <div className="intro-banner"></div>
      <main>
        <div className="auth-container">
          <img
            src="images/blog/section_instagram_img6.webp"
            alt="Image Description"
          />

          <div className="form-container">
            <h2>Đăng nhập</h2>
            <div className="register-link">
              <p>Hãy đăng nhập để được hưởng đặc quyền riêng dành cho bạn</p>
            </div>
            <form action="" id="formLogin">
              <input type="email" placeholder="Tài Khoản" id="email" required />

              <input
                type="password"
                placeholder="Mật Khẩu"
                id="password"
                required
              />

              <div className="remember-me">
                <input type="checkbox" />Lưu tài khoản
              </div>
              <button type="submit">Đăng nhập ngay</button>
            </form>
            <br />
            <h5>Quên mật khẩu?</h5>

            <div className="google-login">
              <i className="fab fa-google"></i> Đăng nhập bằng Google
            </div>

            <div className="register-link">
              <p>
                Bạn chưa có tài khoản the light?
                <a href="/register.html">Đăng ký ngay</a>
              </p>
            </div>
          </div>
        </div>
      </main>
      </>
    )
}