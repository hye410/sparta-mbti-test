import { Link } from "react-router-dom";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="bg-sky-400">
      <nav className="p-5 text-white sm:py-5 sm:px-12">
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
