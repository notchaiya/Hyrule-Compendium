import Home from "./pages/Home.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Favorites from "./pages/Favorites.jsx";
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
