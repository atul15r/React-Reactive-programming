import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 3000, min: 1500 },
		items: 11
	},
	desktop: {
		breakpoint: { max: 1500, min: 1024 },
		items: 8
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 3
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1
	}
};
export function CarouselCard({ children, title }) {
	return (
		<section className="w-full p-4">
			<p className="uppercase text-gray-600 font-bold md:font-normal text-base">{title}</p>
			<Carousel responsive={responsive}>{children}</Carousel>
		</section>
	);
}
