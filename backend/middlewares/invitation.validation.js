import { query, validationResult } from 'express-validator'

export const validateInvitations = [
    query('history')
        .optional()
        .isBoolean()
        .withMessage('history params must be a boolean')
        .toBoolean(),
        
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next();
    }
];