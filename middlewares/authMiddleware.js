const { jwt } = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // Si le Token n'est pas présent dans la requête
    if (!token) {
        return res.status(401).json({ message: 'Access token missing' });
    }

    // Vérification du Token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attacher les informations de l'utilisateur à la requête
        next();
    } catch (err) {
        if (refreshToken) {
            // Vérification du Refresh Token
            try {
                const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_SECRET);
                req.user = decodedRefresh;
                const newAccessToken = generateAccessToken(decodedRefresh);
                res.cookie('accessToken', newAccessToken);
                next();
            } catch (refreshErr) {
                return res.status(401).json({ message: 'Invalid refresh token' });
            }
        } else {
            // Si le Token est invalide et pas de Refresh Token
            return res.status(401).json({ message: 'Invalid access token' });
        }
    }
};

module.exports = authMiddleware;