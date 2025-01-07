type TicketsCardHeaderProps = {
  date?: string;
  time?: string;
  screen?: string;
  seat?: string;
};

export const TicketsCardHeader = ({
  date,
  time,
  screen,
  seat,
}: TicketsCardHeaderProps) => {
  return (
    <div className="flex flex-1 flex-col justify-start items-start space-y-2">
      <p className="text-md self-start font-semibold text-gray-800">
        Date: {date}
      </p>
      <p className="text-sm self-start text-gray-600">Time: {time}</p>
      <p className="text-sm self-start text-gray-600">Screen: {screen}</p>
      <p className="text-sm self-start text-gray-600">Seat: {seat}</p>
    </div>
  );
};
