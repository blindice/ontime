import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from '../../app/db'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { translationFirebaseErrorsEN } from 'react-translation-firebase-errors'
import jwt from 'jwt-decode'

const initialState = {
  isAdmin: false,
  isLoggedIn: false,
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
      const { accessToken } = credentials.user
      localStorage.setItem('token', accessToken)
      const { email } = jwt(accessToken)
      const isAdmin = String(email).includes('@admin')
      console.log(email)
      return { email, accessToken, isAdmin }
    } catch (err) {
      if (err.code) {
        const error = translationFirebaseErrorsEN(err.code)
        return rejectWithValue(error)
      }
      return rejectWithValue(err.response.data)
    }
  },
)

export const logoutAsync = createAsyncThunk('account/logout', async () => {
  localStorage.removeItem('token')
  await signOut(auth)
})

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoggedIn = false
        state.isLoading = true
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAdmin = action.payload.isAdmin
        state.token = action.payload.accessToken
        state.isLoggedIn = true
        state.isLoading = false
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoggedIn = false
        state.isLoading = false
      })

      .addCase(logoutAsync.pending, (state) => {
        state.isLoggedIn = true
        state.isLoading = true
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.isAdmin = false
        state.token = ''
        state.isLoggedIn = false
        state.isLoading = false
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.isLoggedIn = true
        state.isLoading = false
      })
  },
})

export default accountSlice.reducer
