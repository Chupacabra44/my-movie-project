import { Link } from "react-router";
const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-[#58225a] text-white">
      <Link to="/">
        <img src="/images/logo.png" alt="" width={40} />
      </Link>
      <nav className="space-x-4">
        <ul className="flex space-x-4 gap-2">
          <Link to="/">Home</Link>
          <Link to="/info">Info</Link>
          <Link to="/contact">Contact</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
