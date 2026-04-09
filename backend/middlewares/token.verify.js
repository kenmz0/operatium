import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            status: 'Fail',
            error: 'No token provided'
        });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({
            status: 'Fail',
            error: 'Token not valid'
        });
    }
}