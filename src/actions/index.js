import { SIGN_IN, SIGN_OUT } from "./types";

export const signIn = (email, uid) => {
  return {
    type: SIGN_IN,
    payload: {
      email,
      uid
    }
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};
