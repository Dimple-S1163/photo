import { useReducer, useMemo, useCallback, useState } from "react";
import PhotoCard from "./PhotoCard";
import useFetchPhotos from "../hooks/useFetchPhotos";
import { favouritesReducer, initialState } from "../reducers/favouritesReducer";

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos();

  const [state, dispatch] = useReducer(favouritesReducer, initialState);

  const [search, setSearch] = useState("");

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [photos, search]);

  const toggleFavourite = (photo) => {
    dispatch({
      type: "TOGGLE_FAV",
      payload: photo
    });
  };

  if (loading)
  return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
    </div>
  );
  if (error) return <p>{error}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search by author..."
        onChange={handleSearch}
        className="border p-2 mb-4 w-full"
      />
      <p className="mb-4 text-sm text-gray-600">
  Favourites: {state.favourites.length}
</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            toggleFavourite={toggleFavourite}
            favourites={state.favourites}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;