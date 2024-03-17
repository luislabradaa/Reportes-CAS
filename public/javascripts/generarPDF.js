function generatePDF() {
  var { jsPDF } = window.jspdf;

  var doc = new jsPDF("p", "mm", "Letter"); // tipo de hoja
  var pageWidth = doc.internal.pageSize.width; // Ancho de la página
  var maxWidth = 185; //Ancho maximo de parrafo
  var lineHeightFactor = 1.5; // Interlineado
  var textWidth = 20; //Ancho del texto
  var startXText = (pageWidth - textWidth) / 2; // Posición central del texto

  //Obtiene los valores del formulario en archivo editReporte
  var img = new Image();
  var img2 = new Image();
  img.src = "/images/logo_uaq_plantilla_100_por_ciento_sn_crest.png";
  img2.src = "/images/cgsi.png";
  var fecha = document.getElementById("fecha").value;
  var adscripcion = document.getElementById("adscripcion").value;
  var usuario = document.getElementById("usuario").value;
  var problema = document.getElementById("problema").value;
  var solucion = document.getElementById("solucion").value;
  var atendio = document.getElementById("nombre").value;

  //Configuración de posición, tamaño y fuente del archivo PDF 
  doc.setFontSize(14);
  doc.addImage(img, "png", 5, 5);
  doc.addImage(img2, "png", 150, 5);
  doc.
    setFont(undefined, "bold")  
    .text(20, 40, "UNIVERSIDAD AUTÓNOMA DE QUERÉTARO");
  doc.text(20, 47, "SECRETARIA ADMINISTRATIVA");
  doc.text(20,54, "DIRECCIÓN DE SERVICIOS Y RECURSOS MATERIALES")
  doc.text(startXText, 61, "COORDINACIÓN GENERAL DE SERVICIOS DE INFORMATIZACIÓN", { align: "center" });
  doc.setFontSize(12);
  doc.text(130, 80, "FECHA: ")
  doc.text(150, 80, fecha);
  doc.text(20, 80, adscripcion);
  doc.text(20, 89, usuario);
  doc.text(15, 105, "PROBLEMA").setFont(undefined, "normal");
  doc.text(15, 112, problema, { align: "justify", lineHeightFactor, maxWidth });

  //Obtiene la altura del texto del problema
  var problemTextHeight = doc.getTextDimensions(problema, {
    align: "justify",
    lineHeightFactor,
    maxWidth,
  }).h;

  //Inserta el texto de la solución después del texto del problema
  doc
    .setFont(undefined, "bold")
    .text(15, 112 + problemTextHeight + 5, "SOLUCIÓN")
    .setFont(undefined, "normal");
  doc.text(15, 112 + problemTextHeight + 12, solucion, {
    align: "justify",
    lineHeightFactor,
    maxWidth,
  });

  //Obtiene la altura del texto de la solución
  var solutionTextHeight = doc.getTextDimensions(solucion, {
    align: "justify",
    lineHeightFactor,
    maxWidth,
  }).h;
  doc
    .setFont(undefined, "bold")
    .text(
      startXText,
      112 + problemTextHeight + solutionTextHeight + 25,
      "ATENDIO",
      { align: "center" }
    )
    .setFont(undefined, "normal");
  doc.text(
    startXText,
    112 + problemTextHeight + solutionTextHeight + 32,
    atendio,
    { align: "center" }
  );
  
  //Nombre del archivo cuando se guarda
  doc.save("Reportes.pdf");
}
