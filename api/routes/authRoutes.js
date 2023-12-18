import express from 'express';
import { signin, signup ,gSignIn,signOut} from '../controller/authController.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/gSignIn',gSignIn);
router.get('/signOut',signOut);

export default router;