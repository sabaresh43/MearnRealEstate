import express from 'express';
import { signin, signup ,gSignIn} from '../controller/authController.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/gSignIn',gSignIn)


export default router;