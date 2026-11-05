# Sistema de Reserva de Computadoras

## Descripción del proyecto

El Sistema de Reserva de Computadoras es una aplicación web desarrollada para la biblioteca escolar. Permite que los estudiantes puedan registrarse, iniciar sesión y reservar una computadora para una fecha y horario determinados.

También cuenta con una sección de administración desde la cual la bibliotecaria puede consultar las reservas y cancelar o finalizar aquellas que correspondan.

## Índice

1. [Descripción del proyecto](#descripción-del-proyecto) — Presentación general del sistema y su objetivo.
2. [Funcionalidades principales](#funcionalidades-principales) — Acciones que pueden realizar los estudiantes y la bibliotecaria.
3. [Tecnologías utilizadas](#tecnologías-utilizadas) — Herramientas y lenguajes utilizados para desarrollar el proyecto.
4. [Estructura del proyecto](#estructura-del-proyecto) — Organización de las carpetas y archivos.
5. [Instalación y ejecución](#instalación-y-ejecución) — Pasos para descargar, configurar y ejecutar el sistema.
6. [Base de datos](#base-de-datos) — Descripción de las tablas utilizadas en Supabase.
7. [API del backend](#api-del-backend) — Rutas disponibles para la comunicación entre el frontend y el backend.
8. [Configuración](#configuración) — Variables de entorno necesarias para conectar la base de datos.
9. [Pruebas realizadas](#pruebas-realizadas) — Comprobaciones manuales realizadas durante el desarrollo.
10. [Posibles errores](#posibles-errores) — Problemas frecuentes y cómo solucionarlos.
11. [Manual de usuario](#manual-de-usuario) — Explicación básica de cómo utilizar el sistema.
12. [Publicación del proyecto](#publicación-del-proyecto) — Información sobre el estado de la publicación.

## Funcionalidades principales

### Estudiantes

- Registrarse en el sistema.
- Iniciar sesión.
- Consultar las computadoras disponibles.
- Seleccionar una fecha, un carrito y un horario.
- Realizar una reserva.
- Recibir una confirmación de la reserva.

### Bibliotecaria

- Iniciar sesión con una cuenta de bibliotecaria.
- Consultar todas las reservas realizadas.
- Cancelar una reserva.
- Finalizar una reserva cuando corresponda.
- Liberar una computadora mediante la finalización de una reserva.

### Otras funcionalidades

- Modo claro y modo oscuro.
- Comprobación de disponibilidad antes de reservar.
- Bloqueo de computadoras que ya tienen una reserva activa para el mismo horario.

## Tecnologías utilizadas

### Frontend

- HTML: estructura de las páginas.
- CSS: diseño y estilos.
- JavaScript: interacciones y comunicación con el backend.

### Backend

- Node.js: entorno de ejecución.
- Express: creación del servidor y las rutas de la API.
- Supabase: conexión con la base de datos y autenticación.

### Herramientas

- Git y GitHub: control de versiones y trabajo colaborativo.
- Visual Studio Code: editor de código.

## Estructura del proyecto

El proyecto está dividido en dos partes principales: `frontend` y `backend`.

```text
Equipo2Grupo126/
│
├── backend/
│   ├── config/
│   │   └── supabase.js
│   │
│   ├── routes/
│   │   ├── computadoras.js
│   │   ├── reservas.js
│   │   └── usuarios.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── css/
│   │   ├── admin.css
│   │   ├── login.css
│   │   ├── reservas.css
│   │   └── style.css
│   │
│   ├── img/
│   │   └── logoesc.png
│   │
│   ├── js/
│   │   ├── admin.js
│   │   ├── login.js
│   │   ├── registro.js
│   │   ├── reservas.js
│   │   └── tema.js
│   │
│   ├── admin.html
│   ├── login.html
│   ├── registro.html
│   └── reservas.html
│
├── docs/
└── hitos/
```

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Carolinac07/Equipo2Grupo126.git
```

Ingresar a la carpeta del proyecto:

```bash
cd Equipo2Grupo126
```

### 2. Instalar las dependencias

Ingresar a la carpeta del backend:

```bash
cd backend
```

Instalar las dependencias necesarias:

```bash
npm install
```

### 3. Configurar las variables de entorno

Dentro de la carpeta `backend`, crear un archivo llamado `.env` y agregar los datos de conexión de Supabase:

```env
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_clave_de_supabase
```

Los valores deben obtenerse desde la configuración del proyecto en Supabase.

### 4. Iniciar el backend

Desde la carpeta `backend`, ejecutar:

```bash
node server.js
```

Si el servidor inicia correctamente, aparecerá un mensaje indicando que está funcionando en el puerto 3000.

También se puede comprobar ingresando a:

http://localhost:3000/

Debería aparecer el mensaje:

`Backend funcionando correctamente`

### 5. Abrir el frontend

Abrir el archivo `frontend/login.html` desde el navegador.

El sistema ya estará listo para utilizarse mientras el backend se encuentre funcionando.

## Base de datos

La base de datos está alojada en Supabase y utiliza las siguientes tablas:

### Tabla usuarios

Almacena los datos de los usuarios registrados.

- `id`: identificador del usuario.
- `nombre`: nombre del usuario.
- `apellido`: apellido del usuario.
- `usuario`: correo electrónico utilizado para iniciar sesión.
- `rol`: indica si es usuario o bibliotecaria.
- `created_at`: fecha de creación del registro.

Las contraseñas son gestionadas mediante Supabase Auth.

### Tabla computadoras

Almacena la información de las computadoras disponibles en la biblioteca.

- `id`: identificador de la computadora.
- `numero`: número de computadora.
- `carro`: carrito al que pertenece.
- `estado`: estado de la computadora.
- `observaciones`: información adicional.
- `created_at`: fecha de creación del registro.

### Tabla reservas

Almacena las reservas realizadas.

- `id`: identificador de la reserva.
- `usuario_id`: usuario que realizó la reserva.
- `computadora_id`: computadora reservada.
- `fecha`: fecha de la reserva.
- `horario`: horario seleccionado.
- `estado`: estado de la reserva.
- `created_at`: fecha de creación del registro.

Los estados utilizados para las reservas son:

- `activa`
- `cancelada`
- `finalizada`

## API del backend

El backend utiliza Express para recibir las solicitudes del frontend y comunicarse con Supabase.

Las rutas disponibles son:

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/computadoras` | Obtiene todas las computadoras. |
| POST | `/api/usuarios/registro` | Registra un nuevo usuario. |
| POST | `/api/usuarios/login` | Inicia sesión. |
| GET | `/api/reservas` | Obtiene todas las reservas. |
| GET | `/api/reservas/ocupadas` | Consulta las computadoras ocupadas para una fecha y horario. |
| POST | `/api/reservas` | Crea una nueva reserva. |
| PATCH | `/api/reservas/:id/estado` | Modifica el estado de una reserva. |

## Configuración

Para que el sistema funcione correctamente, es necesario configurar las variables de entorno del backend.

El archivo `.env` contiene los datos necesarios para conectarse con Supabase.

Este archivo no debe subirse al repositorio porque contiene información privada.

Por ese motivo, se encuentra incluido en el `.gitignore`, junto con la carpeta `node_modules`.

## Pruebas realizadas

Durante el desarrollo se realizaron pruebas manuales para comprobar el funcionamiento de las distintas partes del sistema y verificar la comunicación entre el frontend, el backend y Supabase.

### Procedimientos y resultados

| Área | Procedimiento realizado | Resultado |
|---|---|---|
| Conexión y autenticación | Se inició el backend y se comprobó su conexión con Supabase. Se realizaron pruebas de registro e inicio de sesión. | La conexión funcionó correctamente y los usuarios pudieron registrarse e iniciar sesión. |
| Interfaz y consultas | Se recorrieron las pantallas de inicio de sesión, registro, reservas y administración. También se comprobó la carga de computadoras. | Las pantallas cargaron correctamente y se obtuvieron los datos desde la base de datos. |
| Formularios | Se probaron los formularios de registro y acceso, verificando el ingreso de los datos solicitados. | Los formularios funcionaron correctamente y se mostraron mensajes cuando ocurrió algún error. |
| Consulta de disponibilidad | Se seleccionaron distintas fechas, carritos y horarios para consultar qué computadoras estaban ocupadas. | El sistema identificó las computadoras que tenían reservas activas y evitó seleccionarlas nuevamente. |
| Creación de reservas | Se seleccionó una computadora disponible y se confirmó una reserva. Luego se verificó la información guardada. | La reserva se registró correctamente en Supabase y se mostró el mensaje de confirmación. |
| Administración de reservas | Se ingresó con una cuenta de bibliotecaria y se consultaron las reservas. Se probaron las opciones de cancelar y finalizar. | Las reservas se mostraron correctamente y sus estados se actualizaron en la base de datos. |
| Modo de visualización | Se probó el cambio entre modo claro y modo oscuro. | Ambos modos funcionaron correctamente. |

Las pruebas realizadas fueron manuales, utilizando el sistema desde el navegador y comprobando las respuestas del backend y los datos almacenados en Supabase.

No se implementaron pruebas automatizadas.

## Posibles errores

### El backend no inicia

Comprobar que las dependencias estén instaladas y que se esté ejecutando el comando desde la carpeta `backend`.

```bash
npm install
node server.js
```

### Error al conectar con Supabase

Verificar que el archivo `.env` exista dentro de la carpeta `backend` y que los valores de `SUPABASE_URL` y `SUPABASE_KEY` sean correctos.

### No se cargan las computadoras

Comprobar que el backend esté funcionando y que la tabla `computadoras` tenga registros.

### No se pueden realizar reservas

Verificar que el usuario haya iniciado sesión, que los datos seleccionados sean correctos y que la computadora no tenga una reserva activa para esa fecha y horario.

## Manual de usuario

### Estudiante

1. Ingresar al sistema.
2. Si todavía no tiene una cuenta, seleccionar la opción de registro.
3. Completar los datos solicitados.
4. Iniciar sesión.
5. Seleccionar la fecha en la que desea reservar.
6. Elegir un carrito y un horario.
7. Seleccionar una computadora disponible.
8. Confirmar la reserva.

### Bibliotecaria

1. Iniciar sesión con una cuenta que tenga el rol de bibliotecaria.
2. Ingresar a la sección de administración.
3. Consultar las reservas realizadas.
4. Seleccionar la acción correspondiente para cancelar o finalizar una reserva.

## Publicación del proyecto

Actualmente, el sistema se ejecuta de manera local.

Para utilizarlo desde otros dispositivos será necesario publicar el backend y configurar las direcciones de conexión del frontend para que apunten al servidor publicado.