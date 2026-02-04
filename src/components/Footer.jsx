const Footer = () => {
  return (
    <div>
      <footer className="bg-[#210836] text-white text-center p-4 mt-12">
        <p>
          &copy; {new Date().getFullYear()} My Movie Project. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
