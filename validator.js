const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const movieSchema = Joi.object({
  Director: Joi.string().required(),
  Release_Year: Joi.number().required(),
  Genre: Joi.string().required(),
  Rating: Joi.string().required(),
  Image_url: Joi.string(),
  Movie_Title: Joi.string().required(),
});
exports.validateMovie = validator(movieSchema);
