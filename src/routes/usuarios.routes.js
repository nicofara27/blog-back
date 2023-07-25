import { Router } from "express";
import { check } from "express-validator";
import { login, logout, registrar } from "../controllers/usuarios.js";

const router = Router();

router
  .route("/registrar")
  .post(
    [
      check("nombreUsuario")
        .notEmpty()
        .isLength({ min: 4, max: 30 })
        .withMessage("El nombre usuario debe tener entre 4 y 30 caracteres"),
      check("email")
        .notEmpty()
        .isEmail()
        .isLength({ min: 15, max: 100 })
        .withMessage("El email debe tener entre 15 y 100 caracteres"),
      check("contrasenia")
        .notEmpty()
        .isLength({ min: 8, max: 30 })
        .withMessage("La contraseña debe tener entre 8 y 30 caracteres"),
    ],
    registrar
  );
router
  .route("/login")
  .post(
    [
      check("nombreUsuario")
        .notEmpty()
        .isLength({ min: 4, max: 30 })
        .withMessage("El nombre usuario debe tener entre 4 y 30 caracteres"),
      check("contrasenia")
        .notEmpty()
        .isLength({ min: 8, max: 30 })
        .withMessage("La contraseña debe tener entre 8 y 30 caracteres"),
    ],
    login
  );

router.route("/logout").post(logout);

export default router;
