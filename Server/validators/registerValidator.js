const {check} = require('express-validator')
const {validateResult} = require('../utils/validateHelper')

const validateCreate = [
    check('userName')
        .exists()
        .not()
        .isEmpty(),
    check('password')
        .exists()
        .isStrongPassword(),
    check('email')
        .exists()
        .isEmail(),
    check('firstName')
        .exists()
        .not()
        .isEmpty(),
    check('lastName')
        .exists()
        .not()
        .isEmpty(),
    check('age')
        .exists()
        .isNumeric(),
    check('phoneNumber')
        .exists()
        .isNumeric(),
    check('facebook')
        .exists()
        .not()
        .isEmpty(),
    check('twitter')
        .exists()
        .not()
        .isEmpty(),
    check('instagram')
        .exists()
        .not()
        .isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {validateCreate}