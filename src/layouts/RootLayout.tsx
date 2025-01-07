import Navbar from "../components/layout/Navbar";
import BottomNav from "../components/layout/BottomNav";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="h-screen flex flex-col ">
      <Navbar />
      <main className="flex-1 px-2 w-full bg-gray-50">{<Outlet />}</main>
      <BottomNav />
    </div>
  );
};

export default RootLayout;
