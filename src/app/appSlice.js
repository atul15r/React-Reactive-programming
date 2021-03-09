import { createSlice } from '@reduxjs/toolkit';
import {
	setAsyncError,
	resetAsyncError,
	setToken,
	setCurrentTrack,
	setIsPlaying,
	setFavourites,
	setRepeat,
	setShuffle
} from './appActions';

const appSlice = createSlice({
	name: 'app',
	initialState: {
		error: '',
		token: '',
		track: {},
		isPlaying: false,
		favourites: [],
		repeat: false,
		shuffle: false
	},
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(setAsyncError, (state, action) => ({
				...state,
				error: action.payload
			}))
			.addCase(setToken, (state, action) => ({
				...state,
				token: action.payload
			}))
			.addCase(setCurrentTrack, (state, action) => ({
				...state,
				track: action.payload
			}))
			.addCase(setIsPlaying, (state, action) => ({
				...state,
				isPlaying: action.payload
			}))
			.addCase(setFavourites, (state, action) => ({
				...state,
				favourites: [...state.favourites, action.payload]
			}))
			.addCase(setRepeat, (state, action) => ({
				...state,
				repeat: action.payload
			}))
			.addCase(setShuffle, (state, action) => ({
				...state,
				shuffle: action.payload
			}))
			.addCase(resetAsyncError, state => ({
				...state,
				error: ''
			}))
			.addDefaultCase(state => state)
});

export const { reducer: appReducer, name: appReducerName } = appSlice;
export const appActions = {
	setAsyncError,
	setToken,
	setCurrentTrack,
	setIsPlaying,
	setFavourites,
	setRepeat,
	setShuffle,
	resetAsyncError
};
