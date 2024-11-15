import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { APIAuthenticated } from "../http";
import { UserProfile, UserProfileState } from "./storetypes/userTypes";
import { authStatus } from "./storetypes/storeTypes";

const initialState: UserProfileState = {
  userProfile: [],
  singleUser: null,
  status: authStatus.loading,
  errorMessage:""
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfiles(
      state: UserProfileState,
      action: PayloadAction<UserProfile[]>
    ) {
      state.userProfile = action.payload;
    },
    setSingleUser(state: UserProfileState, action: PayloadAction<UserProfile>) {
      state.singleUser = action.payload;
    },
    setStatus(state: UserProfileState, action: PayloadAction<authStatus>) {
      state.status = action.payload;
    },
    resetStatus(state: UserProfileState) {
      state.status = authStatus.loading;
    },
    setErrorMessage(state: UserProfileState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;  
    },
  },
});

export const { setUserProfiles, setSingleUser, setStatus, resetStatus,setErrorMessage } =
  userProfileSlice.actions;
export default userProfileSlice.reducer;

export function addToUserProfile(formData: any) {
  return async function addToUserProfileThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));

    try {
      const response = await APIAuthenticated.post(
        "/customer/userprofile/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        // const { message, data } = response.data;
        // console.log("milan");
        // console.log(data);
        // console.log(message);

        dispatch(setSingleUser(response.data.data));
        dispatch(setStatus(authStatus.success));
      } else {
        dispatch(setErrorMessage(response.data.message))
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(authStatus.error));
    }
  };
}

export function fetchUserProfileById(userId: string) {
  return async function fetchUserProfileByIdThunk(
    dispatch: AppDispatch,
    getState: () => RootState
  ) {
    const state = getState();
    const existingUser = state.userProfile.userProfile.find(
      (user: UserProfile) => user.id === userId
    );

    if (existingUser) {
      dispatch(setSingleUser(existingUser));
      dispatch(setStatus(authStatus.success));
    } else {
      dispatch(setStatus(authStatus.loading));
      try {
        const response = await APIAuthenticated.get(
          `/customer/userprofile/${userId}`
        );
        if (response.status === 200) {
          // console.log("hello",response.data)
          dispatch(setSingleUser(response.data));
          dispatch(setStatus(authStatus.success));
        } else {
          // console.error("Error fetching user profile:", response);
          dispatch(setStatus(authStatus.error));
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        dispatch(setStatus(authStatus.error));
      }
    }
  };
}
