import express from 'express';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { UserControler } from './user.controler';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
   '/create',
   validateRequest(UserValidation.createUserZodSchema),
   UserControler.createUser
);
router.post('/chat-with-ai/:id', auth('user'), UserControler.createChatMsg);
router.delete('/chat-with-ai/:id', auth('user'), UserControler.clearChatMsg);
router.get('/:id', auth('user'), UserControler.getSingleUser);
router.get('/', UserControler.getAllUsers);

export const UserRoutes = router;
