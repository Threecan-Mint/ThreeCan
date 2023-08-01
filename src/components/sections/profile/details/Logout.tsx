import { auth } from "@canva/user";
import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "src/store/slices/auth";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const onLogOut = async () => {
    try {
      const token = await auth.getCanvaUserToken();

      if (!token) return;

      const jsonResponse = await fetch(`${BACKEND_HOST}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await jsonResponse.json();
      if (response) {
        dispatch(logOut());
      }
    } catch (error) {
      console.log("Error while logout: ", error);
      dispatch(logOut());
    }
  };

  return <button onClick={onLogOut}>Log Out</button>;
};

export default LogoutButton;
