import React from 'react';
import { Night, Day } from 'components';
import Music from 'assets/images/music.jpg';

export function Header() {
	return (
		<section className="w-full h-32 flex shadow-xs" style={{ background: '#FFB5A7' }}>
			<div className="hidden md:block w-1/2 h-full">
				<img src={Music} className="h-full" alt="music" />
			</div>
			<div className="w-full md:w-1/2 h-full flex items-center justify-start md:justify-end">
				<div className="ml-4 md:mr-10">
					<p className="text-white text-2xl md:text-3xl font-medium">Your favourite tunes</p>
					<section className="flex items-center justify-start md:justify-end pr-3">
						<p className="text-white text-base font-medium">All</p>&nbsp;
						<Day fill="#ff9800" />
						&nbsp;
						<p className="text-white text-base font-medium">and all</p>&nbsp;
						<Night fill="#333" />
					</section>
				</div>
			</div>
		</section>
	);
}
