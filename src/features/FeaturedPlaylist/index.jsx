import React from 'react';
import { useSelector } from 'react-redux';
import { CarouselCard } from 'components';
import { useControl } from 'hooks';

export function FeaturedPlaylist() {
	const { data } = useSelector(state => state.featuredPlaylist);
	const { playSong } = useControl();

	return (
		<section className="w-full p-4">
			<CarouselCard title="featured playlist">
				{data?.map((item, i) => (
					<div key={i} className="mx-3 mt-4" onClick={() => playSong({ track: item })}>
						<img src={item?.images[0]?.url} className="w-24 h-24 rounded-md" alt="album" />
						<p className="text-xs text-left lg:text-center text-gray-700 py-2">{item?.name}</p>
					</div>
				))}
			</CarouselCard>
		</section>
	);
}
