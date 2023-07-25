import { db } from "../database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registrar = (req, res) => {
  const comprobar =
    "SELECT * FROM usuarios WHERE email = ? OR nombreUsuario = ?";

  db.query(comprobar, [req.body.nombreUsuario, req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("El usuario ya existe");
  });

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.contrasenia, salt);

  const agregarUsuario =
    "INSERT INTO usuarios (`nombreUsuario`, `email`, `contrasenia`) VALUES (?)";
  const values = [req.body.nombreUsuario, req.body.email, hash];

  db.query(agregarUsuario, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("El usuario se creo correctamente");
  });
};


export const login = (req, res) => {
  const comprobar = "SELECT * FROM usuarios WHERE nombreUsuario = ?";
  db.query(comprobar, [req.body.nombreUsuario], (err, data) =>{
    console.log(data)
    if(err) return res.json(err);
    if(data.length === 0) return res.status(404).json("Usuario no encontrado")
    
    const compContrasenia = bcrypt.compareSync(req.body.contrasenia, data[0].contrasenia);
    
    if(!compContrasenia) return res.status(400).json("La contraseña es incorrecta");
    
    const token = jwt.sign({id: data[0].id}, "jwtkey");
    const {contrasenia, ...otros} = data[0];
    
    res.cookie("access_token", token, {
      httpOnly:true
    }).status(200).json(otros);
  });
  };
  
  export const logout = (req, res) => {
    res.clearCookie("access_token", {
      sameSite:"none",
      secure: true
    }).status(200).json("Se cerro la sesion correctamente");
  };
  