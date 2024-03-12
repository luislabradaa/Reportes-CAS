export function requireLogin(req, res, next) {
    if (req.session.loggedin) {
        // Si el usuario ha iniciado sesión, permite que la solicitud continúe
        next();
    } else {
        // Si el usuario no ha iniciado sesión, redirige al inicio de sesión
        res.redirect('/');
    }
}


