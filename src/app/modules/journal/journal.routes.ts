import express from 'express';
import { JournalControler } from './journal.controler';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post('/', auth('user'), JournalControler.createJournal);
router.get('/user/:id', auth('user'), JournalControler.getJournalByUser);
router.get('/', auth('user'), JournalControler.gelAllJournal);
router.get('/:id', auth('user'), JournalControler.getSingleJournal);
router.delete('/:id', auth('user'), JournalControler.deleteJournal);

export const JournalRoutes = router;
