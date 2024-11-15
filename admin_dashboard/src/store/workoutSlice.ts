import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authStatus } from '../types/status';
import { AppDispatch } from './store';
import { Initialstate, Workout } from '../types/data';
import { APIAuthenticated } from '../http';


const initialState: Initialstate = {
    workout:[],
    status: authStatus.loading,
 
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    setStatus(state: Initialstate, action: PayloadAction<authStatus>) {
      state.status = action.payload;
    },
    setWorkout(state:Initialstate,action:PayloadAction<Workout[]>){
        state.workout=action.payload
    }
  },
});
export const { setStatus,setWorkout } =
  workoutSlice.actions;
export default workoutSlice.reducer;


export function addWorkout(data: Workout) {
    return async function addWorkoutThunk(dispatch: AppDispatch) {
      dispatch(setStatus(authStatus.loading));
      try {
        const response = await APIAuthenticated.post('/admin/workout', data);
        if (response.status == 200) {
          dispatch(setStatus(authStatus.success));
          
        } else {
          dispatch(setStatus(authStatus.error));
        }
      } catch (error) {
        dispatch(setStatus(authStatus.error));
      }
    };
  }

export function fetchWorkout() {
  return async function fetchWorkoutThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.get('/admin/workout');
      if (response.status == 200) {
        const { data } = response.data;
        console.log(data)
        dispatch(setStatus(authStatus.success));
        dispatch(setWorkout(response.data.data))
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  };
}

export function deleteWorkout(workoutId: string) {
    return async function deleteProductThunk(dispatch: AppDispatch) {
      dispatch(setStatus(authStatus.loading));
      try {
        const response = await APIAuthenticated.delete(`/admin/workout/${workoutId}`);
        if (response.status == 200) {
          dispatch(setStatus(authStatus.success));
        } else {
          dispatch(setStatus(authStatus.error));
        }
      } catch (error) {
        dispatch(setStatus(authStatus.error));
      }
    };
  }

  export function updateWorkout(workoutId: string,data:Workout) {
    return async function updateProductThunk(dispatch: AppDispatch) {
      dispatch(setStatus(authStatus.loading));
      try {
        const response = await APIAuthenticated.patch(`/admin/workout/${workoutId}`,data,
            {
                headers: { "Content-Type": "application/json" },
              }
        );
        if (response.status == 200) {
          dispatch(setStatus(authStatus.success));
          
        } else {
          dispatch(setStatus(authStatus.error));
        }
      } catch (error) {
        dispatch(setStatus(authStatus.error));
      }
    };
  }
 