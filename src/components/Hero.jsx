import { Link } from "react-router";
const Hero = () => {
  return (
    <>
      <Link to={"/"}>
        <img
          className="w-full max-w-lg h-auto object-contain mx-auto drop-shadow-md"
          src="/images/hero-img.png"
          alt="Hero image"
        />
      </Link>

      <h1 className="text-white text-6xl font-bold text-center mt-8 z-40">
        Find
        <span className="bg-linear-to-r from-[#ccc5ff] to-[#972eff] bg-clip-text text-transparent">
          Movies
        </span>
        You'll Enjoy <br /> Without the Hassle
      </h1>
    </>
  );
};

export default Hero;
