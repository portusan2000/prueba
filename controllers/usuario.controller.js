const usuarioCtrl = {};
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');


//==============================================
//     Buscar Usuarios en la BD
//==============================================
usuarioCtrl.getAllUsers = (req, res) => {

    Usuario.find()
        .exec((err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Ha ocurrido un error',
                    errors: err
                });
            }

            Usuario.countDocuments((err, total) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        message: 'Ha ocurrido un error',
                        errors: err
                    })
                }
                res.status(200).json({
                    ok: true,
                    message: 'Lista de Usuarios',
                    users: usuarios,
                    total: total
                });
            });

        });
}


//==============================================
//     Crear un usuario en la BD
//==============================================

usuarioCtrl.addNewUser = (req, res) => {

    let body = req.body;

    console.log(body);

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    console.log(usuario);

    usuario.save((err, userAdd) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Ha ocurrido un error',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Usuario creado correctamente',
            user: userAdd
        });
    });

}

//==============================================
//     Borrar usuario en la BD
//==============================================

usuarioCtrl.deleteUser = (req, res) => {
    let id = req.params.id;

    console.log('El id del usuario es:', id)

    Usuario.findByIdAndRemove(id, (err, userDeleted) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario no encontrado',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Usuario borrado correctamente',
            user: userDeleted
        });
    });

}


//==============================================
//     Actualizar un usuario en la BD
//==============================================

usuarioCtrl.updateUser = (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let usuario = {
        nombre: body.nombre,
        email: body.email,
    }

    Usuario.findByIdAndUpdate(id, { $set: usuario }, { new: true }, (err, userUpdated) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al actualizar el usuario',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Usuario actualizado correctamente',
            user: userUpdated
        });
    });

}


module.exports = usuarioCtrl;