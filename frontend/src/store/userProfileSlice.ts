import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { APIAuthenticated } from "../http";
import { UserProfile, UserProfileState } from "./storetypes/userTypes";
import { authStatus } from "./storetypes/storeTypes";

const initialState: UserProfileState = {
  userProfile: [],           // Array to store multiple profiles
  singleUser: null,           // Holds the profile fetched by ID
  status: authStatus.loading, // Loading status for async actions
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfiles(state, action: PayloadAction<UserProfile[]>) {
      state.userProfile = action.payload;
    },
    setSingleUser(state, action: PayloadAction<UserProfile>) {
      state.singleUser = action.payload;
    },
    setStatus(state, action: PayloadAction<authStatus>) {
      state.status = action.payload;
    },
  },
});

export const { setUserProfiles, setSingleUser, setStatus } = userProfileSlice.actions;
export default userProfileSlice.reducer;

// Thunk to add a new user profile
export function addToUserProfile(formData: any) {
  return async (dispatch: AppDispatch) => {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.post("/customer/userprofile/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        dispatch(setSingleUser(response.data.data));
        dispatch(setStatus(authStatus.success));
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(authStatus.error));
    }
  };
}

// Thunk to fetch a user profile by ID
export function fetchUserProfileById(userId: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { userProfile: { singleUser } } = getState();

    if (singleUser?.userId === userId) {
      // Reuse the existing user if it matches the requested ID
      dispatch(setStatus(authStatus.success));
    } else {
      dispatch(setStatus(authStatus.loading));
      try {
        const response = await APIAuthenticated.get(`/customer/userprofile/${userId}`);
        if (response.status === 200) {
          dispatch(setSingleUser(response.data.data));
          dispatch(setStatus(authStatus.success));
        } else {
          dispatch(setStatus(authStatus.error));
        }
      } catch (error) {
        console.error(error);
        dispatch(setStatus(authStatus.error));
      }
    }
  };
}
