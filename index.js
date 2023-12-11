import { Router } from 'itty-router'
import parseKml from './parse-kml'
import saveActivity from './api/save-activity'
import getActivities from './api/get-activities'

const router = Router()

router.get('/parse', parseKml)
router.post('/api/save_activity', saveActivity)
router.get('/api/get_activities', getActivities)
router.all('*', () => new Response('404', { status: 404 }));

export default {
	fetch: router.handle,
};
