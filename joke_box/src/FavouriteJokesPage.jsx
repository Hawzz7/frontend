import { useEffect, useState } from "react";
import axios from "axios";

const FavouriteJokesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/favourites"
        );

        setFavorites(response.data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl">Favorite Jokes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
        {favorites.map((joke) => (
          <div
            key={joke.id}
            className="p-4 border rounded-lg shadow-md bg-white flex flex-col items-center"
          >
            <p>{joke.joke_text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteJokesPage;
