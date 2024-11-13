import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import {API} from "../http";
import { Package, PackageState } from "./storetypes/packageTypes";
import { authStatus } from "./storetypes/storeTypes";

const initialState: PackageState = {
 packages:[],
 status: authStatus.loading,
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
  },
});
export const { setPackage, setStatus, } = packageSlice.actions;
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



