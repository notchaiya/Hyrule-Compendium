import Home from "./pages/Home.js";
import PageNotFound from "./pages/PageNotFound.js";
import Favorites from "./pages/Favorite.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext.js";
import { AudioProvider } from "./context/AudioContext.js";
import { AnimatedBackground } from "./components/AnimatedBackground.js";

function App() {
  return (
    <FavoritesProvider>
      <AudioProvider>
        <AnimatedBackground>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="favorites" element={<Favorites />} />
            </Routes>
          </BrowserRouter>
        </AnimatedBackground>
      </AudioProvider>
    </FavoritesProvider>
  );
}

export default App;
