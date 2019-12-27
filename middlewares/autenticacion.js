const mdAutentication = {};
const jwt = require('jsonwebtoken');
const seed = process.env.SEED

mdAutentication.verificaToken = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, seed, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: 'Token no válido',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next()

    });

}

module.exports = mdAutentication;