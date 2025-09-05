const Joi = require('joi');

exports.signUpInSchema = Joi.object({
    email: Joi.string().min(6).max(60).required().email({
        tlds: { allowed: ['com', 'net', 'edu']}
    }),
    password: Joi.string().required().pattern(new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ))
});

exports.createPostSchema = Joi.object({
    title: Joi.string().min(1).max(60).required(),
    description: Joi.string().max(600),
    authorId: Joi.required()
})