import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import { join, dirname} from 'path'
import { fileURLToPath } from 'url';
import reporteRouter from './router/router.js'
import Handlebars from 'handlebars';

//Inicializacion
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));


//Configuración de la aplicación
const PORT = process.env.PORT || 3000;
app.set('view engine', '.hbs');
app.set('views', join(__dirname, 'views'));

//Configuración view engine 

app.engine('.hbs', engine({
  defaultLayout:'main',
  layoutDir: join(app.get('views'), 'views/layouts'),
  partialsDir: join(app.get('views'), 'views/partials'),
  extname: '.hbs'
}))

//Activar handlebars conditions 
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});


//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express(express.json));

//usa la importación router.js para definir las rutas de la aplicación
app.use("/", reporteRouter);

//ruta estatica para carpeta public
app.use(express.static(join(__dirname, 'public')));


app.listen(PORT, () => {
  console.log('Funcionando en puerto:',PORT);
});
