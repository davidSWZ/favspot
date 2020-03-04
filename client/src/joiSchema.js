import Joi from 'joi';

export const schema = Joi.object({
    nameSpot: Joi.string()
        .min(1)
        .max(100)
        .required(),
    message: Joi.string()
        .min(1)
        .max(500)
        .required(),
})
