import { useDispatch, useSelector } from 'react-redux';
import { appActions } from 'app/rootActions';
import SpotifyWebApi from 'spotify-web-api-js';
import { toast } from 'react-toastify';
import shortid from 'shortid';

export const useControl = () => {
	var spotifyApi = new SpotifyWebApi();
	const dispatch = useDispatch();

	const { shuffle, repeat, track } = useSelector(state => state.app);

	const toastId = shortid.generate();
	const playSong = ({ track }) => {
		spotifyApi
			.play({
				context_uri: track?.uri
			})
			.then(res => {
				spotifyApi.getMyCurrentPlayingTrack().then(r => {
					dispatch(appActions.setCurrentTrack(r?.item));
					dispatch(appActions.setIsPlaying(true));
				});
				console.log(res);
			})
			.catch(err => {
				console.log('errr', JSON.parse(err?.response)?.error?.message);
				toast(JSON.parse(err?.response)?.error?.message, {
					toastId
				});
			});
	};

	const onToggleState = () => {
		spotifyApi.getMyCurrentPlaybackState().then(r => {
			if (r.is_playing) {
				spotifyApi.pause();
				dispatch(appActions.setIsPlaying(false));
			} else {
				spotifyApi.play();
				dispatch(appActions.setIsPlaying(true));
			}
		});
	};

	const getCurrentTrack = () => {
		spotifyApi.getMyCurrentPlayingTrack().then(r => {
			dispatch(appActions.setCurrentTrack(r?.item));
		});
	};

	const skipToNext = () => {
		spotifyApi.skipToNext();
		getCurrentTrack();
	};

	const skipToPrevious = () => {
		spotifyApi.skipToPrevious();
		getCurrentTrack();
	};

	const onLoop = () => {
		spotifyApi.setRepeat();
		dispatch(appActions.setRepeat(!repeat));
	};

	const onShuffle = () => {
		spotifyApi.setShuffle();
		getCurrentTrack();
		dispatch(appActions.setShuffle(!shuffle));
	};

	const setFavourites = () => {
		if (track) dispatch(appActions.setFavourites(track));
	};

	return {
		playSong,
		onToggleState,
		skipToNext,
		skipToPrevious,
		onLoop,
		onShuffle,
		setFavourites
	};
};
