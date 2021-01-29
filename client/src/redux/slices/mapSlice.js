import { createSlice } from "@reduxjs/toolkit";




const mapSlice = createSlice({
    name: "mapSlice",
    initialState: {
      visibleReports: [],
      reportsFilter: [],
      popupCoor: null},
    reducers: {
      setVisibleReports(state, action) {
        
        state.visibleReports = action.payload
      },
      setReportsFilter(state, action) {
        state.reportsFilter = action.payload
      },
      setPopupCoor(state, action) {
        state.popupCoor = action.payload;
      },
    }
})

export const {
  setVisibleReports,
  setReportsFilter,
  setPopupCoor,
  } = mapSlice.actions;
  
  export default mapSlice.reducer;