import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <header className="bg-slate-300">
      <nav className="bg-orange-50 w-screen max-w-screen-xl  min-w-[350px] m-auto px-[2vw] py-[1vw]">
        <ul className="flex items-center justify-between">
          <li className="cursor-pointer">
            <Link to="/">홈</Link>
          </li>
          <li className="ml-8 cursor-pointer">
            <Link to="/login">로그인</Link>
          </li>
          <li className="ml-auto cursor-pointer">
            <Link to="/mypage">프로필</Link>
          </li>
          <li className="ml-8 cursor-pointer">
            <Link to="/test">테스트</Link>
          </li>
          <li className="ml-8 cursor-pointer">
            <Link to="/result">결과보기</Link>
          </li>
          <li className="ml-8 cursor-pointer">
            <button onClick={handleLogout}>로그아웃</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
