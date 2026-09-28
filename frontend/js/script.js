function iniciarSesion() {
    window.location.href = "reservas.html";
}

function seleccionar(boton, grupo) {

    let botones = document.querySelectorAll("." + grupo + " button");

    botones.forEach(function(boton) {
        boton.classList.remove("seleccionado");
    });

    boton.classList.add("seleccionado");
}

function reservar() {

    let carrito = document.querySelector(".carritos .seleccionado")
    let horario = document.querySelector(".horarios .seleccionado")
    let computadora = document.querySelector(".computadoras .seleccionado")

    if (!carrito || !horario || !computadora) {
        alert("Tenés que elegir un carrito, un horario y una computadora.")
        return
    }

    localStorage.setItem("carrito", carrito.textContent)
    localStorage.setItem("horario", horario.textContent)
    localStorage.setItem("computadora", computadora.textContent)

    window.location.href = "confirmacion.html"
}