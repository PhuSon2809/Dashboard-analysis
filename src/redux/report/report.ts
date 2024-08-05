/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ReportHomeData } from '~/@types/models'
import { axiosClient } from '~/api/axiosClient'
import { LOCAL_STORAGE } from '~/constants/localStorage'
import { getLocalStorage, setLocalStorage } from '~/utils/localStorage'

interface reportState {
  isLoading: boolean
  dataKey: 0 | 1 | 2
  homeReportOld: ReportHomeData | null
  homeReportCurrent: any
}

const initialState: reportState = {
  isLoading: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.isLoading = true
        state.homeReportCurrent = action.payload
        setLocalStorage(LOCAL_STORAGE.HOME_DATA_CURRENT, state.homeReportCurrent)
      })
      .addCase(fetchReport.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const { setDataKey, setReportHomeDataOld, setReportHomeDataCurrent } = reportSlice.actions
const reportReducer = reportSlice.reducer

export default reportReducer

export const fetchReport = createAsyncThunk('report/fetchReport', async () => {
  try {
    const res = await axiosClient.get('https://d-api.m.pro/analysis')
    console.log('fetch-report', res)
    if (res) {
      setLocalStorage(LOCAL_STORAGE.HOME_DATA_CURRENT, res)
      return res
    }
  } catch (error) {
    console.log('Error report home: ', error)
    return error
  }
})
