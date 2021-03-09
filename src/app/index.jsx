import React from 'react';
import { accessUrl, getTokenFromResponse } from 'services';
import { NewReleases, FeaturedPlaylist, Categories } from 'features';
import { SideNavigation, Header, Footer } from 'components';
import { appActions } from './rootActions';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { isMobile } from 'utils';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
	const { token } = useSelector(state => state.app);
	const dispatch = useDispatch();

	React.useEffect(() => {
		const hash = getTokenFromResponse();
		window.location.hash = '';
		let token = hash.access_token;
		if (token) {
			dispatch(appActions.setToken(token));
		}
	}, [dispatch]);

	return (
		<section>
			{token ? (
				<div className="grid grid-cols-9 overflow-hidden">
					<SideNavigation />
					<div className="col-span-7 md:col-span-8 bg-gray-100 h-screen">
						<Header />
						<section
							className="w-full pb-6 overflow-y-scroll relative"
							style={{ height: `calc(100% - ${12}rem)` }}
						>
							<ToastContainer
								position={!isMobile ? toast.POSITION.BOTTOM_RIGHT : toast.POSITION.BOTTOM_CENTER}
								hideProgressBar
								transition={Zoom}
							/>
							<NewReleases />
							<FeaturedPlaylist />
							<Categories />
							<Footer />
						</section>
					</div>
				</div>
			) : (
				<section className="h-screen flex justify-center items-center">
					<a href={accessUrl} className="bg-gradient-to-r from-green-600 to-blue-500 px-6 py-2 text-white">
						LOGIN TO SPOTIFY
					</a>
				</section>
			)}
		</section>
	);
};
