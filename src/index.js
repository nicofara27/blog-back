import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routerUsuarios from "./routes/usuarios.routes.js";
import routerAuth from "./routes/auth.routes.js";
import routerArticulos from "./routes/articulos.routes.js";

const app = express();

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log("estoy en el puerto" + app.get("port"));
});

app.use("/auth", routerAuth);
app.use("/usuarios", routerUsuarios);
app.use("/articulos", routerArticulos);