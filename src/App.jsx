const App = () => {
  return (
    <>
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
      <div className="overlay"></div>
      <main className="hero-section flex flex-col items-center justify-center text-center p-8">
        <img
          className="w-full max-w-lg h-auto object-contain mx-auto drop-shadow-md"
          src="/images/hero-img.png"
          alt="Hero image"
        />
      </main>
      <h1 className="text-white text-6xl font-bold text-center mt-8">
        Find{" "}
        <span className="bg-linear-to-r from-[#ccc5ff] to-[#972eff] bg-clip-text text-transparent">
          Movies
        </span>{" "}
        You'll Enjoy <br /> Without the Hassle
      </h1>
    </>
  );
};

export default App;
