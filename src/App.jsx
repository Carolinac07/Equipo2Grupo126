import { useEffect, useState } from "react"
import { obtenerComputadoras, obtenerReservas, reservarComputadora, cancelarReserva, liberarReserva } from "./prueba"

function App() {

  const [computadoras, setComputadoras] = useState([])
  const [reservas, setReservas] = useState([])
  const [ahora, setAhora] = useState(Date.now())
  const [reservasProcesadas, setReservasProcesadas] = useState([])
  const [nombre, setNombre] = useState("")
  const [codigo, setCodigo] = useState("")
  const [duracion, setDuracion] = useState(1)
  const [nombreCancelacion, setNombreCancelacion] = useState("")
  const [codigoCancelacion, setCodigoCancelacion] = useState("")


async function cargarComputadoras() {
  const datos = await obtenerComputadoras()
  const datosReservas = await obtenerReservas()

  setComputadoras(datos)
  setReservas(datosReservas)
}

  useEffect(() => {
    cargarComputadoras()
  }, [])

  useEffect(() => {
  const intervalo = setInterval(() => {
    setAhora(Date.now())
  }, 1000)

  return () => clearInterval(intervalo)
}, [])

useEffect(() => {

  async function revisarReservas() {

    for (const reserva of reservas) {

      const vencida = new Date(reserva.fecha_fin).getTime() <= ahora

      if (vencida && !reservasProcesadas.includes(reserva.id)) {

        setReservasProcesadas((anteriores) => [
          ...anteriores,
          reserva.id
        ])

        const resultado = await liberarReserva(
          reserva.id,
          reserva.computadora_id
        )

        if (resultado) {
          cargarComputadoras()
        }
      }
    }
  }

  revisarReservas()

}, [ahora, reservas])

  async function reservar(id) {

    if (nombre === "" || codigo === "") {
      alert("Ingresá nombre y código")
      return
    }

    const resultado = await reservarComputadora(
      nombre,
      codigo,
      id,
      Number(duracion)
    )

    if (resultado) {
      alert("¡Reserva realizada!")
      setNombre("")
      setCodigo("")
      cargarComputadoras()
    } else {
      alert("No se pudo realizar la reserva")
    }
  }

async function cancelar() {

  if (nombreCancelacion === "" || codigoCancelacion === "") {
    alert("Ingresá nombre y código")
    return
  }

  const resultado = await cancelarReserva(
    nombreCancelacion,
    codigoCancelacion
  )

  if (resultado) {
    alert("¡Reserva cancelada!")
    setNombreCancelacion("")
    setCodigoCancelacion("")
    cargarComputadoras()
  } else {
    alert("No se encontró la reserva")
  }
}

function calcularTiempo(fechaFin) {

  const diferencia = new Date(fechaFin).getTime() - ahora

  if (diferencia <= 0) {
    return "Tiempo terminado"
  }

  const horas = Math.floor(diferencia / (1000 * 60 * 60))

  const minutos = Math.floor(
    (diferencia % (1000 * 60 * 60)) / (1000 * 60)
  )

  const segundos = Math.floor(
    (diferencia % (1000 * 60)) / 1000
  )

  return `${horas}h ${minutos}m ${segundos}s`
}

  return (
    <div>
      <h1>Biblioteca Web</h1>

      <h2>Datos de la reserva</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="text"
        placeholder="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />

      <input
        type="number"
        min="1"
        value={duracion}
        onChange={(e) => setDuracion(e.target.value)}
      />

      <h2>Cancelar reserva</h2>

<input
  type="text"
  placeholder="Nombre"
  value={nombreCancelacion}
  onChange={(e) => setNombreCancelacion(e.target.value)}
/>

<input
  type="text"
  placeholder="Código"
  value={codigoCancelacion}
  onChange={(e) => setCodigoCancelacion(e.target.value)}
/>

<button onClick={cancelar}>
  Cancelar reserva
</button>

      <h2>Computadoras disponibles</h2>

      {computadoras.map((pc) => (
        <div key={pc.id}>
          <h3>Computadora {pc.numero}</h3>

          <p>Estado: {pc.estado}</p>
  {pc.estado === "Ocupada" && (
   <p>
     Tiempo restante: {
       calcularTiempo(
          reservas.find(
           (reserva) => reserva.computadora_id === pc.id
         )?.fecha_fin
        )
      }
    </p>
)}

          {pc.estado === "Libre" && (
            <button onClick={() => reservar(pc.id)}>
              Reservar
            </button>
          )}
        </div>
      ))}

    </div>
  )
}

export default App
