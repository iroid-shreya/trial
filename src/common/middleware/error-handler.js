export default async (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    return res.status(422).send({ message: err.error.details[0].message });
  }
};
