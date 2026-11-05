import { supabase } from "./config/supabase"

export async function obtenerComputadoras() {

    const { data, error } = await supabase
        .from("computadoras")
        .select("*")

    if (error) {
        console.log("Error:", error)
        return []
    }

    return data
}

export async function reservarComputadora(nombre, codigo, computadoraId, duracion) {

    const { error } = await supabase
        .from("reservas")
        .insert([
            {
                computadora_id: computadoraId,
                nombre: nombre,
                codigo: codigo,
                fecha_inicio: new Date().toISOString(),
                duracion: duracion,
                fecha_fin: new Date(Date.now() + duracion * 60 * 60 * 1000).toISOString() 
               
            }
        ])

    if (error) {
        console.log("Error al reservar:", error)
        return false
    }

    const { error: errorActualizacion } = await supabase
        .from("computadoras")
        .update({ estado: "Ocupada" })
        .eq("id", computadoraId)

    if (errorActualizacion) {
        console.log("Error al actualizar:", errorActualizacion)
        return false
    }

    return true
}

export async function cancelarReserva(nombre, codigo) {

    const { data, error } = await supabase
        .from("reservas")
        .select("*")
        .eq("nombre", nombre)
        .eq("codigo", codigo)

    if (error || data.length === 0) {
        console.log("Reserva no encontrada")
        return false
    }

    const computadoraId = data[0].computadora_id

    const { error: errorEliminar } = await supabase
        .from("reservas")
        .delete()
        .eq("id", data[0].id)

    if (errorEliminar) {
        console.log("Error al cancelar:", errorEliminar)
        return false
    }

    const { error: errorActualizar } = await supabase
        .from("computadoras")
        .update({ estado: "Libre" })
        .eq("id", computadoraId)

    if (errorActualizar) {
        console.log("Error al liberar computadora:", errorActualizar)
        return false
    }

    return true
}

export async function obtenerReservas() {

    const { data, error } = await supabase
        .from("reservas")
        .select("*")

    if (error) {
        console.log("Error:", error)
        return []
    }

    return data
}

export async function liberarReserva(id, computadoraId) {

    const { error } = await supabase
        .from("reservas")
        .delete()
        .eq("id", id)

    if (error) {
        console.log("Error al eliminar reserva:", error)
        return false
    }

    const { error: errorActualizar } = await supabase
        .from("computadoras")
        .update({ estado: "Libre" })
        .eq("id", computadoraId)

    if (errorActualizar) {
        console.log("Error al liberar computadora:", errorActualizar)
        return false
    }

    return true
}