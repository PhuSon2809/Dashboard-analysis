import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface rootState {
  isFinish: boolean
}

const initialState: rootState = {
  isFinish: false
}

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoot.fulfilled, (state, action) => {
        state.isFinish = action.payload
      })
      .addCase(fetchRoot.rejected, (state) => {
        state.isFinish = false
      })
  }
})

const rootReducer = rootSlice.reducer

export default rootReducer

export const fetchRoot = createAsyncThunk('root/fetchRoot', async () => {
  try {
    console.log('Deep-analysis start fetch root')
    return true
  } catch (error) {
    console.log('Error fetch root: ', error)
    return false
  }
})
