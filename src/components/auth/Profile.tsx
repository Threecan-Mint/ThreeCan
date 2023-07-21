import React from "react";
// import { useAuth0, User } from "@auth0/auth0-react";
import useAppState from "src/useAppState";

interface ProfileProps {}

const Profile = (props: ProfileProps) => {
  // const { user, isAuthenticated, isLoading } = useAuth0<User>();
  const {
    state: {
      auth: { isAuthenticated, data },
    },
  } = useAppState();

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  return isAuthenticated && data ? (
    <div>
      <img src={data?.picture} alt={data?.name} />
      <h2>{data?.name}</h2>
      <p>{data?.email}</p>
    </div>
  ) : null;
};

export default Profile;
