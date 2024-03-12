function pantallaMenu(req, res) {
	
	res.render("principal/menu", { nombre: req.session.nombre, id: req.session.userId });
}

export {
    pantallaMenu
}