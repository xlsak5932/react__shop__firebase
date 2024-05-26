import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__box">
        <div className="footer__left">
          <h4>ABOUT</h4>

          <ul>
            <li>React 쇼핑몰 포트폴리오</li>
            <li>대표: 000 | 전화: 1234-5678 | 팩스: 02)555-5555 </li>
            <li>주소: 인천 서구에서 살고 있어요</li>
            <li>통신판매업 신고: 2024-인천서구-2024</li>
            <li>사업자등록번호: 000-00-0000</li>
            <li>개인정보보호책임자: 000</li>
            <li>이메일: skadldldl123@gmail.com</li>
          </ul>
        </div>

        <div className="footer__right">
          <h4>상담 가능 시간</h4>

          <ul>
            <li>월~금: am 11 ~ pm 5</li>
            <li>점심시간: pm 12 ~ 1</li>
            <li>(토/일/공휴일은 휴무)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
