const jwt = require('jsonwebtoken');

// exports.identifier = async (req,res,next) => {
//     try {
//         const headerAuth = req.get('Authorization');
//         const cookieAuth = req.cookies?.Authorization;

//         const raw = headerAuth || cookieAuth;
//         if (!raw) {
//             return res.status(401).json({ success: false, message: "Unauthorized" });
//         }
        
//         const token = raw.startsWith('Bearer ') ? raw.slice(7).trim() : raw.trim();
//         const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
//         req.user = decoded;

//         return next();
//     } catch (error) {
//         console.log(error);
//     }
// }

exports.identifier = async (req,res,next) => {
    let token;
    if (req.header['x-client'] === 'not-browser') {
        token = req.headers.Authorization || req.headers.authorization;
    } else {
        token = req.cookies['Authorization'];
    }

    if (!token) {
        return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    try {
        const userToken = token.split(' ')[1];
        const jwtVerified = jwt.verify(userToken, process.env.TOKEN_SECRET);
        if (jwtVerified) {
            req.user = jwtVerified;
            next();
        } else {
            throw new Error("Error in token");
        }
    } catch (error) {
        console.log(error);
    }
}