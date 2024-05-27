// import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);

  const logout = () => {
    localStorage.clear("users");
    navigate("/");
  };

  function JoinFunction() {
    navigate("/join");
  }

  return (
    <div className="nav">
      <div className="nav__box">
        <div className="logo__box">
          <Link to="/" className="shop_portfolio">
            쇼핑몰 포트폴리오
          </Link>
        </div>

        <div className="menu__box">
          <ul>
            {/* ✅로그아웃 상태 : 로그인*/}
            {/* ✅로그인이 되면 보여질 것 : 로그아웃, 마이페이지, 장바구니 */}
            {/* ✅관리자가 로그인 상태 : 상품 등록하기*/}

            {user ? (
              <></>
            ) : (
              <li>
                <Link to="/login">로그인</Link>
              </li>
            )}

            {user ? (
              <li>
                <Link onClick={logout}>로그아웃</Link>
              </li>
            ) : (
              <></>
            )}

            {user ? (
              <></>
            ) : (
              <li>
                <Link to="/join" onClick={JoinFunction}>
                  회원가입
                </Link>
              </li>
            )}

            {user ? (
              <>
                <li>
                  <Link to="/cart">장바구니({cartItems.length})</Link>
                </li>
              </>
            ) : (
              <></>
            )}

            {user?.role === "admin" ? (
              <li>
                <Link to="/Admin">관리자 모드</Link>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
