import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from '../../app/db'
import { signInWithEmailAndPassword } from 'firebase/auth'

const initialState = {
  name: '',
  isLoading: false,
  token: localStorage.getItem('token'),
}

export const loginAsync = createAsyncThunk(
  'accout/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        username,
        password,
      )
      const { email, accessToken } = credentials.user
      localStorage.setItem('token', accessToken)
      return email
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  },
)

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.name = action.payload
        state.isLoading = false
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export default accountSlice.reducer
