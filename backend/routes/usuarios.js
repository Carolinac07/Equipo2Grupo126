const express = require("express")
const router = express.Router()
const supabase = require("../config/supabase")

router.post("/registro", async (req, res) => {

    const { nombre, apellido, usuario, password } = req.body

    if (!nombre || !apellido || !usuario || !password) {
        return res.status(400).json({
            error: "Completá todos los campos."
        })
    }

    const { data, error } = await supabase.auth.signUp({
        email: usuario,
        password: password
    })

    if (error) {
        return res.status(400).json({
            error: error.message
        })
    }

    const { error: errorPerfil } = await supabase
        .from("usuarios")
        .insert({
            nombre: nombre,
            apellido: apellido,
            usuario: usuario,
            rol: "usuario"
        })

    if (errorPerfil) {
        return res.status(400).json({
            error: errorPerfil.message
        })
    }

    res.json({
        mensaje: "Cuenta creada correctamente."
    })

})

router.post("/login", async (req, res) => {

    const { usuario, password } = req.body

    const { data, error } = await supabase.auth.signInWithPassword({
        email: usuario,
        password: password
    })

    if (error) {
        return res.status(400).json({
            error: "Correo o contraseña incorrectos."
        })
    }

    const { data: perfil, error: errorPerfil } = await supabase
        .from("usuarios")
        .select("*")
        .eq("usuario", usuario)
        .single()

    if (errorPerfil) {
        return res.status(400).json({
            error: "No se encontraron los datos del usuario."
        })
    }

    res.json({
        mensaje: "Inicio de sesión correcto.",
        usuario: perfil,
        token: data.session.access_token
    })

})

module.exports = router