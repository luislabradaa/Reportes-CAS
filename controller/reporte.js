import pool from "../database/db.js";
import multer from "multer";
import { join, dirname} from 'path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: join(__dirname, '../public/images/evidencias'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

var upload = multer({storage:storage});

async function obtenerReportes(req, res) {
  try {
    const [result] = await pool.query(
      "SELECT  id, CONCAT(DATE_FORMAT(fecha, '%d-%m-%Y'), ' ', DATE_FORMAT(fecha, '%h:%i %p')) AS fecha, adscripcion, usuario, problema, solucion, id_atendio, tbl_user.nombre, estado, evidencia from tbl_reporte inner join tbl_user on tbl_reporte.id_atendio = tbl_user.id_u;"
    );
    res.render("reportes/reportes", { reportes: result });
  } catch (error) {
    res.render("reportes/error", { error: error.message });
  }
}
async function pantallaNuevoReporte(req, res) {
  try {
    res.render("reportes/newReporte",{ id: req.session.userId });
  } catch (error) {
    res.render("reportes/error", { error: error.message });
  }
}

async function obtenerReporte(req, res) {
  try {
    const { id } = req.params;
    const [reporte] = await pool.query(
      "SELECT  id, CONCAT(DATE_FORMAT(fecha, '%d-%m-%Y'), ' ', DATE_FORMAT(fecha, '%h:%i %p')) AS fecha, adscripcion, usuario, problema, solucion, id_atendio, tbl_user.nombre, estado, evidencia from tbl_reporte inner join tbl_user on tbl_reporte.id_atendio = tbl_user.id_u WHERE id = ?;",
      [id]
    );
    const reporteEdit = reporte[0];
    res.render("reportes/editReporte", { reporte: reporteEdit });
  } catch (error) {
    res.render("reportes/error", { error: error.message });
  }
}

async function crearReporte(req, res) {
  try {
    const { adscripcion, usuario, problema, solucion, id_atendio, estado } =
      req.body;
    const newReporte = {
      adscripcion,
      usuario,
      problema,
      solucion,
      id_atendio,
      estado,
    };
    await pool.query("INSERT INTO tbl_reporte SET ?", [newReporte]);
    res.redirect("/reportes");
  } catch (error) {
    res.render("reportes/error", { error: error.message });
  }
}

async function editarReporte(req, res) {
  try {
    const { adscripcion, usuario, problema, solucion, id_atendio, estado} = req.body;
    let editReporte = {
      adscripcion,
      usuario,
      problema,
      solucion,
      id_atendio,
      estado
    };

    // Verificar si existe un archivo adjunto
    if (req.file) {
      const { filename: evidencia } = req.file;
      editReporte.evidencia = evidencia;
    }

    const { id } = req.params;

    // Construye la consulta SQL dinámica
    let updateQuery = "UPDATE tbl_reporte SET";
    const updateFields = Object.keys(editReporte).map(key => `${key} = ?`).join(", ");
    updateQuery += ` ${updateFields} WHERE id = ?;`;

    const updateValues = Object.values(editReporte);
    updateValues.push(id); // Agregar el ID al final de los valores

    // Ejecuta la consulta SQL
    await pool.query(updateQuery, updateValues);

    setTimeout(() => {
      res.redirect(`/edit/${id}`);
    }, 500);
  } catch (error) {
    console.log(error);
    res.render("reportes/error", { error: error.message });
  }
}

export {
  pantallaNuevoReporte,
  obtenerReportes,
  obtenerReporte,
  crearReporte,
  editarReporte,
  upload
};
