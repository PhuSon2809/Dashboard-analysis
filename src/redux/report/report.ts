import { createSlice } from '@reduxjs/toolkit'
import { ReportHomeData } from '~/@types/models'
import { LOCAL_STORAGE } from '~/constants/localStorage'
import { getLocalStorage, setLocalStorage } from '~/utils/localStorage'

interface reportState {
  dataKey: 0 | 1 | 2
  homeReportOld: ReportHomeData | null
  homeReportCurrent: ReportHomeData | null
}

const initialState: reportState = {
  dataKey: getLocalStorage(LOCAL_STORAGE.DATA_KEY) || 0,
  homeReportOld: getLocalStorage(LOCAL_STORAGE.HOME_DATA_OLD) || null,
  homeReportCurrent: getLocalStorage(LOCAL_STORAGE.HOME_DATA_CURRENT) || null
}

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setDataKey: (state, action) => {
      state.dataKey = action.payload
      setLocalStorage(LOCAL_STORAGE.DATA_KEY, state.dataKey)
    },
    setReportHomeDataOld: (state, action) => {
      state.homeReportOld = action.payload
      setLocalStorage(LOCAL_STORAGE.HOME_DATA_OLD, state.homeReportOld)
    },
    setReportHomeDataCurrent: (state, action) => {
      state.homeReportCurrent = action.payload
      setLocalStorage(LOCAL_STORAGE.HOME_DATA_CURRENT, state.homeReportCurrent)
    }
  }
})

export const { setDataKey, setReportHomeDataOld, setReportHomeDataCurrent } = reportSlice.actions
const reportReducer = reportSlice.reducer

export default reportReducer
