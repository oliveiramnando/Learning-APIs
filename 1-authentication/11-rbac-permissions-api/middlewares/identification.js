const jwt = require('jsonwebtoken');

exports.identifier = (req,res, next) => {
    let raw = req.get('authorization'); // proper way to read headers
    let source = 'header';

    // 2) Fallback to cookie if no header
    if (!raw) { // prioritized authorization header
        raw = req.cookies?.Authorization;
        source = 'cookie';
    }

    console.log(`🔎 Auth source: ${source}, raw:`, raw); // debug log

    if (!raw || !raw.toLowerCase().startsWith('bearer ')) { // enforces proper bearer format
        return res.status(401).json({ success: false, message: 'Missing Bearer token' });
    }

    const token = raw.slice(7).trim();
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);    // verified jwt 

    req.user = { id: String(payload.id), email: payload.email, role: payload.role };    // set req.user
    console.log('👤 req.user =', req.user); // debug log

    next();
} 
// exports.identifier = async (req,res,next) => {
//     let token;
//     if (req.header('x-client') === 'not-browser') {
//         token = req.headers.Authorization || req.headers.authorization;
//     } else {
//         token = req.cookies['Authorization'];
//     }

//     if (!token) {
//         return res.status(403).json({ success: false, message: "Unauthorized" });
//     }

//     try {
//         const userToken = token.split(' ')[1];
//         const jwtVerified = jwt.verify(userToken, process.env.TOKEN_SECRET);
//         if (jwtVerified) {
//             req.user = jwtVerified;
//             next();
//         } else {
//             throw new Error("Error in token");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }