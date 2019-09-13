import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: false,
  email: null,
  uid: null
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        email: action.payload.email,
        uid: action.payload.uid
      };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, email: null, uid: null };
    default:
      return state;
  }
};
