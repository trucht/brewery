const {body, validationResult} = require('express-validator');
const userValidationRules = () => {
  return [
    body('name', 'Name is required').notEmpty(),
    body('phone', 'Phone number is required').notEmpty(),
    body('email', 'Email is required').notEmpty()
      .isEmail().withMessage('Your email is not valid'),
    body('password', 'Password must contain at least 6 characters').isLength({ min: 6 }),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push(err.msg))

  return res.status(422).json({
    error: extractedErrors[0]
  })
}

module.exports = {
  userValidationRules,
  validate,
}
