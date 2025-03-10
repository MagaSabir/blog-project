import {body, validationResult} from "express-validator";

export const nameValidator = body('name')
    .isString().withMessage('field: (name) is not string')
    .trim().isLength({min: 1, max: 15})
    .withMessage('no more 15 symbol');
export const descriptionValidator = body('description')
    .isString().withMessage('"description" is not string')
    .trim().isLength({min:1, max: 500})
    .withMessage('no more 500 symbol');
export const websiteUrlValidator = body('websiteUrl')
    .isString().withMessage('"website" is not string')
    .trim().isLength({max: 100}).isURL()
    .withMessage('bad URL')
