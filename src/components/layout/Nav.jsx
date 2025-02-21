import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PATH } from "../../constant/pathConstant";
const { LOGIN, TEST, MY_PAGE, RESULT } = PATH;
const MENU_TYPE = { LINK: "link", BUTTON: "button" };
const PublicMenu = () => [
  {
    name: "로그인",
    path: LOGIN,
    type: MENU_TYPE.LINK,
  },
];

const AuthenticatedMenu = (logOut) => [
  {
    name: "프로필",
    path: MY_PAGE,
    type: MENU_TYPE.LINK,
  },
  {
    name: "테스트",
    path: TEST,
    type: MENU_TYPE.LINK,
  },
  {
    name: "결과보기",
    path: RESULT,
    type: MENU_TYPE.LINK,
  },
  {
    name: "로그아웃",
    type: MENU_TYPE.BUTTON,
    btnEvent: logOut,
  },
];

export default function Nav() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navMenu = isAuthenticated
    ? AuthenticatedMenu(handleLogout)
    : PublicMenu();

  return navMenu.map((menu) => (
    <li
      key={menu.name}
      className={`cursor-pointer ${
        menu.name === "프로필" ? "sm:ml-auto" : "sm:ml-8"
      }`}
    >
      {menu.type === MENU_TYPE.LINK ? (
        <Link to={menu.path}>{menu.name}</Link>
      ) : (
        <button onClick={menu.btnEvent}>{menu.name}</button>
      )}
    </li>
  ));
}
