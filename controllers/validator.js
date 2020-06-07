const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    // username must be an email
    body('email', "Invalid email").isEmail(),
    // password must be at least 5 chars long
    body('password', "Invalide Password").isLength({ min: 5 }),
  ]
}

const validate = (req, res, next) => {
    var errors = validationResult(req).array();
    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
        res.redirect('/user/signup');
    } else {
        req.session.success = true;
        res.redirect('/');
    }
}

module.exports = {
  userValidationRules,
  validate,
}

// [
//     check('firstname')
//         .not()
//         .isEmpty()
//         .withMessage('Firstname is required'),
//     check('lastname')
//         .not()
//         .isEmpty()
//         .withMessage('Lastname is required'),
//     check('email', 'Email is required')
//         .isEmail(),
//     check('password', 'Password is requried')
//         .isLength({ min: 5 })
//         .custom((val, { req, loc, path }) => {
//             if (val !== req.body.confirmPassword) {
//                 throw new Error("Passwords don't match");
//             } else {
//                 return value;
//             }
//         }),
// ]