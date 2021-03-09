import React from 'react';
import { Play, Pause, Previous, Next, Heart, Loop, Shuffle, Volume } from 'components';
import { Dots } from 'components/Basic/svg/Icons';
import { useSelector } from 'react-redux';
import { default_img } from 'utils';
import { useControl } from 'hooks';

export function Footer() {
	const [progressPercentage, setProgressPercentage] = React.useState(0);
	const { track, isPlaying, repeat, shuffle, favourites } = useSelector(state => state.app);
	const { onLoop, onShuffle, onToggleState, skipToNext, skipToPrevious, setFavourites } = useControl();

	const isFavourite = favourites.filter(data => data?.uri === track?.uri);

	React.useEffect(() => {
		if (isPlaying) {
			var pro = 0;
			setInterval(() => {
				++pro;
				var target = track?.duration_ms;
				var progress = Math.ceil((pro / (target / 1000)) * 100);
				console.log(progress);
				setProgressPercentage(progress);
				if (pro === track?.duration_ms / 1000) clearInterval();
			}, 5000);
		}
	}, [isPlaying]);

	return (
		<div className="w-full h-16 flex justify-center fixed bottom-0 bg-white border border-gray-200 shadow-md">
			<section className="grid grid-cols-16 gap-4 w-full h-full items-center">
				<section className="hidden md:flex col-span-1 md:col-span-2 lg:col-span-1 items-center justify-center">
					<img
						src={track?.album?.images[0]?.url || default_img}
						className="w-12 h-12 rounded-md shadow-2xl"
					/>
				</section>

				<section className="hidden md:block relative overflow-hidden col-span-2  items-center">
					<p className="text-xs truncate font-medium">{track?.album?.name || `Nothing's Playing`}</p>
					<p className="text-xs truncate">{track?.artists?.map(artist => artist.name).join(', ')}</p>
				</section>

				<section className="px-2 md:px-0 col-span-5 sm:col-span-3 md:col-span-2 lg:col-span-1 flex items-center justify-between">
					<button onClick={skipToPrevious}>
						<Previous size={17} fill="#ccc" />
					</button>
					{isPlaying ? (
						<button
							onClick={() => {
								onToggleState();
								clearInterval();
							}}
						>
							<Pause size={40} fill="#6b46c1" />
						</button>
					) : (
						<button
							onClick={() => {
								onToggleState();
								clearInterval();
							}}
						>
							<Play size={40} fill="#6b46c1" />
						</button>
					)}
					<button onClick={skipToNext}>
						<Next size={17} fill="#ccc" />
					</button>
				</section>
				<section className="bg-gray-300 col-span-5 sm:col-span-8 md:col-span-7 lg:col-span-8 flex items-center">
					<section className="w-full h-1 bg-gray-300">
						<section className=" h-1 bg-purple-400" style={{ width: `${progressPercentage}%` }} />
					</section>
				</section>
				<section className="hidden lg:flex col-span-2  items-center justify-between">
					<button onClick={() => setFavourites(track)}>
						<Heart size={13} fill={isFavourite.length ? '#d7396d' : '#ccc'} />
					</button>
					<button onClick={onLoop}>
						<Loop size={15} fill={repeat ? 'purple' : '#ccc'} />
					</button>
					<button onClick={onShuffle}>
						<Shuffle size={15} fill={shuffle ? 'purple' : '#ccc'} />
					</button>
					<Volume size={20} fill="#ccc" />
				</section>
				<button className="block lg:hidden">
					<Dots fill="#ccc" size={25} />
				</button>
			</section>
		</div>
	);
}
