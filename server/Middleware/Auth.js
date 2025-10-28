const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");

const verifyToken = (requiredRoles = []) => {
    return async (req, res, next) => {
        console.log('🚨 MIDDLEWARE HIT:', req.method, req.path);
        console.log('🚨 Required roles:', requiredRoles);
        console.log('🚨 Headers:', req.headers['authorization']?.substring(0, 30) + '...');

        try {
            const token = req.headers['authorization']?.split(' ')[1];

            if (!token) {
                console.log('❌ No token provided');
                return res.status(403).json({ message: "Access denied, no token provided" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("✅ Decoded Token:", decoded);
            console.log("👤 User ID from token:", decoded.userId);

            // Find user by ID from token
            const user = await User.findById(decoded.userId);

            if (!user) {
                console.log('❌ User not found with ID:', decoded.userId);
                return res.status(404).json({ message: "User not found" });
            }

            console.log('✅ User found:', user.username, 'ID:', user._id);
            // Normalize requiredRoles to an array of lowercase strings
            let required = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
            required = required.map(r => String(r || '').trim()).filter(Boolean);
            const userRoles = (user.role || []).map(r => String(r || '').trim());

            console.log('✅ User roles:', userRoles, 'Required:', required);

            // Check roles
            if (requiredRoles.length && !user.role.some(r => requiredRoles.includes(r))) {
                console.log('❌ Insufficient permissions');
                return res.status(403).json({ message: "You have no access" });
            }

            // Attach full user object to request
            req.user = user;

            console.log('✅ Token verified, proceeding to route handler');
            next();
        } catch (error) {
            console.error('❌ Middleware error:', error);

            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: "Invalid token" });
            } else if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expired" });
            }
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    };
};

module.exports = verifyToken;