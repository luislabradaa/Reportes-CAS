import { Router } from "express";
import {obtenerReportes, obtenerReporte, nuevoReporte, crearReporte, editarReporte, upload} from "../controller/reporte.js";

const router = Router();

router.get("/", obtenerReportes);
router.get("/add",nuevoReporte);
router.get("/edit/:id", obtenerReporte);
router.post("/add", crearReporte);
router.post("/edit/:id", upload.single('evidencia'),editarReporte);

export default router;
