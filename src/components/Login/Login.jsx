import  { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const LgoinFunc = async () => {
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );

      try {
        const q = query(
          collection(fireDB, "user"),
          where("uid", "==", users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));

          setUserLogin({
            email: "",
            password: "",
          });

          alert("로그인이 성공되었습니다.");

          if (user.role === "user" || user.role === "admin") {
            navigate("/");
          } else {
            navigate("/login");
          }
        });
        return () => data;
      } catch (error) {
        console.log("Login.jsx2 : ", error);
      }
    } catch (error) {
      console.log("Login.jsx1 : ", error);
    }
  };

  return (
    <div className="lgoin">
      <div className="login__box">
        <h2 className="login__title">로그인</h2>

        <div className="login__email__box">
          <input
            type="email"
            placeholder="이메일 입력"
            onChange={(e) => {
              setUserLogin({ ...userLogin, email: e.target.value });
            }}
            value={userLogin.email}
          />
        </div>

        <div className="login__password__box">
          <input
            type="text"
            placeholder="비밀번호 입력"
            onChange={(e) => {
              setUserLogin({ ...userLogin, password: e.target.value });
            }}
            value={userLogin.password}
          />
        </div>

        <button type="button" onClick={LgoinFunc} className="login__btn">
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
