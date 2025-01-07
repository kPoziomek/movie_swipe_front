type ProfileInfoProps = {
  title: string;
  value: string;
};

export const ProfileInfo = ({ title, value }: ProfileInfoProps) => {
  return (
    <div className="text-center">
      <p>{value}</p>
      <p className="text-xs text-gray-600">{title}</p>
    </div>
  );
};
