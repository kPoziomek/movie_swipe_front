import { Link } from "react-router";
import { UserCircle, Bell } from "lucide-react";
import { useUser } from "../../hooks/useUser.ts";
import { MoonLoader } from "react-spinners";

const Navbar = () => {
  const { user, loading } = useUser();

  return (
    <header className="bg-white border-b py-5 px-6 h-16 w-full">
      <nav className="flex justify-between items-center">
        <Link to={"/profile"} className="text-2xl font-bold text-black">
          <UserCircle className="w-6 h-6 text-black" />
        </Link>
        {loading ? (
          <MoonLoader size={20} />
        ) : (
          <span className="text-sm text-black font-medium">
            Hello {user?.name}
          </span>
        )}
        <Bell className="w-6 h-6 text-black" />
      </nav>
    </header>
  );
};

export default Navbar;
