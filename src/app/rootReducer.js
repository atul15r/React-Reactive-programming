import { combineReducers } from '@reduxjs/toolkit';
import { newReleasesReducer } from 'features/NewReleases/newReleasesSlice';
import { featuredPlaylistReducer } from 'features/FeaturedPlaylist/featuredPlaylistSlice';
import { categoriesReducer } from 'features/Categories/categoriesSlice';
import { appReducer } from './appSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const appPersistConfig = {
	key: 'app',
	storage: storage,
	blacklist: ['error']
};

const newReleasesPersistConfig = {
	key: 'newReleases',
	storage: storage,
	blacklist: ['status']
};

const featuredPlaylistPersistConfig = {
	key: 'featuredPlaylist',
	storage: storage,
	blacklist: ['status']
};

const categoriesPersistConfig = {
	key: 'categories',
	storage: storage,
	blacklist: ['status']
};

const rootReducer = combineReducers({
	newReleases: persistReducer(newReleasesPersistConfig, newReleasesReducer),
	featuredPlaylist: persistReducer(featuredPlaylistPersistConfig, featuredPlaylistReducer),
	categories: persistReducer(categoriesPersistConfig, categoriesReducer),
	app: persistReducer(appPersistConfig, appReducer)
});

export default rootReducer;
