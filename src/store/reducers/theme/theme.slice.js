const { createSlice } = require("@reduxjs/toolkit");

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkTheme: false,
  },
  reducers: {
    toggleDarkMode: (state, action) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
