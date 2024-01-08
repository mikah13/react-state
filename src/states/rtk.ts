import { defaultStudent, registerCourse } from '@/lib/student';
import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const studentSlice = createSlice({
  name: 'student',
  initialState: defaultStudent,
  reducers: {
    reset: () => {
      return defaultStudent;
    },
    addCourse: (state) => {
      return registerCourse(state);
    },
  },
});

export const store = configureStore({
  reducer: {
    student: studentSlice.reducer,
  },
});

export const { reset, addCourse } = studentSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
