import * as type from "./actionType";

const initialState = {
  users: [],
  loading: false,
  error: null,
  pageLimit: 4,
  currentPage: 0,
  paginationMode: true,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.LOAD_USERS_START:
    case type.CREATE_USER_START:
    case type.DELETE_USER_START:
    case type.UPDATE_USER_START:
    case type.SEARCH_USER_START:
    case type.FILTER_USER_START:
    case type.SORT_USER_START:
      return {
        ...state,
        loading: true,
      };
    case type.LOAD_USERS_SUCCESS:
      // console.log("load===>",action.payload.users);

      return {
        ...state,
        loading: false,
        users: action.payload.users,
        currentPage: state.currentPage + action.payload.currentPage,
        paginationMode: true,
      };
    case type.SEARCH_USER_SUCCESS:
    case type.FILTER_USER_SUCCESS:
    case type.SORT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        paginationMode: false,
      };
    case type.CREATE_USER_SUCCESS:
    case type.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case type.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((data) => data.id !== action.payload),
      };
    case type.LOAD_USERS_ERROR:
    case type.CREATE_USER_ERROR:
    case type.DELETE_USER_ERROR:
    case type.UPDATE_USER_ERROR:
    case type.SEARCH_USER_ERROR:
    case type.FILTER_USER_ERROR:
    case type.SORT_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default usersReducer;
