import Home from "./pages/Home.js";
import PageNotFound from "./pages/PageNotFound.js";
import Favorites from "./pages/Favorite.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
