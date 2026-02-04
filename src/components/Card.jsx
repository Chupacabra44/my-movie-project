const Card = ({ movie }) => {
  const { poster_path, title, vote_average, release_date } = movie;
  return (
    <>
      <img
        className="z-20 max-w-72 h-auto object-contain m-10 rounded-2xl"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "images/No-Poster.png"
        }
        alt="Movie poster"
      />
      <div className="flex flex-col gap-4 z-20 p-5">
        <h3 className="text-left font-bold">{title}</h3>
        <div className="flex gap-2 items-center z-20">
          <div>
            <img src="/images/star-1.png" alt="" />
          </div>
          <span>•</span>
          <span>{vote_average.toFixed(1)}</span>
          <span>•</span>
          <span>{release_date.slice(0, 4)}</span>
        </div>
      </div>
    </>
  );
};

export default Card;
