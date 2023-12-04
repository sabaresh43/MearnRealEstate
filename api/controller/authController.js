import User from '../models/userModel.js';
import bcryptjs from "bcryptjs";
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';



export const signup = async (req, res, next) => {

    const { username, email, password } = req.body
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword })

    try {
        await newUser.save()
        res.status(201).send(newUser)
    } catch (err) {
        next(err);
        // next(errorHandler(550, ' Error saving user'))
    }

}

export const signin = async (req, res, next) => {

    const { email, password } = req.body
    try {

        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User Not Found"))
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong Credentials. Please check your Email id and password"))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
       
       const {password:pass,...data} = validUser._doc;

        res.cookie('access_token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        }).status(200).json({
            data
        })
    } catch (err) {
        next(err)
    }

}

