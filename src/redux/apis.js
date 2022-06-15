import {
  loginStart, loginSuccess, loginError, logoutMethod,
  registerStart, registerSuccess, registerError
} from "./userRedux";
import { publicRequest } from "../requests";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user );
    dispatch(loginSuccess(res.data));
    window.location.href = "/";
  } catch (e) {
    dispatch(loginError());
  }
};

export const logout = (dispatch) => {
  dispatch(logoutMethod());
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/registerUser", user);
    dispatch(registerSuccess(res.data));
    window.location.href = "/";
  } catch (e) {
    dispatch(registerError());
  }
};

export const createOrder = async (order) => {
  try {
    const res = await publicRequest.post("/order", order);
    window.location.href = "/";
  } catch (e) {}
};

export const updateUserWishlist = async (wishlist, id) => {
  try {
    const res = await publicRequest.put(`/user/wishlist/${id}`, wishlist);
  } catch (e) {}
};
