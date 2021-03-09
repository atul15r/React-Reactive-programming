import { createAction } from '@reduxjs/toolkit';

export const getCategories = createAction('getCategories');
export const getCategoriesFailure = createAction('getCategoriesFailure');
export const getCategoriesSuccess = createAction('getCategoriesSuccess');
