const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("#helpers/jwtHelper.js");

const authMiddleware = async (req, res, next) => {
  // Récupérer le Token depuis les cookies ou les en-têtes Authorization
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  const refreshToken = req.cookies.refreshToken;

  // Si le Token n'est pas présent dans la requête
  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attacher les informations de l'utilisateur à la requête
    next();
  } catch (err) {
    if (refreshToken) {
      // Vérification du Refresh Token
      try {
        const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_SECRET);

        // Si le Refresh Token est valide, générer un nouveau Access Token
        const newAccessToken = generateAccessToken(decodedRefresh);
        req.user = jwt.verify(newAccessToken, process.env.JWT_SECRET);
        res.cookie("accessToken", newAccessToken);
        next();
      } catch (refreshErr) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }
    } else {
      // Si le Token est invalide et pas de Refresh Token
      return res.status(401).json({ message: "Invalid access token" });
    }
  }
};

module.exports = authMiddleware;
