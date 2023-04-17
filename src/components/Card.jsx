import no_image_available from "../no_image_available.svg";

function Card({ id, title, year, type, poster }) {
  const Type = { movie: "Movie", series: "Series", game: "Game" };
  return (
    <div className="text-center mx-5 mb-6 pb-3 bg-[#242B2E] p-0.5 rounded-xl drop-shadow-2xl">
      <img
        className="w-48 h-72 mx-auto mb-2 rounded-t-xl"
        src={poster != "N/A" ? poster : no_image_available}
      />
      <p className="w-48 mx-auto font-bold text-lg">{title}</p>
      <p>
        {Type[type]} ({year})
      </p>
    </div>
  );
}

export default Card;
