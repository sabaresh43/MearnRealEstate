import express from "express";
import { test } from "../controller/userController.js";
import { updateUserDetails } from "../controller/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/test', test)
router.post('/updateUserDetails/:id',verifyUser, updateUserDetails)

export default router;