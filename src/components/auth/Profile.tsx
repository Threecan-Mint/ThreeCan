import React, { FC } from "react";
import { useAuth0, User } from "@auth0/auth0-react";

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  const { user, isAuthenticated, isLoading } = useAuth0<User>();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && user ? (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    ) : null
  );
};

export default Profile;
