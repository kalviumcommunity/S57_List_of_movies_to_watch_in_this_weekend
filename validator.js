const Joi = require("joi");

const movieJoiSchema = Joi.object({
  Director: Joi.string().required(),
  Release_Year: Joi.number().required(),
  Genre: Joi.string().required(),
  Rating: Joi.string().required(),
  Image_url: Joi.string().optional(),
  Movie_Title: Joi.string().required(),
  userName: Joi.string().required(),
});

const validateMovie = (payload) => {
  const { error, value } = movieJoiSchema.validate(payload, {
    abortEarly: false,
  });
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join("; ");
    return { error: errorMessage };
  }
  return { value };
};

module.exports.validateMovie = validateMovie;
