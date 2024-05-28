import express from 'express';
import { MoodControler } from './mood.controller';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post('/', auth('user'), MoodControler.createMood);
router.get('/:id', auth('user'), MoodControler.getAllMoodByUser);
router.get('/get-last/:id', auth('user'), MoodControler.getLastOne);

// write mood routes
router.post('/write', auth('user'), MoodControler.createWriteMood);
router.get('/write/user/:id', auth('user'), MoodControler.getWriteMoodByUser);
router.get('/write/:id', auth('user'), MoodControler.getSingleWriteMood);
router.delete('/write/:id', auth('user'), MoodControler.deleteSingleWriteMood);
export const MoodRoutes = router;
