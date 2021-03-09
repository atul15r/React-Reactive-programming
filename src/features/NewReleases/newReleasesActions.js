import { createAction } from '@reduxjs/toolkit';

export const getNewReleases = createAction('getNewReleases');
export const getNewReleasesFailure = createAction('getNewReleasesFailure');
export const getNewReleasesSuccess = createAction('getNewReleasesSuccess');
