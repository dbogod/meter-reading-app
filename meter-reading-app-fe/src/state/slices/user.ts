import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

import { STORE_KEYS } from '@State/storeKeys'

import { TUser } from '@Types/user'

interface UserState {
  user: TUser | null
}

const initialState: UserState = {
  user: null
}

export const userSlice = createSlice({
  name: STORE_KEYS.USER,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user

export const isUserAuthenticated = (state: RootState) => !!state.user.user
