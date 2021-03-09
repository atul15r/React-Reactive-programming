import { createAction } from '@reduxjs/toolkit';

export const setAsyncError = createAction('setAsyncError');
export const setToken = createAction('setToken');
export const setCurrentTrack = createAction('setCurrentTrack');
export const setIsPlaying = createAction('setIsPlaying');
export const setFavourites = createAction('setFavourites');
export const setRepeat = createAction('setRepeat');
export const setShuffle = createAction('setShuffle');
export const resetAsyncError = createAction('resetAsyncError');
