import { createSlice } from '@reduxjs/toolkit';
import { Status } from 'services';
import { getCategories, getCategoriesFailure, getCategoriesSuccess } from './categoriesActions';

const categoriesSlice = createSlice({
	name: 'categories',
	initialState: {
		data: [],
		status: Status.idle
	},
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(getCategories, state => ({
				...state,
				status: Status.pending
			}))
			.addCase(getCategoriesFailure, state => ({
				...state,
				status: Status.rejected
			}))

			.addCase(getCategoriesSuccess, (state, action) => ({
				...state,
				status: Status.resolved,
				data: action.payload
			}))

			.addDefaultCase(state => state)
});

export const { reducer: categoriesReducer, name: categoriesReducerName } = categoriesSlice;
export const categoriesActions = {
	getCategories,
	getCategoriesFailure,
	getCategoriesSuccess
};
