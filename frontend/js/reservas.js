function seleccionar(boton, grupo) {
    let botones = document.querySelectorAll("." + grupo + " button")

    botones.forEach(function(boton) {
        boton.classList.remove("seleccionado")
    })

    boton.classList.add("seleccionado")

    if (grupo === "carritos") {
        let computadoras = document.querySelectorAll(".computadoras button")
        let numeroInicial = boton.textContent === "Carrito 1" ? 1 : 11

        computadoras.forEach(function(pc, indice) {
            pc.textContent = "PC " + (numeroInicial + indice)
            pc.classList.remove("seleccionado")
        })
    }
}

function reservar() {   
    let fecha = document.getElementById("fecha").value
    let carrito = document.querySelector(".carritos .seleccionado")
    let horario = document.querySelector(".horarios .seleccionado")
    let computadora = document.querySelector(".computadoras .seleccionado")

    if (!fecha) {
        alert("Tenés que elegir una fecha.")
        return
    }

    if (!carrito || !horario || !computadora) {
        alert("Tenés que elegir un carrito, un horario y una computadora.")
        return
    }

    localStorage.setItem("fecha", fecha)
    localStorage.setItem("carrito", carrito.textContent)
    localStorage.setItem("horario", horario.textContent)
    localStorage.setItem("computadora", computadora.textContent)

    window.location.href = "confirmacion.html"
}