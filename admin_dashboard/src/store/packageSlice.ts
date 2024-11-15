import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Package, PackageState, User } from "../types/package";
import { authStatus } from "../types/status";
import { API, APIAuthenticated } from "../http";


const initialState: PackageState = {
 packages:[],
 status: authStatus.loading,
 users:[]
};
const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setPackage(state: PackageState, action: PayloadAction<Package[]>) {
      state.packages = action.payload;
    },
    setStatus(state: PackageState, action: PayloadAction<authStatus>) {
      state.status = action.payload;
    },
    setUsers(state: PackageState, action: PayloadAction<User[]>) {
        state.users = action.payload;
      },
  },
});
export const { setPackage, setStatus,setUsers } = packageSlice.actions;
export default packageSlice.reducer;

export function fetchPackage() {
  return async function fetchPackageThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await API.get("/package");
      if (response.status == 200) {
        const { data } = response.data;
        dispatch(setStatus(authStatus.success));
        dispatch(setPackage(data));
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  };
}
export function fetchUsers() {
    return async function fetchUsersThunk(dispatch: AppDispatch) {
      dispatch(setStatus(authStatus.loading));
      try {
        const response = await APIAuthenticated.get('/users');
        if (response.status == 200) {
          const { data } = response.data;
          dispatch(setStatus(authStatus.success));
          dispatch(setUsers(response.data.data));
        } else {
          dispatch(setStatus(authStatus.error));
        }
      } catch (error) {
        dispatch(setStatus(authStatus.error));
      }
    };
  }


