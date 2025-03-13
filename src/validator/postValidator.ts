import {body} from "express-validator";

export const titleValidator = body('title')
    .trim().isLength({min: 1, max: 30}).withMessage('Max length 30 symbols')
    .isString().withMessage('Title is not string')
export const shortDescriptionValidator = body('shortDescription')
    .trim().isLength({min: 1, max: 100}).withMessage('Max length 100 symbols')
    .isString().withMessage('shortDescription is not string')
export const contentValidator = body('content')
    .trim().isLength({min: 1, max: 1000}).withMessage('Max length 1000 symbols')
