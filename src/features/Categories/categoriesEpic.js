import { of, concat, from } from 'rxjs';
import { filter, mergeMap, catchError, withLatestFrom, tap, map, ignoreElements } from 'rxjs/operators';
import { spotifyService } from 'services';
import { categoriesActions, appActions } from 'app/rootActions';
import { toast } from 'react-toastify';
import shortid from 'shortid';

export const getCategoriesEpic = action$ =>
	action$.pipe(
		filter(categoriesActions.getCategories.match),
		mergeMap(() =>
			from(spotifyService.getCategories()).pipe(
				mergeMap(data => [categoriesActions.getCategoriesSuccess(data)]),
				catchError(message =>
					concat(of(categoriesActions.getCategoriesFailure()), of(appActions.setAsyncError(message)))
				)
			)
		)
	);

const toastId = shortid.generate();
const getCategoriesFailureEpic = (action$, state$) =>
	action$.pipe(
		filter(categoriesActions.getCategoriesFailure.match),
		withLatestFrom(state$),
		tap(([, state]) => {
			toast(state?.app?.error, {
				toastId
			});
		}),
		map(() => appActions.resetAsyncError()),
		ignoreElements()
	);

export const categoriesEpics = [getCategoriesEpic, getCategoriesFailureEpic];
