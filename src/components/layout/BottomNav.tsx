import { Home, Ticket, Heart } from "lucide-react";
import { Link, useLocation } from "react-router";

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="w-full bg-white border-t py-2 text-black h-16">
      <div className="flex justify-around items-center">
        <Link to="/" className="flex flex-col items-center">
          <Home
            className={`w-6 h-6 ${location.pathname === "/" ? "text-blue-500" : "text-gray-500"}`}
          />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/tickets" className="flex flex-col items-center">
          <Ticket className="w-6 h-6 text-gray-500" />
          <span className="text-xs mt-1">Tickets</span>
        </Link>
        <Link to="/favorites" className="flex flex-col items-center">
          <Heart className="w-6 h-6 text-gray-500" />
          <span className="text-xs mt-1">Favorites</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
