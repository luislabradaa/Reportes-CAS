import pool from "../database/db.js";

function inicioSesion(req,res){
    res.render('auth/login')
}


async function login(req,res){
    try{
        const { correo, clave } = req.body;
        console.log("Se obtienen las credenciales:", correo + ' ' + clave);
        const [result] = await pool.query('SELECT id_u, nombre, correoIns, clave FROM tbl_user WHERE correoIns = ? AND clave = ?', [correo, clave])
        
        if (result.length > 0) {
            req.session.loggedin = true;
            req.session.correo = correo;
            req.session.nombre = result[0].nombre;
            req.session.userId = result[0].id_u;
            res.redirect("/menu");
        } else {
            res.render("auth/login", {message: "Usuario o contraseña incorrectos"});
        }

    }catch(error){
        console.error("Error al intentar iniciar sesión:", error);
        res.render("auth/login", {message: "Ha ocurrido un error intenta de nuevo"});
    }
}

function logOut(req,res){
    req.session.destroy(function(error){
        if(error){
                      
        }else{
            res.redirect("/"); 
        }
    })
}



export {
    login,
    logOut,
    inicioSesion
}