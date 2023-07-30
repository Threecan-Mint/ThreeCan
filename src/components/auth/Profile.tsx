import React from "react";
// import { useAuth0, User } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { Rows, Text } from "@canva/app-ui-kit";

interface ProfileProps {}

const Profile = (props: ProfileProps) => {
  const { isAuthenticated, data } = useSelector(
    (state: RootState) => state.auth
  );
  return isAuthenticated && data ? (
    <Rows spacing ={"1u"}>
      <Text>{data?.name}</Text>
      <Text>Credits: x</Text>
    </Rows>
  ) : null;
};

export default Profile;
