import { celebrate, Segments, Joi } from 'celebrate';

export const authValidator = celebrate({
  [Segments.HEADERS]: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .unknown(),
});

export const newSessionValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const recipientStoreValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    street: Joi.string().required(),
    number: Joi.string().required().alphanum(),
    complement: Joi.string(),
    neighborhood: Joi.string().required(),
    state: Joi.string().required().min(2).max(20),
    city: Joi.string().required(),
    zip_code: Joi.string().required(),
  }),
});

export const recipientUpdateValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    street: Joi.string(),
    number: Joi.string().alphanum(),
    complement: Joi.string(),
    neighborhood: Joi.string(),
    state: Joi.string().min(2).max(20),
    city: Joi.string(),
    zip_code: Joi.string(),
  }),
});
