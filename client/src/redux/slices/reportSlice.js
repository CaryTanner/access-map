import { createSlice } from "@reduxjs/toolkit";

import { getAllReports, getSingleReport } from "../../api/reportsAPI";

const reportsInitialState = {
  reportsById: {},
  reportsInGeojson: [],
  isLoading: false,
  error: null,
  visibleReports: null,
  reportsFilter: null,
  popupCoor: null,
};

function startLoading(state) {
  state.isLoading = true;
}

function loadingFailed(state, action) {
  state.isLoading = false;
  state.error = action.payload;
}

const reports = createSlice({
  name: "reports",
  initialState: reportsInitialState,
  reducers: {
    getSingleReportStart: startLoading,
    getAllReportsStart: startLoading,
    getSingleReportSuccess(state, action) {
      const { id } = action.payload;
      state.reportsById[id] = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getAllReportsSuccess(state, action) {
      const { reports } = action.payload;

      state.isLoading = false;
      state.error = null;

      reports.forEach((report) => {
        state.reportsById[report._id] = report;
        state.reportsInGeojson.push(convertToGeojson(report))
      });
    },
    getSingleReportFailure: loadingFailed,
    getAllReportsFailure: loadingFailed,
    setVisibleReports(state, action) {
      state.visibleReports = action.payload;
    },
    setReportsFilter(state, action) {
      state.reportsFilter = action.payload;
    },
    setPopupCoor(state, action) {
      state.popupCoor = action.payload;
    },
  },
});

export const {
  getAllReportsStart,
  getAllReportsSuccess,
  getSingleReportStart,
  getSingleReportSuccess,
  getSingleReportFailure,
  getAllReportsFailure,
  setVisibleReports,
  setReportsFilter,
  setPopupCoor,
} = reports.actions;

export default reports.reducer;

export const fetchAllReports = () => async (dispatch) => {
  try {
    dispatch(getAllReportsStart());
    const reports = await getAllReports();

    dispatch(getAllReportsSuccess(reports));
  } catch (err) {
    dispatch(getAllReportsFailure(err.toString()));
  }
};

export const fetchSingleReport = (id) => async (dispatch) => {
  try {
    dispatch(getSingleReportStart());
    const report = await getSingleReport(id);
    dispatch(getSingleReportSuccess(report));
  } catch (err) {
    dispatch(getSingleReportFailure(err.toString()));
  }
};


const convertToGeojson = ( report )=> {
 const {geometry, _id, created_date, created_by, title, category, formattedAddress, status } = report

 const geojson = {
  type: "Feature", 
  geometry,
   properties: {
     id: _id,
     created_date, 
     created_by, 
     title, 
     category, 
     formattedAddress, 
     status

   }  
 }
 return geojson
}