let listaComputadoras = []
let computadoraSeleccionada = null

async function cargarComputadoras() {

    try {

        let respuesta = await fetch("http://localhost:3000/api/computadoras")

        if (!respuesta.ok) {
            throw new Error("Error al cargar las computadoras")
        }

        listaComputadoras = await respuesta.json()

    } catch (error) {

        alert("No se pudieron cargar las computadoras.")

    }

}

function seleccionar(boton, grupo) {

    let botones = document.querySelectorAll("." + grupo + " button")

    botones.forEach(function(boton) {
        boton.classList.remove("seleccionado")
    })

    boton.classList.add("seleccionado")

    if (grupo === "computadoras") {
        computadoraSeleccionada = boton.dataset.id
    }

    if (grupo === "carritos" || grupo === "horarios") {
        computadoraSeleccionada = null
        mostrarComputadoras()
    }

}

async function mostrarComputadoras() {

    let fecha = document.getElementById("fecha").value
    let carrito = document.querySelector(".carritos .seleccionado")
    let horario = document.querySelector(".horarios .seleccionado")
    let contenedor = document.querySelector(".computadoras")

    contenedor.innerHTML = ""
    computadoraSeleccionada = null

    if (!fecha || !carrito || !horario) {
        return
    }

    let numeroCarrito = carrito.textContent === "Carrito 1" ? 1 : 2

    try {

        let respuesta = await fetch(
            "http://localhost:3000/api/reservas/ocupadas?fecha=" +
            encodeURIComponent(fecha) +
            "&horario=" +
            encodeURIComponent(horario.textContent)
        )

        if (!respuesta.ok) {
            throw new Error("No se pudo consultar la disponibilidad.")
        }

        let ocupadas = await respuesta.json()

        let disponibles = listaComputadoras.filter(function(pc) {
            return pc.carro === numeroCarrito
        })

        disponibles.forEach(function(pc) {

            let nuevoBoton = document.createElement("button")

            nuevoBoton.textContent = "PC " + pc.numero
            nuevoBoton.dataset.id = pc.id

            let estaOcupada = ocupadas.some(function(reserva) {
                return String(reserva.computadora_id) === String(pc.id)
            })

            if (estaOcupada) {

                nuevoBoton.disabled = true
                nuevoBoton.textContent += " - Ocupada"
                nuevoBoton.classList.add("ocupada")

            } else {

                nuevoBoton.onclick = function() {
                    seleccionar(this, "computadoras")
                }

            }

            contenedor.appendChild(nuevoBoton)

        })

    } catch (error) {

        alert(error.message)

    }

}

document.getElementById("fecha").addEventListener("change", function() {
    mostrarComputadoras()
})

async function reservar() {

    let fecha = document.getElementById("fecha").value
    let carrito = document.querySelector(".carritos .seleccionado")
    let horario = document.querySelector(".horarios .seleccionado")
    let computadora = document.querySelector(".computadoras .seleccionado")

    let usuario = JSON.parse(sessionStorage.getItem("usuario"))

    if (!usuario) {
        alert("Tenés que iniciar sesión para reservar.")
        window.location.href = "login.html"
        return
    }

    if (!fecha) {
        alert("Tenés que elegir una fecha.")
        return
    }

    if (!carrito || !horario || !computadora) {
        alert("Tenés que elegir un carrito, un horario y una computadora.")
        return
    }

    try {

        let respuesta = await fetch("http://localhost:3000/api/reservas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario_id: usuario.id,
                computadora_id: computadoraSeleccionada,
                fecha: fecha,
                horario: horario.textContent
            })
        })

        let resultado = await respuesta.json()

        if (!respuesta.ok) {
            throw new Error(resultado.error)
        }

        document.getElementById("confirmarFecha").textContent = fecha
        document.getElementById("confirmarCarrito").textContent = carrito.textContent
        document.getElementById("confirmarHorario").textContent = horario.textContent
        document.getElementById("confirmarComputadora").textContent = computadora.textContent

        document.getElementById("modalConfirmacion").style.display = "flex"

        await mostrarComputadoras()

    } catch (error) {

        alert("No se pudo realizar la reserva: " + error.message)

    }

}

function cerrarConfirmacion() {
    document.getElementById("modalConfirmacion").style.display = "none"
}

cargarComputadoras()