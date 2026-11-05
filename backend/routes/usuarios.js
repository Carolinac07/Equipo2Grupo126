const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

// Obtener computadoras ocupadas
router.get("/ocupadas", async (req, res) => {

    const { fecha, horario } = req.query;

    if (!fecha || !horario) {
        return res.status(400).json({
            error: "Falta la fecha o el horario."
        });
    }

    const { data, error } = await supabase
        .from("reservas")
        .select("computadora_id")
        .eq("fecha", fecha)
        .eq("horario", horario)
        .eq("estado", "activa");

    if (error) {
        return res.status(400).json({
            error: error.message
        });
    }

    res.json(data);

});

// Obtener todas las reservas para administración
router.get("/", async (req, res) => {

    const { data: reservas, error } = await supabase
        .from("reservas")
        .select("*")
        .order("fecha", { ascending: true });

    if (error) {
        return res.status(400).json({
            error: error.message
        });
    }

    const { data: usuarios } = await supabase
        .from("usuarios")
        .select("*");

    const { data: computadoras } = await supabase
        .from("computadoras")
        .select("*");

    const resultado = reservas.map(function(reserva) {

        const usuario = usuarios.find(u => u.id === reserva.usuario_id);
        const computadora = computadoras.find(c => c.id === reserva.computadora_id);

        return {
            ...reserva,
            estudiante: usuario ? usuario.nombre + " " + usuario.apellido : "Desconocido",
            carrito: computadora ? computadora.carro : "-",
            computadora: computadora ? computadora.numero : "-"
        };

    });

    res.json(resultado);

});

// Crear una reserva
router.post("/", async (req, res) => {

    const { usuario_id, computadora_id, fecha, horario } = req.body;

    if (!usuario_id || !computadora_id || !fecha || !horario) {
        return res.status(400).json({
            error: "Faltan datos para realizar la reserva."
        });
    }

    const { data: existente, error: errorExistente } = await supabase
        .from("reservas")
        .select("id")
        .eq("computadora_id", computadora_id)
        .eq("fecha", fecha)
        .eq("horario", horario)
        .eq("estado", "activa");

    if (errorExistente) {
        return res.status(400).json({
            error: errorExistente.message
        });
    }

    if (existente.length > 0) {
        return res.status(400).json({
            error: "Esa computadora ya está reservada para ese horario."
        });
    }

    const { data, error } = await supabase
        .from("reservas")
        .insert({
            usuario_id: usuario_id,
            computadora_id: computadora_id,
            fecha: fecha,
            horario: horario,
            estado: "activa"
        })
        .select()
        .single();

    if (error) {
        return res.status(400).json({
            error: error.message
        });
    }

    res.json({
        mensaje: "Reserva realizada correctamente.",
        reserva: data
    });

});

// Cancelar o finalizar una reserva
router.patch("/:id/estado", async (req, res) => {

    const { id } = req.params;
    const { estado } = req.body;

    if (!["cancelada", "finalizada"].includes(estado)) {
        return res.status(400).json({
            error: "Estado no válido."
        });
    }

    const { data, error } = await supabase
        .from("reservas")
        .update({ estado: estado })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return res.status(400).json({
            error: error.message
        });
    }

    res.json({
        mensaje: "Reserva actualizada correctamente.",
        reserva: data
    });

});

module.exports = router;