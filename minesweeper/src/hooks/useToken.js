import random from "../helpers/ramdon";

const useToken = () => {
  if (!sessionStorage.token) {
    return random() + random();
  }
  return sessionStorage.token;
};

export default useToken;
