import React from "react";
// import { useAuth0, User } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

interface ProfileProps {}

const Profile = (props: ProfileProps) => {
  // const { user, isAuthenticated, isLoading } = useAuth0<User>();
  const { isAuthenticated, data } = useSelector(
    (state: RootState) => state.auth
  );

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  return isAuthenticated && data ? (
    <div>
      <h2>{data?.name}</h2>
      <p>{data?.email}</p>
    </div>
  ) : null;
};

export default Profile;
