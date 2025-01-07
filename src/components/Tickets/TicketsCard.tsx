import QRCode from "react-qr-code";
import { TicketsCardHeader } from "./index.ts";

type TicketsCardProps = {
  qrCode?: string;
  date?: string;
  time?: string;
  screen?: string;
  seat?: string;
};

export const TicketsCard = ({
  qrCode,
  date = "22-01-2025",
  time = "08:00",
  screen = "2",
  seat = "23",
}: TicketsCardProps) => {
  return (
    <div className="flex flex-row gap-5 border rounded-lg p-6 shadow-lg max-w-sm mx-auto bg-white">
      <TicketsCardHeader date={date} time={time} screen={screen} seat={seat} />
      <div className="">
        <QRCode size={128} value={qrCode || "default"} />
      </div>
    </div>
  );
};
