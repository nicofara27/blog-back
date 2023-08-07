import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routerUsuarios from "./routes/usuarios.routes.js";
import routerArticulos from "./routes/articulos.routes.js";

const app = express();

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log("estoy en el puerto" + app.get("port"));
});

app.use("/usuarios", routerUsuarios);
app.use("/articulos", routerArticulos);
