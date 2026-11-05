document.getElementById("formRegistro").addEventListener("submit", async function(event) {

    event.preventDefault()

    let nombre = document.getElementById("nombre").value
    let apellido = document.getElementById("apellido").value
    let usuario = document.getElementById("usuario").value
    let password = document.getElementById("contraseña").value

    let mensaje = document.getElementById("mensaje")

    try {

        let respuesta = await fetch("http://localhost:3000/api/usuarios/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                apellido: apellido,
                usuario: usuario,
                password: password
            })
        })

        let resultado = await respuesta.json()

        if (!respuesta.ok) {
            throw new Error(resultado.error)
        }

        mensaje.textContent = "¡Cuenta creada correctamente! Ya podés iniciar sesión."
        mensaje.style.color = "green"

        document.getElementById("formRegistro").reset()

    } catch (error) {

        mensaje.textContent = error.message || "No se pudo crear la cuenta."
        mensaje.style.color = "red"

    }

})