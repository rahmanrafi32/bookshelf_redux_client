import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
      localStorage.setItem('auth', JSON.stringify(state.username));
    },
    logout: (state) => {
      state.username = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
