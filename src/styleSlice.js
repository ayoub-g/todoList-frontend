import { createSlice } from '@reduxjs/toolkit';
const initialState = { isDarkMode: false }
export const styleSlice = createSlice({
    name: 'style',
    initialState,
    reducers: {
        switchTheme: (state, action) => { state.isDarkMode = action.payload }
    }
});

export default styleSlice.reducer;
export const switchTheme = styleSlice.actions.switchTheme;
export const selectIsDarkMode = (state) => state.style.isDarkMode;