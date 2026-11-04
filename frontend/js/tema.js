let botonTema = document.getElementById("cambiarTema")

function actualizarTema() {
    let oscuro = document.body.classList.contains("modo-oscuro")

    botonTema.textContent = oscuro ? "☀ Modo claro" : "☾ Modo oscuro"
}

if (localStorage.getItem("tema") === "oscuro") {
    document.body.classList.add("modo-oscuro")
}

actualizarTema()

botonTema.addEventListener("click", function() {
    document.body.classList.toggle("modo-oscuro")

    let tema = document.body.classList.contains("modo-oscuro") ? "oscuro" : "claro"

    localStorage.setItem("tema", tema)

    actualizarTema()
})

function cerrarSesion() {
    window.location.href = "login.html"
}