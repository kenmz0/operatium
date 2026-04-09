import 'dotenv/config'
import jwt from 'jsonwebtoken'

export async function generateLoginToken({ id, email }) {
        
    const payload = { id, email }

    const token =  jwt.sign(payload, process.env.JWT_KEY,{
        expiresIn: '8h'
    })

    console.log(token);
    
    return token
}
