let reservas = []

async function cargarReservas() {

    let lista = document.getElementById("listaReservas")

    lista.textContent = "Cargando reservas..."

    try {

        let respuesta = await fetch("http://localhost:3000/api/reservas")
        let resultado = await respuesta.json()

        if (!respuesta.ok) {
            throw new Error(resultado.error)
        }

        reservas = resultado
        mostrarReservas()

    } catch (error) {

        lista.textContent = "No se pudieron cargar las reservas."

    }

}

function mostrarReservas() {

    let lista = document.getElementById("listaReservas")

    lista.innerHTML = ""

    if (reservas.length === 0) {
        lista.textContent = "No hay reservas para mostrar."
        return
    }

    reservas.forEach(function(reserva) {

        lista.innerHTML += `
            <div class="reserva">
                <p>Estudiante: ${reserva.estudiante}</p>
                <p>Fecha: ${reserva.fecha}</p>
                <p>Carrito: ${reserva.carrito}</p>
                <p>Horario: ${reserva.horario}</p>
                <p>Computadora: PC ${reserva.computadora}</p>
                <p>Estado: ${reserva.estado}</p>

                ${reserva.estado === "activa" ? `
                    <button onclick="cambiarEstado(${reserva.id}, 'cancelada')">
                        Cancelar reserva
                    </button>

                    <button onclick="cambiarEstado(${reserva.id}, 'finalizada')">
                        Liberar computadora
                    </button>
                ` : ""}
            </div>
        `

    })

}

async function cambiarEstado(id, estado) {

    let pregunta = estado === "cancelada"
        ? "¿Querés cancelar esta reserva?"
        : "¿Querés liberar esta computadora?"

    if (!confirm(pregunta)) {
        return
    }

    try {

        let respuesta = await fetch(`http://localhost:3000/api/reservas/${id}/estado`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                estado: estado
            })
        })

        let resultado = await respuesta.json()

        if (!respuesta.ok) {
            throw new Error(resultado.error)
        }

        cargarReservas()

    } catch (error) {

        alert(error.message || "No se pudo actualizar la reserva.")

    }

}

function cerrarSesion() {
    sessionStorage.clear()
    window.location.href = "login.html"
}

cargarReservas()