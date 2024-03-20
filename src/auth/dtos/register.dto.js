import Joi from "joi";

export default Joi.object().keys({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
//   profile: Joi.object({
//     // Assuming you're using something like 'hapi/boom' for file uploads
//     // Adjust the schema based on the structure of the file upload object
//     // For example, if using 'multer' in Express, it might be req.file
//     file: Joi.required(),
//   }).required(),
  images: Joi.optional(),
});
