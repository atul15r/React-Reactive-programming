import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

const rootPersistConfig = {
	key: 'root',
	storage: storage,
	blacklist: ['app', 'newReleases', 'featuredPlaylist', 'categories']
};

const pReducer = persistReducer(rootPersistConfig, rootReducer);
const epicMiddleware = createEpicMiddleware();
const middleware = [
	// ...getDefaultMiddleware({serializableCheck: false}),
	epicMiddleware,
	logger
];

const store = configureStore({
	reducer: pReducer,
	middleware: middleware
});

epicMiddleware.run(rootEpic);

const persistor = persistStore(store);
export { persistor, store };
