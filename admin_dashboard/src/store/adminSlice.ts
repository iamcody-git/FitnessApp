import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { authStatus } from "../types/status";
import { API } from "../http";

interface LoginData {
  email: string;
  password: string;
}

interface User {
  email: string;
  password: string;
  token: string;
}

interface AuthState {
  user: User ;
  status: string;
  token:string|null
}

const initialState: AuthState = {
  user: {} as User,
  status: authStatus.loading,
  token: null
};
const adminSlice= createSlice({

  name: "admin",
  initialState,
  reducers: {
    setUser(state: AuthState, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setStatus(state: AuthState, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    resetStatus(state:AuthState){
      state.status =authStatus.loading
    },
    setToken(state:AuthState,action:PayloadAction<string>){
    state.user.token = action.payload
    },
    resetToken(state:AuthState){
      state.user.token = ''
    }, 

  },
});

export const { setUser, setStatus,resetStatus,setToken,resetToken} = adminSlice.actions;
export default adminSlice.reducer;


export function login(data: LoginData) {
  return async function loginThunk(dispatch: any){
    dispatch(setStatus(authStatus.loading))
    try{
        const response =await API.post("/login",data)
        if(response.status ===200){
          const {data}=response.data
            dispatch(setStatus(authStatus.success))
            dispatch(setToken(data))
            localStorage.setItem('token',data)
        }
        else{
            dispatch(setStatus(authStatus.error))
        }
    }catch(error){
        console.log(error)
        dispatch(setStatus(authStatus.error))
    }
  }

}

