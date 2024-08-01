import { createSlice } from '@reduxjs/toolkit'
import { LOCAL_STORAGE } from '~/constants/localStorage'
import { getLocalStorage, setLocalStorage } from '~/utils/localStorage'

interface timecountState {
  timecount: number
  isFinishTimecount: boolean
}

const initialState: timecountState = {
  timecount: getLocalStorage(LOCAL_STORAGE.TIMECOUNT) || 0,
  isFinishTimecount: getLocalStorage(LOCAL_STORAGE.TIMECOUNT_FINISH) || true
}

const timecountSlice = createSlice({
  name: ' timecount',
  initialState,
  reducers: {
    setTimecount: (state, action) => {
      state.timecount = action.payload
      setLocalStorage(LOCAL_STORAGE.TIMECOUNT, state.timecount)
    },
    setFinishTimecount: (state, action) => {
      state.isFinishTimecount = action.payload
      setLocalStorage(LOCAL_STORAGE.TIMECOUNT_FINISH, action.payload)
    }
  }
})

export const { setTimecount, setFinishTimecount } = timecountSlice.actions
const timecountReducer = timecountSlice.reducer

export default timecountReducer
