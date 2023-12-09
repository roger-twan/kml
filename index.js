import { Router } from 'itty-router'
import parseKml from './parse-kml'


const router = Router()

router.get('/parse', parseKml);
router.post('/post', async request => {
	// Create a base object with some fields.
	let fields = {
		asn: request.cf.asn,
		colo: request.cf.colo,
	};

	// If the POST data is JSON then attach it to our response.
	if (request.headers.get('Content-Type') === 'application/json') {
		let json = await request.json();
		Object.assign(fields, { json });
	}

	// Serialise the JSON to a string.
	const returnData = JSON.stringify(fields, null, 2);

	return new Response(returnData, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
});

router.all('*', () => new Response('404', { status: 404 }));

export default {
	fetch: router.handle,
};
