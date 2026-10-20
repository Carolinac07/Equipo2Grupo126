let fecha = localStorage.getItem("fecha")
let carrito = localStorage.getItem("carrito")
let horario = localStorage.getItem("horario")
let computadora = localStorage.getItem("computadora")

if (!fecha || !carrito || !horario || !computadora) {

    alert("No hay ninguna reserva para mostrar.")
    window.location.href = "reservas.html"

} else {

    document.getElementById("fecha").textContent = fecha
    document.getElementById("carrito").textContent = carrito
    document.getElementById("horario").textContent = horario
    document.getElementById("computadora").textContent = computadora

}

function volver() {
    window.location.href = "reservas.html"
}