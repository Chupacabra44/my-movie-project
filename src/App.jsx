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
      <section className="flex flex-col items-start mt-12 px-8 text-white">
        <h2 className="text-4xl z-10 ps-14 mt-14 relative">All Movies</h2>
        <div className="flex flex-wrap flex-col gap-8 justify-center mb-16 bg-[#241a1b]  min-w-100 m-10 z-20 rounded-2xl">
          <img
            className="z-20 max-w-80 h-auto object-contain m-10 rounded-2xl"
            src="/images/No-Poster.png"
            alt="Movie poster"
          />
          <div className="flex flex-col gap-4 z-20 p-5">
            <h3>Movie name</h3>
            <div className="flex gap-4 items-center justify-items-start z-20">
              <div>
                <img src="/images/star-1.png" alt="" />
              </div>
              <span>8.5</span>
              <span>2023</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
