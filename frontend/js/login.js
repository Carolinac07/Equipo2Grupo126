document.getElementById("formLogin").addEventListener("submit", async function(event) {

    event.preventDefault()

    let usuario = document.getElementById("usuario").value
    let password = document.getElementById("contraseña").value
    let mensaje = document.getElementById("mensaje")

    try {

        let respuesta = await fetch("http://localhost:3000/api/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: usuario,
                password: password
            })
        })

        let resultado = await respuesta.json()

        if (!respuesta.ok) {
            throw new Error(resultado.error)
        }

        sessionStorage.setItem("usuario", JSON.stringify(resultado.usuario))
        sessionStorage.setItem("token", resultado.token)

        if (resultado.usuario.rol === "bibliotecaria") {
            window.location.href = "admin.html"
        } else {
            window.location.href = "reservas.html"
}

    } catch (error) {

        mensaje.textContent = error.message || "No se pudo iniciar sesión."
        mensaje.style.color = "red"

    }

})