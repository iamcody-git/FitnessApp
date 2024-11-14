import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { API, APIAuthenticated } from "../http";
import { UserProfile, UserProfileState } from "./storetypes/userTypes";
import { authStatus } from "./storetypes/storeTypes";
import { useNavigate } from "react-router-dom";

const initialState: UserProfileState = {
  userProfile: [],           // Array to store multiple profiles
  singleUser: null,           // Holds the profile fetched by ID
  status: authStatus.loading,
 
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfiles(state:UserProfileState, action: PayloadAction<UserProfile[]>) {
      state.userProfile = action.payload;
    },
    setSingleUser(state:UserProfileState, action: PayloadAction<UserProfile>) {
      state.singleUser = action.payload;
    },
    setStatus(state:UserProfileState, action: PayloadAction<authStatus>) {
      state.status = action.payload;
    },
    resetStatus(state:UserProfileState){
      state.status =authStatus.loading
    },
   
  },
});

export const { setUserProfiles, setSingleUser, setStatus,resetStatus } = userProfileSlice.actions;
export default userProfileSlice.reducer;

// Thunk to add a new user profile
export function addToUserProfile(formData: any) {
  return async function addToUserProfileThunk(dispatch: AppDispatch){
    dispatch(setStatus(authStatus.loading));
    
    try {
      const response = await APIAuthenticated.post("/customer/userprofile/register", formData, {
        headers: { "Content-Type": "application/json" },
  
        
      });
      console.log("hello");
      
      if (response.status === 200) {
          const { message, userProfile, recommendedPackage } = response.data;

          console.log(userProfile)
          console.log(message); 

          dispatch(setSingleUser(response.data.userProfile));
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

export function fetchUserProfileById(userProfileId: string) {
  return async function fetchUserProfileByIdThunk(dispatch: AppDispatch, getState: () => RootState) {
    const state = getState();
    const existingUser = state.userProfile.userProfile.find((user: UserProfile) => user.id === userProfileId);
    
    if (existingUser) {
      dispatch(setSingleUser(existingUser));
      dispatch(setStatus(authStatus.success));
    } else {
      dispatch(setStatus(authStatus.loading));
      try {
        
        const response = await APIAuthenticated.get(`/customer/userprofile/${userProfileId}`);
        if (response.status === 200) {
          console.log("hello",response.data)
          dispatch(setSingleUser(response.data.data))
          dispatch(setStatus(authStatus.success))
  
        } else {
          console.error("Error fetching user profile:", response);
          dispatch(setStatus(authStatus.error));
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        dispatch(setStatus(authStatus.error));
      }
    }
  };
}