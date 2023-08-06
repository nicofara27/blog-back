import { db } from "../database.js";
import jwt from "jsonwebtoken";

export const listarArticulos = (req, res) => {
  const listar = req.query.categoria
    ? "SELECT * FROM articulos WHERE categoria=?"
    : "SELECT * FROM articulos";

  db.query(listar, [req.query.categoria], (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
};

export const traerArticulo = (req, res) => {
  const articulo =
    "SELECT a.id, `nombreUsuario`, `titulo`, `texto`, `img`, `categoria`,`fecha` FROM usuarios u JOIN articulos a ON u.id = a.uid WHERE a.id = ? ";

  db.query(articulo, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data[0]);
  });
};

export const subirArticulo = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("No estas autenticado");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("El token no es valido");

    const agregar =
      "INSERT INTO articulos(`titulo`, `texto`, `img`, `categoria`, `fecha`, `uid`) VALUES (?)";

    const values = [
      req.body.titulo,
      req.body.texto,
      req.body.img,
      req.body.categoria,
      req.body.fecha,
      userInfo.id,
    ];

    db.query(agregar, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("El articulo se agrego correctamente");
    });
  });
};

export const borrarArticulo = (req, res) => {
  const token = req.cookies.access_token;
  console.log(req.cookies);
  if (!token) return res.status(401).json("No estas autenticado");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("El token no es valido");

    const artId = req.params.id;
    const borrar = "DELETE FROM articulos WHERE id=? AND uid=?";

    db.query(borrar, [artId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("Solo puedes borrar tus articulos");

      return res.json("Artiuclo eliminado");
    });
  });
};
export const editarArticulo = (req, res) => {
  res.json("ASD");
};
