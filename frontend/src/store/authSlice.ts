import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {API} from "../http";
import { authStatus } from "./storetypes/storeTypes";

interface RegisterUser {
  email: string;
  password: string;
  username:string
}

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
  errorMessage:string
}

const initialState: AuthState = {
  user: {} as User,
  status: authStatus.loading,
  errorMessage:""
};
const authSlice = createSlice({
  name: "auth",
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
    setErrorMessage(state: AuthState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;  
    },

  },
});

export const { setUser, setStatus,resetStatus,setToken,resetToken,setErrorMessage} = authSlice.actions;
export default authSlice.reducer;

export function register(data: RegisterUser) {
  return async function regsiterThunk(dispatch: any) {
    dispatch(setStatus(authStatus.loading))
    try {
      const response = await API.post("/register", data);
      if (response.status == 200) {
        dispatch(setStatus(authStatus.success))

      } else {
        
        dispatch(setStatus(authStatus.error))
        
      }
    } catch (error) {
      console.log("error");
      dispatch(setStatus(authStatus.error))
    }
  };
}

export function login(data: LoginData) {
  return async function loginThunk(dispatch: any){
    dispatch(setStatus(authStatus.loading))
    try{
        const response =await API.post("/login",data)
        if(response.status ===200){
          const {data}=response.data
            dispatch(setStatus(authStatus.success))
            dispatch(setToken(data.token))
            localStorage.setItem('token',data)
        }
        else{
          dispatch(setErrorMessage("Error"))
            dispatch(setStatus(authStatus.error))
        }
    }catch(error){
      dispatch(setErrorMessage("Error"))
        console.log(error)
        dispatch(setStatus(authStatus.error))
    }
  }

}
