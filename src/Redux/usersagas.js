
import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";
import {
  createUserError,
  createUserSuccess,
  deleteUserError,
  deleteUserSuccess,
  loadUsersError,
  loadUsersSuccess,
  updateUserSuccess,
  updateUserError,
  searchUserSuccess,
  searchUserError,
  filterUserSuccess,
  filterUserError,
  sortUserSuccess,
  sortUserError,
} from "../Redux/actions";
import {
  loadUserApi,
  createUserApi,
  deteleUserApi,
  updateUserApi,
  searchUserApi,
  filterUserApi,
  sortUserApi,
} from "./Api";
import * as type from "./actionType";
function* onLoadUserStartAsync({ payload: { start, end, currentPage } })
 {
  console.log("onLoadUserStartAsync-->", start, end, currentPage  );
  try {
    const response = yield call(loadUserApi, start, end);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess({ users: response.data, currentPage }));
    }
  } catch (error) {
    yield put(loadUsersError(error.response.data));
  }
}

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    if (response.status === 201) {
      yield put(createUserSuccess(response.data));
    }
  } catch (error) {
    yield put(createUserError(error.response.data));
  }
}

function* onUpdateUserStartAsync({ payload: { id, formValue } }) {
  try {
    const response = yield call(updateUserApi, id, formValue);
    if (response.status === 200) {
      yield put(updateUserSuccess(response.data));
    }
  } catch (error) {
    yield put(updateUserError(error.response.data));
  }
}

function* onDeleteUserStartAsync(userId) {
  try {
    const response = yield call(deteleUserApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (error) {
    yield put(deleteUserError(error.response.data));
  }
}

function* onSearchUserStartAsync({ payload: query }) {
  try {
    const response = yield call(searchUserApi, query);
    if (response.status === 200) {
      yield put(searchUserSuccess(response.data));
    }
  } catch (error) {
    yield put(searchUserError(error.response.data));
  }
}

function* onFilterUserStartAsync({ payload: value }) {
  try {
    const response = yield call(filterUserApi, value);
    if (response.status === 200) {
      yield put(filterUserSuccess(response.data));
    }
  } catch (error) {
    yield put(filterUserError(error.response.data));
  }
}

function* onSortUserStartAsync({ payload: value }) {
  try {
    const response = yield call(sortUserApi, value);
    if (response.status === 200) {
      yield put(sortUserSuccess(response.data));
    }
  } catch (error) {
    yield put(sortUserError(error.response.data));
  }
}

function* onDeleteongetCardsStartAsyncUser() {
  while (true) {
    const { payload: userId } = yield take(type.DELETE_USER_START);
    yield call(onDeleteUserStartAsync, userId);
  }
}

function* onLoadUsers() {
  yield takeEvery(type.LOAD_USERS_START, onLoadUserStartAsync);
}
function* onCreateUser() {
  yield takeLatest(type.CREATE_USER_START, onCreateUserStartAsync);
}

function* onUpdateUser() {
  yield takeLatest(type.UPDATE_USER_START, onUpdateUserStartAsync);
}

function* onSearchUser() {
  yield takeLatest(type.SEARCH_USER_START, onSearchUserStartAsync);
}

function* onfilterUser() {
  yield takeLatest(type.FILTER_USER_START, onFilterUserStartAsync);
}

function* onsortUser() {
  yield takeLatest(type.SORT_USER_START, onSortUserStartAsync);
}
function* onDeleteUser() {
  while (true) {
    const { payload: userId } = yield take(type.DELETE_USER_START);
    yield call(onDeleteUserStartAsync, userId);
  }
}

const usersagas = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser),
  fork(onSearchUser),
  fork(onfilterUser),
  fork(onsortUser),
];

export default function* rootSaga() {
  yield all([...usersagas]);
}
