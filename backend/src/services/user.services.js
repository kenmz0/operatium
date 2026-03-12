import { UserRepository } from '../repositories/user.repository.js';
import bcrypt from 'bcrypt'

export const UserService = {
    getOwnProfile: async ({ idUser }) => {
        const user = await UserRepository.findFullProfileById({ idUser });
        if (!user) throw new Error('User not found');

        return user;
    },
    getPublicProfile: async ({ idUser }) => {
        const user = await UserRepository.findPublicProfileById({ idUser });
        if (!user) throw new Error('User not found');

        return user;
    },
    getInvitations: async ({ idUser, history }) => {
        if (history=="true") {
            const invitationsHistory = await UserRepository.findAllInvitations({ idUser });
            if (!invitationsHistory) throw new Error('Inivitations not found')
            return invitationsHistory;
        }

        const invitationsPending = await UserRepository.findInvitationsPending({ idUser });
        if (!invitationsPending) throw new Error('Inivitations not found')
        return invitationsPending;
    },
    respondInvitation: async ({ idUser, idInvitation, status }) => {
        const updateInvitation = await UserRepository.updateInvitation({ idUser, idInvitation, status })
        if (!updateInvitation) throw new Error('Inivitation not found')
        return updateInvitation
    },
    registerUser: async ({ first_name, last_name, email, password, phone_number }) => {
        const existingUser= await UserRepository.findExistingEmail({email});
        if( existingUser){
            throw new Error("Email already exists")
        }
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        const userId = await UserRepository.create({first_name, last_name, email,password_hash, phone_number})
        if(!userId) throw new Error('User not created');

        return {userId}
    }

};


