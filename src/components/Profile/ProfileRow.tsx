
type ProfileRowProps = {
  icon: React.ReactNode;
  text: string;
  votes: number;
}

export const ProfileRow = ({ icon, text, votes }:ProfileRowProps) => {
  return (
    <li className="flex justify-between">
      <div className="flex">
        {icon}
        <p>{text}</p>
      </div>
      {votes}
    </li>
  );
};
