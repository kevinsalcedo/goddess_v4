import { SIGN_IN, SIGN_OUT, FETCH_POSTS } from "./types";
import axiosHook from "../api/axiosHook";

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

export const fetchPosts = () => async dispatch => {
  const response = await axiosHook.get("/posts");

  dispatch({
    type: FETCH_POSTS,
    payload: response.data
  });
};
