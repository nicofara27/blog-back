import { db } from "../database.js";

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
  res.json("ASD");
};
export const borrarArticulo = (req, res) => {
  res.json("ASD");
};
export const editarArticulo = (req, res) => {
  res.json("ASD");
};
