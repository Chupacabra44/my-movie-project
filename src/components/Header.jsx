const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-[#58225a] text-white">
      <span>Logo</span>
      <nav className="space-x-4">
        <ul className="flex space-x-4 gap-2">
          <li>Home</li>
          <li>Info</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
