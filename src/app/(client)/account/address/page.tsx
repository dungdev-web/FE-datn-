import "../../css/product.css";
import "../../css/account.css";
import Link from "next/link";
export default function Address() {
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

        <div className="breadcrumb-container">
          <div className="title-page">
            <h2>Địa chỉ của bạn</h2>
          </div>
          <ul className="breadcrumb">
            <li className="home">
              <Link href={'/'} title="Trang chủ">
                <span>Trang chủ</span>
              </Link>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
             <li className="home">
              <Link href={'/account'} title="Tài khoản">
                <span>Tài khoản</span>
              </Link>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li>
              <strong>
                <span>Địa chỉ của bạn</span>
              </strong>
            </li>
            <li></li>
          </ul>
        </div>
      </section>
      <main>
        <div className="container1">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-lg-3 col-left-ac">
              <div className="block-account">
                <h5 className="title-account">Trang tài khoản</h5>
                <p>
                  Xin chào, <span>Lê Chí Bảo</span>&nbsp;!
                </p>
                <ul>
                  <li>
                    <a
                      className="title-info"
                      href="/account/logout"
                      title="Đăng xuất"
                    >
                      Đăng xuất
                    </a>
                  </li>
                  <li>
                    <Link className="title-info  " href="/account">
                      Thông tin tài khoản
                    </Link>
                  </li>

                  <li>
                    <Link className="title-info " href="/account/order">
                      Đơn hàng của bạn
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="title-info  "
                      href="/account/change_pass"
                    >
                      Đổi mật khẩu
                    </Link>
                  </li>
                  <li>
                    <Link className="title-info active" href="/account/address">
                      Sổ địa chỉ (1)
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">
              <h1 className="title-head margin-top-0">Địa chỉ của bạn</h1>
              <p className="btn-row">
                <button
                  className="btn-edit-addr btn btn-primary btn-more"
                  type="button"
                >
                  Thêm địa chỉ
                </button>
              </p>
              <div className="row total_address">
                <div
                  id="view_address_31677624"
                  className="customer_address col-xs-12 col-lg-12 col-md-12 col-xl-12"
                >
                  <div
                    className="address_info"
                    style={{
                      borderTop: "1px #ebebeb solid",
                      paddingTop: "16px",
                      marginTop: "20px",
                    }}
                  >
                    <div className="address-group">
                      <div className="address form-signup">
                        <p>
                          <strong>Họ tên: </strong> Lê Chí Bảo
                          <span className="address-default">
                            <i className="far fa-check-circle"></i>Địa chỉ mặc
                            định
                          </span>
                        </p>
                        <p>
                          <strong>Địa chỉ: </strong>
                          76 Đường 6 KP4 Bình Trưng Tây, TP. Thủ Đức, Hồ Chí
                          Minh, Phường 14, Quận 3, TP Hồ Chí Minh, Vietnam
                        </p>

                        <p>
                          <strong>Số điện thoại:</strong> +84775895973
                        </p>
                      </div>
                    </div>
                    <div id="tool_address_31677624" className="btn-address">
                      <p className="btn-row">
                        <button
                          className="btn-edit-addr btn btn-primary btn-edit"
                          type="button"
                          data-form="edit_address_31677624"
                          aria-controls="edit_address_31677624"
                        >
                          Chỉnh sửa địa chỉ
                        </button>
                        <button
                          className="hidden btn btn-dark-address btn-edit-addr btn-delete"
                          type="button"
                        >
                          <span>Xóa</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>

                {/* <div id="edit_address_31677624" className="form-list modal_address modal modal_edit_address" style="height: 545px;">
						<div className="btn-close closed_pop"><i className="fa fa-times"></i></div>
						<h2 className="title_pop">
							Chỉnh sửa địa chỉ
						</h2>
						<form method="post" action="/account/addresses/31677624" id="customer_address" accept-charset="UTF-8" className="has-validation-callback"><input name="FormType" type="hidden" value="customer_address"><input name="utf8" type="hidden" value="true">
						<div className="pop_bottom">
							<div className="form_address">
								<div className="field">
									<fieldset className="form-group">
										<input type="text" name="FullName" className="form-control has-content" required="" value=" Lê Chí Bảo" autocapitalize="words">
										<label>Họ tên</label>
									</fieldset>
									<p className="error-msg"></p>
								</div>
								<div className="field">
									<fieldset className="form-group">
										<input type="number" pattern="\d+" className="form-control" id="Phone" name="Phone" maxlength="12" value="+84775895973">
										<label>Số điện thoại</label>
									</fieldset>	
								</div>
								<div className="field">
									<fieldset className="form-group">
										<input type="text" className="form-control" name="Company" value="">
										<label>Công ty</label>
									</fieldset>
								</div>
								<div className="field">
									<fieldset className="form-group">
										<input type="text" className="form-control has-content" name="Address1" value="76 Đường 6 KP4 Bình Trưng Tây, TP. Thủ Đức, Hồ Chí Minh">
										<label>Địa chỉ</label>
									</fieldset>
								</div>
								<div className="field">
									<fieldset className="form-group select-field">
										<select name="Country" className="form-control mySelect2 has-content" id="mySelect2_31677624" data-default="Vietnam">Vietnam<option value="Abkhazia">Abkhazia</option><option value="Afghanistan">Afghanistan</option><option value="Albania">Albania</option><option value="Algeria">Algeria</option><option value="Andorra">Andorra</option><option value="Angola">Angola</option><option value="Antigua and Barbuda">Antigua and Barbuda</option><option value="Argentina">Argentina</option><option value="Armenia">Armenia</option><option value="Australia">Australia</option><option value="Austria">Austria</option><option value="Azerbaijan">Azerbaijan</option><option value="Bahamas">Bahamas</option><option value="Bahrain">Bahrain</option><option value="Bangladesh">Bangladesh</option><option value="Barbados">Barbados</option><option value="Belarus">Belarus</option><option value="Belgium">Belgium</option><option value="Belize">Belize</option><option value="Benin">Benin</option><option value="Bhutan">Bhutan</option><option value="Bolivia">Bolivia</option><option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option><option value="Botswana">Botswana</option><option value="Brazil">Brazil</option><option value="Brunei">Brunei</option><option value="Bulgaria">Bulgaria</option><option value="Burkina Faso">Burkina Faso</option><option value="Burundi">Burundi</option><option value="Cambodia">Cambodia</option><option value="Cameroon">Cameroon</option><option value="Canada">Canada</option><option value="Cape Verde">Cape Verde</option><option value="Central African Republic">Central African Republic</option><option value="Chad">Chad</option><option value="Chile">Chile</option><option value="Colombia">Colombia</option><option value="Comoros">Comoros</option><option value="Congo-Brazzaville">Congo-Brazzaville</option><option value="Congo-Kinshasa">Congo-Kinshasa</option><option value="Costa Rica">Costa Rica</option><option value="Côte d'Ivoire">Côte d'Ivoire</option><option value="Croatia">Croatia</option><option value="Cuba">Cuba</option><option value="Cyprus">Cyprus</option><option value="Czech Republic">Czech Republic</option><option value="Denmark">Denmark</option><option value="Djibouti">Djibouti</option><option value="Dominica">Dominica</option><option value="Dominican Republic">Dominican Republic</option><option value="East Timor">East Timor</option><option value="Ecuador">Ecuador</option><option value="Egypt">Egypt</option><option value="El Salvador">El Salvador</option><option value="Equatorial Guinea">Equatorial Guinea</option><option value="Eritrea">Eritrea</option><option value="Estonia">Estonia</option><option value="Ethiopia">Ethiopia</option><option value="Fiji">Fiji</option><option value="Finland">Finland</option><option value="France">France</option><option value="Gabon">Gabon</option><option value="Gambia">Gambia</option><option value="Georgia">Georgia</option><option value="Germany">Germany</option><option value="Ghana">Ghana</option><option value="Greece">Greece</option><option value="Grenada">Grenada</option><option value="Guatemala">Guatemala</option><option value="Guinea">Guinea</option><option value="Guinea-Bissau">Guinea-Bissau</option><option value="Guyana">Guyana</option><option value="Haiti">Haiti</option><option value="Honduras">Honduras</option><option value="Hong Kong">Hong Kong</option><option value="Hungary">Hungary</option><option value="Iceland">Iceland</option><option value="India">India</option><option value="Indonesia">Indonesia</option><option value="Iran">Iran</option><option value="Iraq">Iraq</option><option value="Ireland">Ireland</option><option value="Israel">Israel</option><option value="Italy">Italy</option><option value="Jamaica">Jamaica</option><option value="Japan (Nippon)">Japan (Nippon)</option><option value="Jordan">Jordan</option><option value="Kazakhstan">Kazakhstan</option><option value="Kenya">Kenya</option><option value="Kiribati">Kiribati</option><option value="North Korea">North Korea</option><option value="Kosovo">Kosovo</option><option value="Kuwait">Kuwait</option><option value="Kyrgyzstan">Kyrgyzstan</option><option value="Laos">Laos</option><option value="Latvia">Latvia</option><option value="Lebanon">Lebanon</option><option value="Lesotho">Lesotho</option><option value="Liberia">Liberia</option><option value="Libya">Libya</option><option value="Liechtenstein">Liechtenstein</option><option value="Lithuania">Lithuania</option><option value="Luxembourg">Luxembourg</option><option value="Macedonia (FYROM)">Macedonia (FYROM)</option><option value="Madagascar">Madagascar</option><option value="Malawi">Malawi</option><option value="Malaysia">Malaysia</option><option value="Maldives">Maldives</option><option value="Mali">Mali</option><option value="Malta">Malta</option><option value="Marshall Islands">Marshall Islands</option><option value="Mauritania">Mauritania</option><option value="Mauritius">Mauritius</option><option value="Mexico">Mexico</option><option value="Micronesia">Micronesia</option><option value="Moldova">Moldova</option><option value="Monaco">Monaco</option><option value="Mongolia">Mongolia</option><option value="Montenegro">Montenegro</option><option value="Morocco">Morocco</option><option value="Mozambique">Mozambique</option><option value="Myanmar">Myanmar</option><option value="Nagorno-Karabakh">Nagorno-Karabakh</option><option value="Namibia">Namibia</option><option value="Nauru">Nauru</option><option value="Nepal">Nepal</option><option value="Netherlands">Netherlands</option><option value="New Zealand">New Zealand</option><option value="Nicaragua">Nicaragua</option><option value="Niger">Niger</option><option value="Nigeria">Nigeria</option><option value="South Korea">South Korea</option><option value="New Caledonia">New Caledonia</option><option value="Norway">Norway</option><option value="Oman">Oman</option><option value="Pakistan">Pakistan</option><option value="Palau">Palau</option><option value="Palestine">Palestine</option><option value="Panama">Panama</option><option value="Papua New Guinea">Papua New Guinea</option><option value="Paraguay">Paraguay</option><option value="Peru">Peru</option><option value="Philippines">Philippines</option><option value="Poland">Poland</option><option value="Portugal">Portugal</option><option value="Qatar">Qatar</option><option value="Romania">Romania</option><option value="Russia">Russia</option><option value="Rwanda">Rwanda</option><option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option><option value="Saint Lucia">Saint Lucia</option><option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option><option value="Samoa">Samoa</option><option value="San Marino">San Marino</option><option value="Sao Tome and Principe">Sao Tome and Principe</option><option value="Saudi Arabia">Saudi Arabia</option><option value="South Sudan">South Sudan</option><option value="Senegal">Senegal</option><option value="Serbia">Serbia</option><option value="Seychelles">Seychelles</option><option value="Sierra Leone">Sierra Leone</option><option value="Singapore">Singapore</option><option value="Saint Helena">Saint Helena</option><option value="Slovakia">Slovakia</option><option value="Slovenia">Slovenia</option><option value="Solomon Islands">Solomon Islands</option><option value="Somalia">Somalia</option><option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option><option value="South Africa">South Africa</option><option value="South Ossetia">South Ossetia</option><option value="Spain">Spain</option><option value="Sri Lanka">Sri Lanka</option><option value="Sudan">Sudan</option><option value="Suriname">Suriname</option><option value="Swaziland">Swaziland</option><option value="Sweden">Sweden</option><option value="Switzerland">Switzerland</option><option value="Syria">Syria</option><option value="Tajikistan">Tajikistan</option><option value="Tanzania">Tanzania</option><option value="Thailand">Thailand</option><option value="Togo">Togo</option><option value="Tonga">Tonga</option><option value="Tokelau">Tokelau</option><option value="Trinidad and Tobago">Trinidad and Tobago</option><option value="Tunisia">Tunisia</option><option value="Turkey">Turkey</option><option value="China">China</option><option value="Turkmenistan">Turkmenistan</option><option value="Tuvalu">Tuvalu</option><option value="Uganda">Uganda</option><option value="Ukraine">Ukraine</option><option value="United Arab Emirates">United Arab Emirates</option><option value="United Kingdom">United Kingdom</option><option value="United States">United States</option><option value="Uruguay">Uruguay</option><option value="Uzbekistan">Uzbekistan</option><option value="Vanuatu">Vanuatu</option><option value="Vatican">Vatican</option><option value="Venezuela">Venezuela</option><option value="Vietnam">Vietnam</option><option value="Wales">Wales</option><option value="Western Sahara">Western Sahara</option><option value="Yemen">Yemen</option><option value="Zambia">Zambia</option><option value="Zimbabwe">Zimbabwe</option><option value="Taiwan">Taiwan</option></select>
										<label>Quốc gia</label>
									</fieldset>
								</div>
								<div className="group-country">
									<fieldset className="form-group select-field not-vn">
										<select name="Province" value="TP Hồ Chí Minh" data-default="TP Hồ Chí Minh" className="form-control add province myselect has-content" id="mySelect3_31677624" data-address-type="province" data-address-zone="31677624" data-select2-id="select2-data-billingProvince"></select>
										<label>Tỉnh thành</label>
									</fieldset>
									<fieldset className="form-group select-field not-vn">
										<select name="District" className="form-control add  district myselect has-content" data-default="Quận 3" value="Quận 3" id="mySelect4_31677624" data-address-type="district" data-address-zone="31677624" data-select2-id="select2-data-billingDistrict"></select>
										<label>Quận huyện</label>
									</fieldset>
									<fieldset className="form-group select-field not-vn">
										<select name="Ward" className="form-control add ward myselect has-content" data-default="Phường 14" value="Phường 14" id="mySelect5_31677624" data-address-type="ward" data-address-zone="31677624" data-select2-id="select2-data-billingWard"></select>
										<label>Phường xã</label>
									</fieldset>
								</div>

								<div className="field">
									<fieldset className="form-group">
										<input type="text" className="form-control" name="Zip" value="">
										<label>Mã Zip</label>
									</fieldset>
								</div>

							</div>
							<div className="checkbox hidden ">
								<label className="c-input c-checkbox" style="padding-left: 20px;">
									<input type="checkbox" name="IsDefault" value="true">
									<span className="c-indicator">Đặt là địa chỉ mặc định?</span> 
								</label>
							</div>	
							<div className="btn-row">	
								<button className="btn btn-dark-address btn-fix-addr btn-close" type="button" data-form="edit_address_31677624">
									Hủy
								</button>										
								<button className="btn btn-primary btn-submit" id="update"><span>Cập nhật địa chỉ</span></button>																	

							</div>
						</div>
						</form>
					</div>
					
				</div> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
