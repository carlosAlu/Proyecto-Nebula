const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const verificarToken = require("../middleware/authMiddleware");
const { registrar, login, sesion, logout } = require("../controllers/authController");

// Limita los intentos de login y registro para reducir ataques de fuerza bruta.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { mensaje: "Demasiados intentos. Espera unos minutos e inténtalo de nuevo." }
});

// Publica acceso y registro; exige sesión válida para consultar el perfil.
router.post("/register", loginLimiter, registrar);
router.post("/login", loginLimiter, login);
router.get("/me", verificarToken, sesion);
router.post("/logout", logout);

module.exports = router;