import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userDataState, userDataPayload } from "../../types/intefaces";
import { RootState } from "store/store";
const initialState: userDataState = {
  userData: {},
};
const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<userDataPayload>) => {
      state.userData = action.payload;
    },
  },
});

const persistConfig = {
  key: "userDataSlice",
  storage,
};

const persisteduserDataReducer = persistReducer(
  persistConfig,
  userDataSlice.reducer
);

const getUserDataState = (state: RootState) => state.userdata.userData;

export const getUserData = createSelector(
  [getUserDataState],
  (userData) => userData
);
export const { updateUserData } = userDataSlice.actions;
export default persisteduserDataReducer;
