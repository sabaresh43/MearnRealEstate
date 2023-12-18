import express from "express";
import { createListing } from "../controller/listingController.js";
import { verifyUser } from "../utils/verifyUser.js";


const router = express.Router()


router.get('/')
router.post('/createListing',verifyUser, createListing)

export default router;