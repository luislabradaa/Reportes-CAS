import pool from "../database/db.js";

async function obtenerReportes(req,res){
  try {
    const [result] = await pool.query("SELECT * from tbl_reporte");
    //var fecha = result[0].fecha;
    res.render("reportes/reportes", { reportes: result});
  } catch (error) {
    res.render("reportes/error", { error: error.message });
  }
}
async function nuevoReporte(req,res){
  try {
    res.render("reportes/newReporte");
  } catch (error) {
    res.render("reportes/error", { error: error.message });
  }
}

async function obtenerReporte(req,res){
  try {
    const { id } = req.params;
    const [reporte] = await pool.query(
      "SELECT * FROM tbl_reporte WHERE id =?",
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
    const { adscripcion, usuario, problema, solucion, atendio, estado } =
      req.body;
    const newReporte = {
      adscripcion,
      usuario,
      problema,
      solucion,
      atendio,
      estado,
      
    };
    await pool.query("INSERT INTO tbl_reporte SET ?", [newReporte]);
    res.redirect("/");
  } catch (error) {
    res.render("reportes/error", { error: error.message });
  }
}

async function editarReporte(req, res) {
  try {
    const { adscripcion, usuario, problema, solucion, atendio, estado } = req.body;
    const { id } = req.params;
    const editReporte = { adscripcion, usuario, problema, solucion, atendio, estado };
    
    await pool.query("UPDATE tbl_reporte SET ? WHERE id = ?", [editReporte, id]);
    setTimeout(() => {
      res.redirect(`/edit/${id}`)
    }, "1500");
    
  } catch (error) {
    res.render("reportes/error", { error: error.message });
  }
  
}

export {nuevoReporte, obtenerReportes, obtenerReporte, crearReporte, editarReporte};
