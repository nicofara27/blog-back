import { db } from "../database.js";
import bcrypt from "bcryptjs";

export const registrar = (req, res) => {
  const comprobar =
    "SELECT * FROM usuarios WHERE email = ? OR nombreUsuario = ?";

  db.query(comprobar, [req.body.nombreUsuario, req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.json("El usuario ya existe");
  });

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.contrasenia, salt);

  const agregarUsuario =
    "INSERT INTO usuarios (`nombreUsuario`, `email`, `contrasenia`) VALUES (?)";
  const values = [req.body.nombreUsuario, req.body.email, hash];

  db.query(agregarUsuario, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("El usuario se creo correctamente");
  });
};

