import { body, validationResult } from 'express-validator'

export const validateUserRegistration = [
    body('first_name').notEmpty().withMessage("first_name can't be empty"),
    body('last_name').notEmpty().withMessage("last_name can't be empty"),
    body('email').isEmail().withMessage('a valid email is required').normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('the password must be longer than 7'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next();
    }
];