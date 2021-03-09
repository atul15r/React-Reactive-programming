import { of, concat, from } from 'rxjs';
import { filter, mergeMap, catchError, withLatestFrom, tap, map, ignoreElements } from 'rxjs/operators';
import { spotifyService } from 'services';
import { featuredPlaylistActions, appActions } from 'app/rootActions';
import { toast } from 'react-toastify';
import shortid from 'shortid';

export const getFeaturedPlaylistEpic = action$ =>
	action$.pipe(
		filter(featuredPlaylistActions.getFeaturedPlaylist.match),
		mergeMap(() =>
			from(spotifyService.getFeaturedPlaylist()).pipe(
				mergeMap(data => [featuredPlaylistActions.getFeaturedPlaylistSuccess(data)]),
				catchError(message =>
					concat(
						of(featuredPlaylistActions.getFeaturedPlaylistFailure()),
						of(appActions.setAsyncError(message))
					)
				)
			)
		)
	);

const toastId = shortid.generate();
const getFeaturedPlaylistFailureEpic = (action$, state$) =>
	action$.pipe(
		filter(featuredPlaylistActions.getFeaturedPlaylistFailure.match),
		withLatestFrom(state$),
		tap(([, state]) => {
			toast(state?.app?.error, {
				toastId
			});
		}),
		map(() => appActions.resetAsyncError()),
		ignoreElements()
	);

export const featuredPlaylistEpics = [getFeaturedPlaylistEpic, getFeaturedPlaylistFailureEpic];
