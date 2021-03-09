import { createSlice } from '@reduxjs/toolkit';
import { Status } from 'services';
import { getNewReleases, getNewReleasesFailure, getNewReleasesSuccess } from './newReleasesActions';

const newReleasesSlice = createSlice({
	name: 'newReleases',
	initialState: {
		data: [],
		status: Status.idle
	},
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(getNewReleases, state => ({
				...state,
				status: Status.pending
			}))
			.addCase(getNewReleasesFailure, state => ({
				...state,
				status: Status.rejected
			}))

			.addCase(getNewReleasesSuccess, (state, action) => ({
				...state,
				status: Status.resolved,
				data: action.payload
			}))

			.addDefaultCase(state => state)
});

export const { reducer: newReleasesReducer, name: newReleasesReducerName } = newReleasesSlice;
export const newReleasesActions = {
	getNewReleases,
	getNewReleasesFailure,
	getNewReleasesSuccess
};
