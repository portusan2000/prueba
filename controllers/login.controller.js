const loginCtrl = {};
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const seed = process.env.SEED;

loginCtrl.login = (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                message: 'Credenciales incorrectas-Email',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                message: 'Credenciales incorrectas-Password',
                errors: err
            });
        }

        // Generar token
        usuarioDB.password = ':)';
        let token = jwt.sign({ usuario: usuarioDB }, seed, { expiresIn: 14400 });

        res.status(200).json({
            ok: true,
            message: 'Usuario logueado correctamente',
            user: usuarioDB,
            token: token,
            id: usuarioDB._id
        })


    })
}


module.exports = loginCtrl;