import { Router } from "express";
import {obtenerReportes, obtenerReporte, pantallaNuevoReporte, crearReporte, editarReporte, upload} from "../controller/reporte.js";
import { inicioSesion, login, logOut } from "../controller/auth.js";
//middleware
import { requireLogin } from "../middleware/validateLogin.js";
import { pantallaMenu } from "../controller/principal.js";

const router = Router();

//auth
router.get("/",inicioSesion);
router.post("/login", login);
router.get("/logout", logOut)

//menu principal
router.get("/menu", requireLogin, pantallaMenu);

//reportes
router.get("/reportes", requireLogin,obtenerReportes);
router.get("/add", requireLogin,pantallaNuevoReporte);
router.get("/edit/:id", requireLogin,obtenerReporte);
router.post("/add", requireLogin,crearReporte);
router.post("/edit/:id", upload.single('evidencia'),editarReporte);

export default router;
