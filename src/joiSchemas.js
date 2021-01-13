const Joi = require('joi');

const valUser = Joi.object().keys({
  firstname: Joi.string()
    .regex(/^[A-zÀ-ÿ]+((\s)?(('|-|)?([A-zÀ-ÿ])+))*$/)
    .min(3)
    .max(30)
    .required(),
  lastname: Joi.string()
    .regex(/^[A-zÀ-ÿ]+((\s)?(('|-|)?([A-zÀ-ÿ])+))*$/)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-zÀ-ÿ\d@$!%*?&]{8,}$/
    )
    .required(),
  ride: Joi.object(),
});

const valRide = Joi.object().keys({
  label: Joi.string().min(3).max(100).required(),
  summary: Joi.string().min(3).max(255).required(),
  start_date: Joi.string().isoDate().required(),
  end_date: Joi.string().isoDate().required(),
  start_coord: Joi.object({
    lat: Joi.string().min(6).max(8),
    long: Joi.string().min(6).max(9),
  }),
  id_user: Joi.number().required(),
});

module.exports = { valUser, valRide };
