// import axios from 'axios';
// axios.defaults.baseURL = 'https://api.spotify.com/v1/browse';

// export const token =
// 	'BQAlXjcEOuS2kgLv5NqS7fO4tNK8X4notirqHpGJfJ427G3hte4lAwcQEJChKI9EeC_YroqYnEzZEDy83d3KAf30T80hpLx8fhSxgLzBLuc2oZi9wcq5Qt7EFP4FQwusGysnRA3fzgo0zyC8Xz_0pYK9jpTR82Xjnzv78bkWPk-cM87wOqoy';

// export const requestHandler = async ({ method, url, data }) => {
// 	const httpMethod = method.toLowerCase();
// 	const headers = {
// 		Bearer: token
// 	};

// 	const hasData = ['post', 'put', 'patch'].indexOf(httpMethod) >= 0;
// 	const request = hasData
// 		? await axios[httpMethod](url, data ? data : {}, { headers })
// 		: await axios[httpMethod](url, { headers });
// 	return request;
// };

// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
export const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = '2f6ab33ceb8641bca050527857885d50';
const redirectUri = 'http://localhost:5001/';
const scopes = [
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-read-playback-state',
	'user-top-read',
	'user-modify-playback-state'
];

export const getTokenFromResponse = () => {
	return window.location.hash
		.substring(1)
		.split('&')
		.reduce((initial, item) => {
			var parts = item.split('=');
			initial[parts[0]] = decodeURIComponent(parts[1]);

			return initial;
		}, {});
};

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
	'%20'
)}&response_type=token&show_dialog=true`;
