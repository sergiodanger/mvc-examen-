// middleware/authAdmin.js
module.exports = (req, res, next) => {
    if (req.session.user && req.session.user.is_admin) {
        return next();
    } else {
        res.status(403).send('No tienes permiso para acceder a esta página');
    }
};
