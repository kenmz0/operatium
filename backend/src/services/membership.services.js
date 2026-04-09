import { StatusRepository } from "../repositories/status.repository.js";

export const MembershipService = {
    getStatus: async () => {
        const status = await StatusRepository.getAllStatus();

        const result = status.reduce((acc, s) => {
            if (!acc[s.type.toUpperCase()]) acc[s.type.toUpperCase()] = {};
            acc[s.type.toUpperCase()][s.nombre.toUpperCase()] = { 'id': s.id_status, 'color_label': s.color_label };
            return acc;
        }, {});
        if (!status) throw new Error('Data not found')

        return result
    }
}