import { createAction } from '@reduxjs/toolkit';

export const getFeaturedPlaylist = createAction('getFeaturedPlaylist');
export const getFeaturedPlaylistFailure = createAction('getFeaturedPlaylistFailure');
export const getFeaturedPlaylistSuccess = createAction('getFeaturedPlaylistSuccess');
