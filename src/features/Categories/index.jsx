import React from 'react';
import { useSelector } from 'react-redux';
import { CarouselCard } from 'components';

export function Categories() {
	const { data } = useSelector(state => state.categories);

	return (
		<section className="w-full p-4">
			<CarouselCard title="Browse">
				{data?.map((item, i) => (
					<div key={i} className="mx-3 mt-4">
						<img src={item?.icons[0]?.url} className="w-24 h-24 rounded-md" alt="album" />
						<p className="text-xs text-left lg:text-center text-gray-700 py-2">{item?.name}</p>
					</div>
				))}
			</CarouselCard>
		</section>
	);
}
