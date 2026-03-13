const getStoredFavourites = () => {
  const data = localStorage.getItem("favourites");
  return data ? JSON.parse(data) : [];
};

export const initialState = {
  favourites: getStoredFavourites()
};

export const favouritesReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FAV":
      const exists = state.favourites.find(
        (photo) => photo.id === action.payload.id
      );

      let updated;

      if (exists) {
        updated = state.favourites.filter(
          (photo) => photo.id !== action.payload.id
        );
      } else {
        updated = [...state.favourites, action.payload];
      }

      localStorage.setItem("favourites", JSON.stringify(updated));

      return { favourites: updated };

    default:
      return state;
  }
};