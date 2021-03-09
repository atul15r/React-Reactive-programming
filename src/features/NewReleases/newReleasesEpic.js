import { of, concat, from } from 'rxjs';
import { filter, mergeMap, catchError, withLatestFrom, tap, map, ignoreElements } from 'rxjs/operators';
import { spotifyService } from 'services';
import { newReleasesActions, appActions } from 'app/rootActions';
import { toast } from 'react-toastify';
import shortid from 'shortid';

export const getNewReleasesEpic = action$ =>
	action$.pipe(
		filter(newReleasesActions.getNewReleases.match),
		mergeMap(() =>
			from(spotifyService.getNewReleases()).pipe(
				mergeMap(data => [newReleasesActions.getNewReleasesSuccess(data)]),
				catchError(message =>
					concat(of(newReleasesActions.getNewReleasesFailure()), of(appActions.setAsyncError(message)))
				)
			)
		)
	);

const toastId = shortid.generate();
const getNewReleasesFailureEpic = (action$, state$) =>
	action$.pipe(
		filter(newReleasesActions.getNewReleasesFailure.match),
		withLatestFrom(state$),
		tap(([, state]) => {
			toast(state?.app?.error, {
				toastId
			});
		}),
		map(() => appActions.resetAsyncError()),
		ignoreElements()
	);

export const newReleasesEpics = [getNewReleasesEpic, getNewReleasesFailureEpic];
