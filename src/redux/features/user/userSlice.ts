import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload?.username;
      localStorage.setItem(
        'auth',
        JSON.stringify({
          accessToken: action.payload?.accessToken,
          username: action.payload?.username,
        })
      );
    },
    logout: (state) => {
      state.username = null;
      localStorage.setItem(
        'auth',
        JSON.stringify({
          accessToken: null,
          username: null,
        })
      );
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
