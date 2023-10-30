import jwt, { decode } from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {

    const { _token } = req.cookies;

    if (!_token) {
        return res.redirect('/auth/login');
    }

    try {
        const decoded = jwt.verify(_token, process.env.JWT_SECRET);

        const user = await User.scope('removePassword').findByPk(decoded.id);

        if (!user) {
            return res.redirect('/auth/login');
        }

        req.user = user;

        return next();
    } catch (error) {
        res.clearCookie('_token').redirect('/auth/login');
    }
}

export default authMiddleware;