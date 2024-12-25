import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const JokesPage = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    let fetchJoke = async () => {
      setLoading(true);
      try {
        const headers = { Accept: "application/json" };
        const promises = Array.from({ length: itemsPerPage }, () =>
          axios.get("https://icanhazdadjoke.com/", { headers })
        );

        const response = await Promise.all(promises);
        let jokesData = response.map((res) => res.data);
        setJokes(jokesData);
      } catch (err) {
        console.log("Error: ", err);
      }
      setLoading(false);
    };
    fetchJoke();
  }, [currentPage]);

  // console.log("Jokes data: ", jokes);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleFavorite = async (joke) => {
    try {
      await axios.post("http://localhost:8000/api/favourite", {
        joke_id: joke.id,
        joke_text: joke.joke,
      });
      alert("Joke added to favorites!");
    } catch (err) {
      console.error("Error adding favorite:", err);
    }
  };

  const filteredJokes = jokes.filter((joke) =>
    joke.joke.toLowerCase().includes(searchQuery)
  );

  // Pagination handlers
  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  // Render loading state
  if (loading) {
    return <div>Loading jokes...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl">Jokes Page</h1>

      <div className="flex w-full">
        {/* Search Bar */}
        <div className="w-full  my-4">
          <input
            type="text"
            placeholder="Search jokes..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Navigation Button */}
        <div className="w-full  my-4 text-right">
          <Link to="/favourites">
            <button className="p-2 bg-green-500 text-white rounded-md">
              Go to Favourites
            </button>
          </Link>
        </div>
      </div>

      {/* Jokes in Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
        {filteredJokes.length > 0 ? (
          filteredJokes.map((joke) => (
            <div
              key={joke.id}
              className="p-4 border rounded-lg shadow-md bg-white flex flex-col items-center"
            >
              <img
                src={`https://source.unsplash.com/random/300x200?sig=${joke.id}`}
                alt="Joke Visual"
                className="w-full h-40 object-cover mb-2"
              />
              <p className="text-center">{joke.joke}</p>
              <button
                onClick={() => handleFavorite(joke)}
                className="mt-2 p-2 bg-blue-500 text-white rounded-md"
              >
                Add to Favorites
              </button>
            </div>
          ))
        ) : (
          <p>No jokes found for &quot;{searchQuery}&quot;</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center mt-4">
        <button
          className="p-1 bg-gray-300 rounded-md"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="m-2">Page {currentPage}</span>
        <button className="p-1 bg-gray-300 rounded-md" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default JokesPage;
