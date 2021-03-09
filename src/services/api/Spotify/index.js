import { unwrapAPIError } from 'utils';
import SpotifyWebApi from 'spotify-web-api-js';

var spotifyApi = new SpotifyWebApi();

const getNewReleases = async () => {
	try {
		const res = await spotifyApi.getNewReleases({ country: 'IN' });
		return res?.albums?.items;
	} catch (error) {
		const errorValue = unwrapAPIError(error);
		return Promise.reject(errorValue);
	}
};

const getFeaturedPlaylist = async () => {
	try {
		const res = await spotifyApi.getFeaturedPlaylists();
		return res?.playlists?.items;
	} catch (error) {
		const errorValue = unwrapAPIError(error);
		return Promise.reject(errorValue);
	}
};

const getCategories = async () => {
	try {
		const res = await spotifyApi.getCategories();
		return res?.categories?.items;
	} catch (error) {
		const errorValue = unwrapAPIError(error);
		return Promise.reject(errorValue);
	}
};

export const spotifyService = {
	getNewReleases,
	getFeaturedPlaylist,
	getCategories
};
