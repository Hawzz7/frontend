import FavouriteJokesPage from "./FavouriteJokesPage.jsx";
import JokesPage from "./JokesPage.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<JokesPage />} />
          <Route path="/favourites" element={<FavouriteJokesPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
