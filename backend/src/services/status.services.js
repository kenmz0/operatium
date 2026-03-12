import { StatusRepository } from "../repositories/status.repository.js";

let STATUS_CACHE = null;

export class StatusServices {
    static async loadAll() {
        const status = await StatusRepository.getAllStatus()

        STATUS_CACHE = status.reduce((acc, s) => {
            if (!acc[s.type.toUpperCase()]) acc[s.type.toUpperCase()] = {};
            acc[s.type.toUpperCase()][s.nombre.toUpperCase()] = { 'id': s.id_status, 'color_label': s.color_label };
            return acc;
        }, {});

        return STATUS_CACHE;
    }

    static get({type, name}){
        return STATUS_CACHE[type.toUpperCase()][name.toUpperCase()]
    }

    static getByType({type}){
        return STATUS_CACHE[type.toUpperCase()]
    }


}