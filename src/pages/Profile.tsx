import { ProfileCard } from "../components/Profile";
import { useUser } from "../hooks/useUser.ts";
import CardLoader from "../components/CardLoader.tsx";
const Profile = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <CardLoader />;
  }

  return user && <ProfileCard user={user} />;
};
export default Profile;
