import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import { join, dirname} from 'path'
import { fileURLToPath } from 'url';
import routes from './router/router.js'
import Handlebars from 'handlebars';
import cookieParser from "cookie-parser";
import session from "express-session";


//inicialización
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));


//configuración de la aplicación
const PORT = process.env.PORT || 3000;
app.set('view engine', '.hbs');
app.set('views', join(__dirname, 'views'));

//configuración view engine 
app.engine('.hbs', engine({
  defaultLayout:'main',
  layoutDir: join(app.get('views'), 'views/layouts'),
  partialsDir: join(app.get('views'), 'views/partials'),
  extname: '.hbs'
}));

//activar handlebars conditions 
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});
Handlebars.registerHelper('ifTrue', function(value, options) {
  if (value === true) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

//Session
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
  cookie:{
    secure: false,
    httpOnly:true,
    maxAge:3600000 //1 hora
  }
}));

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express(express.json));

//usa la importación router.js para definir las rutas de la aplicación
app.use("/", routes);

//ruta estatica para carpeta public
app.use(express.static(join(__dirname, 'public')));




app.listen(PORT, () => {
  console.log('Funcionando en puerto:',PORT);
});
