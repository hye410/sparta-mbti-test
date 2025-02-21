import { Link } from "react-router-dom";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="bg-sky-400">
      <nav className="w-screen max-w-screen-xl  min-w-[350px] m-auto px-[2vw] py-[1vw]">
        <ul className="flex items-center justify-between">
          <li className="cursor-pointer">
            <Link to="/">홈</Link>
          </li>
          <Nav />
        </ul>
      </nav>
    </header>
  );
}
