const jwt = require('jsonwebtoken');
const { signupSchema, signinSchema, acceptCodeSchema, changePasswordSchema } = require('../middlewares/validator');
const { doHash, doHashValidation, hmacProcess } = require('../utils/hashing');
const User = require('../models/usersModel');
const transport = require('../middlewares/sendMail');

exports.signup = async (req,res) => {
    const { email, password } = req.body;
    try {
        const { error, value } = signupSchema.validate({ email, password }); // runs joi validation on user input

        if (error) {
            return res.status(401).json({ success:false, message: error.details[0].message });
        } 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ success: false, message: "User already exists!" });
        }
        const hashPassword = await doHash(password, 12);

        const newUser = new User({
            email,
            password:hashPassword
        });
        const result = await newUser.save();
        result.password = undefined; // we dont to send the hashed password to them
        res.status(201).json({
            success: true, message: "Account has been created successfully", result
        });
        
    } catch (error) {
        console.log(error);
    }
};

exports.signin = async (req,res) => {
    const { email, password } = req.body;
    try {
        const { error, value } = signinSchema.validate({ email, password });
        if (error) {
            return res.status(401).json({ success:false, message: error.details[0].message });
        } 

        const existingUser = await User.findOne({ email }).select('+password');
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User doesn't exist!" });
        }
        const result = await doHashValidation(password, existingUser.password)
        if (!result) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
        const token = jwt.sign({
                userId: existingUser._id,
                email: existingUser.email,
                verified: existingUser.verified,
            }, process.env.TOKEN_SECRET,
            {
                expiresIn: '8h'
            }
        );
        res.cookie('Authorization', 'Bearer ' + token, { expires: new Date(Date.now() + 8 * 3600000), httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production'}).json({ success: true, token, message: "Log in successful"});

    } catch (error) {
        console.log(error);
    }
};

exports.signout = async (req,res) => {
    res.clearCookie('Authorization').status(200).json({ success:true, message: "Logged out successfully" });
};

exports.sendVerificationCode = async (req,res) => {
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User doesn't exist!" });
        }
        if (existingUser.verified) {
            return res.status(400).json({ success: false, message: "Already Verified!" });
        }

        const codeValue = Math.floor(Math.random() * 1000000).toString();
        let info = await transport.sendMail({
            from: process.env.NODE_CODE_EMAIL_ADDRESS,
            to: existingUser.email,
            subject: "Verification Code",
            html: '<h1>' + codeValue + '<h1>'
        });

        if (info.accepted[0] === existingUser.email) {
            const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET)
            existingUser.verificationCode = hashedCodeValue;
            existingUser.verificationCodeValidation = Date.now();
            await existingUser.save();
            return res.status(200).json({ success: true, message: "Code sent!"});
        }
        return res.status(400).json({ success: false, message: "Code did not send!"}) // if email not accepted

    } catch (error) {
        console.log(error);
    }
};

exports.verifyVerificationCode = async (req,res) => {
    const { email, providedCode } = req.body;
    try {
        const { error, value } = acceptCodeSchema.validate({ email, providedCode });
        if (error) {
            return res.status(401).json({ success:false, message: error.details[0].message });
        } 
        const codeValue = providedCode.toString();
        const existingUser = await User.findOne({ email }).select("+verificationCode +verificationCodeValidation"); // needs spaave between plus
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User does not exist"});
        }

        if (existingUser.verified) {
            return res.status(400).json({ success: false, message: "You are already verified" });
        }

        if (!existingUser.verificationCode || !existingUser.verificationCodeValidation) {
            return res.status(400).json({ success: false, message: "Something is wrong with the code!" })
        }
        if (Date.now() - existingUser.verificationCodeValidation > 15 * 60 * 1000){
            return res.status(400).json({ success: false, message: "code has been expired!"});
        }

        const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET);
        if (hashedCodeValue === existingUser.verificationCode) {
            existingUser.verified = true;
            existingUser.verificationCode = undefined;
            existingUser.verificationCodeValidation = undefined;
            await existingUser.save();
            return res.status(200).json({ success: true, message: "Your account has been verified" });
        }
        return res.status(400).json({ success: false, message: "unexpected occured"})
    } catch (error) {
        console.log(error);
    }
};

exports.changePassword = async (req,res) => {
    const { userId, verified } = req.user;
    const { oldPassword, newPassword } = req.body;
    try {
        const { error, value } = changePasswordSchema.validate({ oldPassword, newPassword });
        if (error) {
            return res.status(401).json({ success:false, message: error.details[0].message });
        } 
        if (!verified) {
            return res.status(401).json({ success:false, message: "You are not a verified user" });
        }  
        const existingUser = await User.findOne({ _id: userId}).select('+password');
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User does not exist"});
        }
        const result = await doHashValidation(oldPassword, existingUser.password);
        if (!result) {
            return res.status(401).json({ success: false, message: "Invalid credentials"});
        }
        const hashedPassword = await doHash(newPassword, 12);
        existingUser.password = hashedPassword;
        await existingUser.save();
        return res.status(200).json({ success:true, message: "password updated" })
    } catch (error) {
        console.log(error);
    }
}