import { getSolicitudes, patchSolicitudes } from "../services/ServicesSolicitudes.js";

//Constantes de menú
const inicio = document.getElementById("inicio");
const historial = document.getElementById("historial");
const pendientes = document.getElementById("pendientes");
const registro = document.getElementById("registro");
const cerrar = document.getElementById("cerrar")
const contenido = document.getElementById("contenido")
//Constantes de contenedores
const inicioContenedor = document.getElementById("inicioContenedor")
const historialContenedor = document.getElementById("historialContenedor")
const pendientesContenedor = document.getElementById("pendientesContenedor")
const registroContenedor = document.getElementById("registroContenedor")
//Constantes para menú pendientes
const listaTabla = document.getElementById("listaPendientes")
//Constantes para menú registro
const registrarse = document.getElementById("registrarse");

function ocultarTodo() {
  inicioContenedor.classList.add("oculto");
  historialContenedor.classList.add("oculto");
  pendientesContenedor.classList.add("oculto");
  registroContenedor.classList.add("oculto");
}

///////Comienza Menú Inicio///////
inicio.addEventListener("click", () => { 
  ocultarTodo();    
  inicioContenedor.classList.remove("oculto");

});
///////Termina Menú Inicio///////


///////Comienza Menú historial///////
historial.addEventListener("click", () => {
    ocultarTodo();
    historialContenedor.classList.remove("oculto");

});
///////Termina Menú Historial///////


///////Comienza Menú pendientes///////
pendientes.addEventListener("click", async () => { 
    ocultarTodo();
    pendientesContenedor.classList.remove("oculto");

     try {
        const todasSolicitudes = await getSolicitudes();

        // Filtrar solicitudes pendientes
        const pendientesList = todasSolicitudes.filter(solicitud => solicitud.estado === "pendiente");

        // Mostrar en pantalla
        mostrarSolicitudesPendientes(pendientesList);
        console.log(pendientesList);
        

    } catch (error) {
        console.error("Error al obtener solicitudes:", error);
        Toastify({
            text: "Error al cargar solicitudes pendientes",
            duration: 3000
        }).showToast();
    }

});

function mostrarSolicitudesPendientes(lista) {
            listaTabla.innerHTML = ""; // limpiar antes de mostrar

    lista.forEach(solicitud => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${solicitud.idSolicitante}</td>
            <td>${solicitud.sede}</td>
            <td>${solicitud.fecha_salida}</td>
            <td>${solicitud.fecha_entrada}</td>
            <td>${solicitud.cod_pc}</td>
            <td>
                <button type="button" class="aprobar">Aprobar</button>
                <button type="button" class="denegar">Denegar</button>
                <p class="id-solicitud" style="display:none">${solicitud.id}</p>
            </td>
        `;

        listaTabla.appendChild(fila);
    });

    // Asignar eventos a los botones Aprobar
    listaTabla.querySelectorAll(".aprobar").forEach(boton => {
        boton.addEventListener("click", () => {
            const idSolicitud = boton.parentElement.querySelector(".id-solicitud").textContent;
            cambiarEstado(idSolicitud, "aprobada");
        });
    });

    // Asignar eventos a los botones Denegar
    listaTabla.querySelectorAll(".denegar").forEach(boton => {
        boton.addEventListener("click", () => {
            const idSolicitud = boton.parentElement.querySelector(".id-solicitud").textContent;
            cambiarEstado(idSolicitud, "denegada");
        });
    });
}

// Función para cambiar el estado de una solicitud usando patchSolicitudes
async function cambiarEstado(id, nuevoEstado) {
        try {
        await patchSolicitudes({ estado: nuevoEstado }, id);

        Toastify({
            text: `Solicitud ${nuevoEstado}`,
            duration: 3000
        }).showToast();

        // Refrescar la lista de pendientes directamente sin hacer click
        const todasSolicitudes = await getSolicitudes();
        const pendientesList = todasSolicitudes.filter(solicitud => solicitud.estado === "pendiente");
        mostrarSolicitudesPendientes(pendientesList);

    } catch (error) {
        console.error("Error al cambiar el estado de la solicitud:", error);
        Toastify({
            text: "Error al actualizar la solicitud",
            duration: 3000
        }).showToast();
    }
}
///////Termina Menú Pendientes///////


///////Comienza Menú registro///////
registro.addEventListener("click", () => { 
    ocultarTodo();
    registroContenedor.classList.remove("oculto");
});
///////Termina Menú registro///////


///////Comienza Menú cerrar///////
cerrar.addEventListener("click", () => { 
    Toastify({
            text: "Cerraste la sesión",
            duration: 3000
    }).showToast();
    window.location.href = "../pages/login.html";
});
///////Termina Menú cerrar///////
