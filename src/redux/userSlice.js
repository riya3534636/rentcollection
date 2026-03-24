
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.userData = action.payload;
    },
   
    
  },
});

export const { setCurrentUser } =
  userSlice.actions;
export default userSlice.reducer;
