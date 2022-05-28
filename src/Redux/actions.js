import * as type from "./actionType";

// LOAD USER DETAILS

export const loadUsersStart = (pageInfo) => ({
  type: type.LOAD_USERS_START,
  payload: pageInfo,
});

export const loadUsersSuccess = (users) => ({
  type: type.LOAD_USERS_SUCCESS,
  payload: users,
});
export const loadUsersError = (error) => ({
  type: type.LOAD_USERS_ERROR,
  payload: error,
});

// ADD USER DETAILS

export const createUserStart = (user) => ({
  type: type.CREATE_USER_START,
  payload: user,
});
export const createUserSuccess = () => ({
  type: type.CREATE_USER_SUCCESS,
});
export const createUserError = (error) => ({
  type: type.CREATE_USER_ERROR,
  payload: error,
});

// DELETE USER DETAILS

export const deleteUserStart = (userId) => ({
  type: type.DELETE_USER_START,
  payload: userId,
});
export const deleteUserSuccess = (userId) => ({
  type: type.DELETE_USER_SUCCESS,
  payload: userId,
});
export const updateUserError = (error) => ({
  type: type.DELETE_USER_ERROR,
  payload: error,
});

// UPDATE USER DETAILS

export const updateUserStart = (userInfo) => ({
  type: type.UPDATE_USER_START,
  payload: userInfo,
});
export const updateUserSuccess = (userId) => ({
  type: type.UPDATE_USER_SUCCESS,
});
export const deleteUserError = (error) => ({
  type: type.UPDATE_USER_ERROR,
  payload: error,
});

// SEARCH USER DEATILS

export const searchUserStart = (query) => ({
  type: type.SEARCH_USER_START,
  payload: query,
});
export const searchUserSuccess = (users) => ({
  type: type.SEARCH_USER_SUCCESS,
  payload: users,
});
export const searchUserError = (error) => ({
  type: type.SEARCH_USER_ERROR,
  payload: error,
});

// FILTER USER DATA

export const filterUserStart = (value) => ({
  type: type.FILTER_USER_START,
  payload: value,
});
export const filterUserSuccess = (users) => ({
  type: type.FILTER_USER_SUCCESS,
  payload: users,
});
export const filterUserError = (error) => ({
  type: type.FILTER_USER_ERROR,
  payload: error,
});

// SORT USER DATA

export const sortUserStart = (value) => ({
  type: type.SORT_USER_START,
  payload: value,
});
export const sortUserSuccess = (users) => ({
  type: type.SORT_USER_SUCCESS,
  payload: users,
});
export const sortUserError = (error) => ({
  type: type.SORT_USER_ERROR,
  payload: error,
});
