import  { useState } from "react";
import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import {
  Timestamp,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Join.css";

const Join = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [isEmailUnique, setIsEmailUnique] = useState(false);

  const JoinCompleate = async () => {
    if (content.email === "") {
      alert("이메일을 입력해주세요");
      return;
    }
    if (isEmailUnique === false) {
      alert("아이디 중복 체크를 해주세요");
      return;
    }
    if (content.password === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }
    if (content.password.length < 6) {
      alert("비밀번호를 6자리 이상 입력해주세용");
      return;
    }
    if (!content.role) {
      alert("유저를 선택해주세요");
      return;
    }

    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        content.email,
        content.password
      );

      const user = {
        email: users.user.email,
        role: content.role,
        uid: users.user.uid,
        time: Timestamp.now(),
        date: new Date().toLocaleString("ko-KR", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userRefrence = collection(fireDB, "user");

      await addDoc(userRefrence, user);

      // if(content.email === userRefrence.email){}

      setContent({
        email: "",
        password: "",
        role: "",
      });

      toast.success("회원가입 완료");
      navigate("/login");
    } catch (error) {
      if (isEmailUnique === false) {
        alert("가입된 이메일이 있습니다.");
        return;
      }

      console.log("Join Error : ", error);
    }
  };

  const EmailOverlap = async () => {
    try {
      const q = query(
        collection(fireDB, "user"),
        where("email", "==", content.email.toLowerCase())
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setIsEmailUnique(false);
        alert("이메일이 이미 존재합니다.");
      } else if (content.email === "") {
        alert("이메일을 입력해주세요.");
        return;
      } else {
        setIsEmailUnique(true);
        alert("사용 가능한 이메일입니다.");
      }
    } catch (error) {
      console.log("EmailOverlap Error : ", error);
      alert("이메일 중복 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="join">
      <div className="join__box">
        <h2 className="join__title">회원가입</h2>

        {/* <form action={JoinCompleate()}> */}
        <div className="join__email">
          <input
            type="email"
            placeholder="이메일 입력"
            onChange={(e) => {
              setContent({ ...content, email: e.target.value });
            }}
            value={content.email}
          />
          <button
            type="button"
            onClick={EmailOverlap}
            className="join__Email__overlap"
          >
            이메일 중복 확인
          </button>
        </div>

        <div className="join__password">
          <input
            type="password"
            placeholder="비밀번호 입력"
            onChange={(e) => {
              setContent({ ...content, password: e.target.value });
            }}
            value={content.password}
          />
        </div>

        {/* <div className="join__password__confirm">
            <input type="text" placeholder="비밀번호 재입력" />
          </div> */}

        <div className="join__user__kind">
          <select
            name="kind"
            onChange={(e) => {
              setContent({ ...content, role: e.target.value });
            }}
            value={content.role}
          >
            <option value="유저 선택">유저 선택</option>
            <option value="user">사용자</option>
            <option value="admin">관리자</option>
          </select>
        </div>

        <button type="button" onClick={JoinCompleate} className="btn__join">
          회원가입
        </button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default Join;
