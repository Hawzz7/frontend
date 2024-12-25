import FavouriteJokesPage from "./FavouriteJokesPage";
import JokesPage from "./jokesPage";
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
