import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Heart, Charts, Search, HeadPhone, Play } from 'components';
import { newReleasesActions, featuredPlaylistActions, categoriesActions } from 'app/rootActions';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import shortid from 'shortid';

export const SideNavigation = () => {
	const [user, setUser] = React.useState({});
	const { token } = useSelector(state => state.app);
	const dispatch = useDispatch();
	var spotifyApi = new SpotifyWebApi();

	React.useEffect(() => {
		if (token) {
			spotifyApi.setAccessToken(token);

			spotifyApi.getMe().then(
				function (data) {
					setUser(data);
				},
				function (err) {
					console.log('Something went wrong!', err);
				}
			);
			dispatch(newReleasesActions.getNewReleases());
			dispatch(featuredPlaylistActions.getFeaturedPlaylist());
			dispatch(categoriesActions.getCategories());

			const toastId = shortid.generate();
			spotifyApi.getMyDevices().then(res =>
				console.log(
					'devices',
					!res.devices.length
						? toast('No devices found, Please open your spotify from any of devices', {
								toastId
						  })
						: null
				)
			);
		}
	}, [token, dispatch, spotifyApi]);

	return (
		<div className="bg-purple-700 col-span-2 md:col-span-1 h-screen">
			<section className="w-full">
				<img
					src="https://in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/raya-and-the-last-dragon-et00145984-09-12-2020-04-43-42.jpg"
					className="w-12 h-12 rounded-full m-auto block mt-5 shadow-2xl"
					alt="profile"
				/>
				<p className="text-white text-center py-2">{user?.display_name || 'Raya'}</p>

				<section className="mt-8">
					<div className="flex bg-gradient-to-l from-purple-800 justify-center xl:justify-start items-center h-16 w-full xl:pl-8">
						<HeadPhone fill="#fff" />
						<p className="hidden xl:block capitalize ml-2 text-white text-sm">Discover</p>
					</div>
					<div className="flex justify-center xl:justify-start items-center h-16 w-full xl:pl-8">
						<Search classes="text-purple-400" />
						<p className="hidden xl:block capitalize ml-2 text-purple-300 text-sm">search</p>
					</div>
					<div className="flex justify-center xl:justify-start items-center h-16 w-full xl:pl-8">
						<Heart classes="text-purple-400" />
						<p className="hidden xl:block capitalize ml-2 text-purple-300 text-sm">favourites</p>
					</div>
					<div className="flex justify-center xl:justify-start items-center h-16 w-full xl:pl-8">
						<Play classes="text-purple-400" />
						<p className="hidden xl:block capitalize ml-2 text-purple-300 text-sm">playlits</p>
					</div>
					<div className="flex justify-center xl:justify-start items-center h-16 w-full xl:pl-8">
						<Charts classes="text-purple-400" />
						<p className="hidden xl:block capitalize ml-2 text-purple-300 text-sm">charts</p>
					</div>
				</section>
			</section>
		</div>
	);
};
