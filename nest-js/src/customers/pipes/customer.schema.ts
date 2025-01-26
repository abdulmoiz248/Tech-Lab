import * as Joi from "joi";

export const CustomerSchma = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    id: Joi.number().required()
});
