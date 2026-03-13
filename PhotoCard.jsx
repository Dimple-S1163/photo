const PhotoCard = ({ photo, toggleFavourite, favourites }) => {
  const isFav = favourites.some((fav) => fav.id === photo.id);

  return (
    <div
  className={`border rounded p-2 shadow ${
    isFav ? "border-red-400 bg-red-50" : ""
  }`}
>
      <img
        src={photo.download_url}
        alt={photo.author}
        className="w-full h-48 object-cover rounded hover:scale-105 transition"
      />

      <div className="flex justify-between items-center mt-2">
        <p className="text-sm">{photo.author}</p>

        <button onClick={() => toggleFavourite(photo)}>
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;