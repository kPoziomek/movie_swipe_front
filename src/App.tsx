// src/App.tsx
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router";
import Tickets from "./pages/Tickets.tsx";
import { MovieCard } from "./components/Movie";
function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieCard />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
