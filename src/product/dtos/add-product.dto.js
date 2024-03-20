import Joi from "joi";

export default Joi.object().keys({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
});
