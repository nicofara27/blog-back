import { Router } from "express";
import {
  borrarArticulo,
  editarArticulo,
  listarArticulos,
  subirArticulo,
  traerArticulo,
} from "../controllers/articulos.js";
import { check } from "express-validator";

const router = Router();

router.route("/").get(listarArticulos);
router
  .route("/:id")
  .get(traerArticulo)
  .put(
    [
      check("titulo")
        .notEmpty()
        .isLength({ min: 4, max: 200 })
        .withMessage("El titulo debe tener entre 4 y 200 caracteres"),
      check("texto").notEmpty(),
      check("img")
        .notEmpty()
        .isLength({ min: 6, max: 200 })
        .withMessage("La imagen debe tener entre 6 y 200 caracteres"),
      check("categoria")
        .notEmpty()
        .isLength({ min: 4, max: 10 })
        .withMessage("La categoria deve tener entre 4 y 10 caracteres"),
      check("fecha").notEmpty(),
      check("uid").notEmpty(),
    ],
    editarArticulo
  )
  .delete(borrarArticulo);

router
  .route("/subir")
  .post(
    [
      check("titulo")
        .notEmpty()
        .isLength({ min: 4, max: 200 })
        .withMessage("El titulo debe tener entre 4 y 200 caracteres"),
      check("texto").notEmpty(),
      check("img")
        .notEmpty()
        .isLength({ min: 6, max: 200 })
        .withMessage("La imagen debe tener entre 6 y 200 caracteres"),
      check("categoria")
        .notEmpty()
        .isLength({ min: 4, max: 10 })
        .withMessage("La categoria deve tener entre 4 y 10 caracteres"),
      check("fecha").notEmpty(),
      check("uid").notEmpty(),
    ],
    subirArticulo
  );

export default router;
