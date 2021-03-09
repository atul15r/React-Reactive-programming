import { createSlice } from '@reduxjs/toolkit';
import { Status } from 'services';
import { getFeaturedPlaylist, getFeaturedPlaylistFailure, getFeaturedPlaylistSuccess } from './featuredPlaylistActions';

const featuredPlaylistSlice = createSlice({
	name: 'featuredPlaylist',
	initialState: {
		data: [],
		status: Status.idle
	},
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(getFeaturedPlaylist, state => ({
				...state,
				status: Status.pending
			}))
			.addCase(getFeaturedPlaylistFailure, state => ({
				...state,
				status: Status.rejected
			}))

			.addCase(getFeaturedPlaylistSuccess, (state, action) => ({
				...state,
				status: Status.resolved,
				data: action.payload
			}))

			.addDefaultCase(state => state)
});

export const { reducer: featuredPlaylistReducer, name: featuredPlaylistReducerName } = featuredPlaylistSlice;
export const featuredPlaylistActions = {
	getFeaturedPlaylist,
	getFeaturedPlaylistFailure,
	getFeaturedPlaylistSuccess
};
