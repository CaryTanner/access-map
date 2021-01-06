import { createSlice } from '@reduxjs/toolkit'

import { getAllReports, getSingleReport  } from '../../api/reportsAPI'


const reportsInitialState = {
  reportsById: {},
 
  isLoading: false,
  error: null
} 

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const reports = createSlice({
  name: 'reports',
  initialState: reportsInitialState,
  reducers: {
    getSingleReportStart: startLoading,
    getAllReportsStart: startLoading,
    getSingleReportSuccess(state, payload) {
      const { id } = payload
      state.reportsById[id] = payload
      state.isLoading = false
      state.error = null
    },
    getAllReportsSuccess(state, payload ) {
      console.log(payload.payload)
      const { reports } = payload.payload
     
      state.isLoading = false
      state.error = null

      reports.forEach(report => {
        state.reportsById[report._id] = report
      })

      
    },
    getSingleReportFailure: loadingFailed,
    getAllReportsFailure: loadingFailed
  }
})

export const {
  getAllReportsStart,
  getAllReportsSuccess,
  getSingleReportStart,
  getSingleReportSuccess,
  getSingleReportFailure,
  getAllReportsFailure
} = reports.actions

export default reports.reducer

export const fetchAllReports = (
  
) => async dispatch => {
  try {
    dispatch(getAllReportsStart())
    const reports = await getAllReports()
    
    dispatch(getAllReportsSuccess(reports))
  } catch (err) {
    dispatch(getAllReportsFailure(err.toString()))
  }
}

export const fetchSingleReport = (id
  
) => async dispatch => {
  try {
    dispatch(getSingleReportStart())
    const report = await getSingleReport(id)
    dispatch(getSingleReportSuccess(report))
  } catch (err) {
    dispatch(getSingleReportFailure(err.toString()))
  }
}