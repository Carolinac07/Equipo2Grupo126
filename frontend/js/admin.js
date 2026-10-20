let reservas = []

function mostrarReservas() {
    let lista = document.getElementById("listaReservas")

    lista.innerHTML = ""

    if (reservas.length === 0) {
        lista.textContent = "No hay reservas para mostrar."
        return
    }

    reservas.forEach(function(reserva, indice) {
        lista.innerHTML += `
            <div class="reserva">
                <p>Estudiante: ${reserva.estudiante}</p>
                <p>Fecha: ${reserva.fecha}</p>
                <p>Carrito: ${reserva.carrito}</p>
                <p>Horario: ${reserva.horario}</p>
                <p>Computadora: PC ${reserva.computadora}</p>
                <button onclick="cancelarReserva(${indice})">
                    Cancelar reserva
                </button>
            </div>
        `
    })
}

function cancelarReserva(indice) {
if (confirm("¿Querés cancelar esta reserva?")) {
reservas.splice(indice, 1)
mostrarReservas()
}
}

function cerrarSesion() {
window.location.href = "login.html"
}

mostrarReservas()