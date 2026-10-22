# Sistema de Reserva de Computadoras

## Descripción

Este proyecto busca organizar las reservas de computadoras de la biblioteca de la EESTN°1. La idea es reemplazar las anotaciones en papel por un sistema web que permita administrar las reservas de forma más sencilla y evitar errores.

## Objetivos

* Organizar las reservas de computadoras.
* Permitir que los estudiantes elijan una fecha, un horario y una computadora.
* Facilitar el trabajo del bibliotecario.
* Evitar que una computadora se reserve dos veces en el mismo horario.

## Funciones del sistema

El prototipo cuenta con las siguientes pantallas:

* **Inicio de sesión:** permite ingresar al sistema de prueba.
* **Reservas:** permite elegir la fecha, el carrito, el horario y la computadora.
* **Confirmación:** muestra los datos de la reserva.
* **Administración:** tiene una pantalla para gestionar las reservas.

Estas funciones todavía necesitan conectarse con el backend y la base de datos para funcionar de manera completa.

## Tecnologías utilizadas

* HTML
* CSS
* JavaScript
* Supabase (PostgreSQL)
* Git y GitHub

## Base de datos

La base de datos se creó en Supabase y cuenta con tres tablas principales:

* **usuarios:** guarda los datos de los usuarios y sus roles.
* **computadoras:** registra las computadoras y el carrito al que pertenecen.
* **reservas:** guarda los datos de las reservas, las fechas y los horarios.

## Organización del proyecto

```text
Equipo2Grupo126/
├── frontend/
│   ├── login.html
│   ├── reservas.html
│   ├── confirmacion.html
│   ├── admin.html
│   ├── css/
│   │   ├── style.css
│   │   ├── login.css
│   │   ├── reservas.css
│   │   ├── confirmacion.css
│   │   └── admin.css
│   └── js/
│       ├── login.js
│       ├── reservas.js
│       ├── confirmacion.js
│       └── admin.js
├── backend/
├── hitos/
├── docs/
└── README.md
```

## Estado del proyecto

El frontend tiene las pantallas principales y permite probar el proceso de una reserva. La base de datos también está creada en Supabase.

Queda pendiente conectar el frontend con el backend, implementar el inicio de sesión real y completar la gestión de las reservas.

## Integrantes

Proyecto realizado por el equipo de trabajo de la Escuela Técnica N.º 1.
