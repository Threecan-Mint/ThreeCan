import { auth as canvaAuth } from "@canva/user";

export const initiateCanvaAuthenticationFlow = async () => {
  try {
    const response = await canvaAuth.requestAuthentication();
    return response.status === "COMPLETED";
  } catch (error) {
    console.error("Error while initiating Canva authentication: ", error);
    return false;
  }
};
