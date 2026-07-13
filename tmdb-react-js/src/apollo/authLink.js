import { setContext } from "@apollo/client/link/context";
import { ACCESS_TOKEN } from "../constants/auth";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export default authLink;