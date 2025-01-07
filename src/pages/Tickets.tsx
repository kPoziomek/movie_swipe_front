import { TicketsCard } from "../components/Tickets";
import GoBack from "../components/GoBack.tsx";

const Tickets = () => {
  return(<>
      <div className="pb-3">
      <GoBack></GoBack>
      </div>
      <TicketsCard></TicketsCard>
  </>
 )
};
export default Tickets;
