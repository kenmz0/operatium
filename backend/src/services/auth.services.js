import 'dotenv/config'
import { AuthRepository } from "../repositories/auth.repository.js";
import bcrypt from 'bcrypt'
import { generateLoginToken } from '../../utils/jwt.js';

export const AuthService = {
    login: async ({ email, password }) => {
        const userCredentials = await AuthRepository.findUserCredetentialByEmail({ email })
        if (!userCredentials) throw new Error('Credentials not valid')
        const passwordValid = await bcrypt.compare(password, userCredentials.password_hash)
        if (passwordValid) {
            const token = await generateLoginToken({ email: userCredentials.email, id: userCredentials.id_user }) 
            return {
                token,
                user: { email: userCredentials.email, id: userCredentials.id_user }
            }
        } else {
            throw new Error('Credentials not valid')
        }
    },
}