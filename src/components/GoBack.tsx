import { Link } from "react-router";
import {  ChevronLeft } from "lucide-react";

type Props = {
  to?: string;
}

const GoBack = ({to="/"}:Props) => {

  return (
    <Link to={to}><ChevronLeft/></Link>
  );
};
export default GoBack;
