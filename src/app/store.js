import { configureStore } from '@reduxjs/toolkit'
import { reducer as accountReducer } from '@features/account'

export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
})
