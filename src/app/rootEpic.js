import { combineEpics } from 'redux-observable';

import { newReleasesEpics } from 'features/NewReleases/newReleasesEpic';
import { featuredPlaylistEpics } from 'features/FeaturedPlaylist/featuredPlaylistEpic';
import { categoriesEpics } from 'features/Categories/categoriesEpic';

export default combineEpics(...newReleasesEpics, ...featuredPlaylistEpics, ...categoriesEpics);
