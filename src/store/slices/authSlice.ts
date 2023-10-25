import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { getFromCookie, removeFromCookie, setToken } from '../../utils/cookies';
import { AuthState } from '../../@types/auth.types';

const initialState: AuthState = {
	token: getFromCookie('token'),
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		accessToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
			setToken(action.payload);
		},
		deleteToken: state => {
			state.token = undefined;
			
			removeFromCookie('token');
		},
	},
});

export const { accessToken, deleteToken } = authSlice.actions;

export const token = (state: RootState) => state.auth.token;

export const getToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
