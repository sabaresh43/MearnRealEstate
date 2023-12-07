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

        const { password: pass, ...data } = validUser._doc;

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


export const gSignIn = async (req, res, next) => {

    try {

        const user = await User.findOne({ email: req.body.email })
        if (user) {

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, {
                httpOnly: true,
            }).status(200).json(rest)

        } else {

            const generatePassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword,10);
            const newUser = new User({ username: req.body.name, email: req.body.email,password:hashedPassword, avatar:req.body.avatar})

            try{
                await newUser.save()
                const token =jwt.sign({id:newUser._id},process.env.JWT_SECRET)
                const {password:pass, ...rest} = newUser._doc
                res.cookie('access_token',token,{
                    httpOnly:true
                }).status(201).json(rest)

            }catch(err){
                next(err)
            }

        }


    }
    catch (err) {
        next(err)
    }

}

