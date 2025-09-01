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
//Constantes para menú historial
const listaHistorial = document.getElementById("listaHistorial");
const buscadorHistorial = document.getElementById("buscadorHistorial");

function ocultarTodo() {
  inicioContenedor.classList.add("oculto");
  historialContenedor.classList.add("oculto");
  pendientesContenedor.classList.add("oculto");
  registroContenedor.classList.add("oculto");
}

///////Comienza Menú Inicio///////
inicio.addEventListener("click", () => { 
  /* ocultarTodo();  */   
  /* inicioContenedor.classList.remove("oculto"); */
    inicioContenedor.style.display = "block"
    historialContenedor.style.display = "none"
    pendientesContenedor.style.display = "none"
    registroContenedor.style.display = "none"
});
///////Termina Menú Inicio///////


///////Comienza Menú historial///////
historial.addEventListener("click", async () => {
    /* ocultarTodo(); */
    /* historialContenedor.classList.remove("oculto"); */
    inicioContenedor.style.display = "none"
    historialContenedor.style.display = "block"
    pendientesContenedor.style.display = "none"
    registroContenedor.style.display = "none"

    try {
        const solicitudes = await getSolicitudes();
        mostrarHistorial(solicitudes);

        // Filtro en tiempo real
        buscadorHistorial.addEventListener("input", () => {
            const texto = buscadorHistorial.value.toLowerCase();
            const filtradas = solicitudes.filter(s =>
                s.idSolicitante.toLowerCase().includes(texto) ||
                s.fecha_salida.toLowerCase().includes(texto) ||
                s.fecha_entrada.toLowerCase().includes(texto) ||
                s.estado.toLowerCase().includes(texto)
            );
            mostrarHistorial(filtradas);
        });

    } catch (error) {
        console.error("Error al obtener historial:", error);
        Toastify({
            text: "Error al cargar historial",
            duration: 3000
        }).showToast();
    }
});

function mostrarHistorial(lista) {
    listaHistorial.innerHTML = lista.map(solicitud => `
        <tr>
            <td>${solicitud.idSolicitante}</td>
            <td>${solicitud.fecha_salida}</td>
            <td>${solicitud.fecha_entrada}</td>
            <td>${solicitud.cod_pc}</td>
            <td>${solicitud.estado}</td>
        </tr>
    `).join("");
}
///////Termina Menú Historial///////


///////Comienza Menú pendientes///////
pendientes.addEventListener("click", async () => { 
    /* ocultarTodo(); */
    /* pendientesContenedor.classList.remove("oculto"); */

    inicioContenedor.style.display = "none"
    historialContenedor.style.display = "none"
    pendientesContenedor.style.display = "block"
    registroContenedor.style.display = "none"

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
    
    inicioContenedor.style.display = "none"
    historialContenedor.style.display = "none"
    pendientesContenedor.style.display = "block"
    registroContenedor.style.display = "none"

    lista.forEach(solicitud => {
        const fila = document.createElement("tr");
        
        const btnAprobar = document.createElement("button")
        const btnRechazar = document.createElement("button")
        btnAprobar.textContent = "Aprobar"
        btnAprobar.className = "aprobar"
        btnRechazar.textContent = "Rechazar"
        btnRechazar.className = "denegar"

        fila.innerHTML = `
            <td>${solicitud.idSolicitante}</td>
            <td>${solicitud.sede}</td>
            <td>${solicitud.fecha_salida}</td>
            <td>${solicitud.fecha_entrada}</td>
            <td>${solicitud.cod_pc}</td>
            <td class="botones"></td>
        `;
        const botones = fila.querySelector(".botones");
        botones.appendChild(btnAprobar)
        botones.appendChild(btnRechazar)
        listaTabla.appendChild(fila);

        btnAprobar.addEventListener("click", async () => {
            const editado = {"estado": "Aprobada"}
            await patchSolicitudes(editado, solicitud.id);

            // Refrescar la lista de pendientes directamente sin hacer click
            const todasSolicitudes = await getSolicitudes();
            const pendientesList = todasSolicitudes.filter(solicitud => solicitud.estado === "pendiente");
            inicioContenedor.style.display = "none"
            historialContenedor.style.display = "none"
            pendientesContenedor.style.display = "block"
            registroContenedor.style.display = "none"
            mostrarSolicitudesPendientes(pendientesList);
        });

        btnRechazar.addEventListener("click", async () => {
            const editado = {"estado": "Rechazada"}
            await patchSolicitudes(editado, solicitud.id);

            // Refrescar la lista de pendientes directamente sin hacer click
            const todasSolicitudes = await getSolicitudes();
            const pendientesList = todasSolicitudes.filter(solicitud => solicitud.estado === "pendiente");
            inicioContenedor.style.display = "none"
            historialContenedor.style.display = "none"
            pendientesContenedor.style.display = "block"
            registroContenedor.style.display = "none"
            /* mostrarSolicitudesPendientes(pendientesList); */
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
        inicioContenedor.style.display = "none"
        historialContenedor.style.display = "none"
        pendientesContenedor.style.display = "block"
        registroContenedor.style.display = "none"
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
    /* ocultarTodo(); */
    /* registroContenedor.classList.remove("oculto"); */
    inicioContenedor.style.display = "none"
    historialContenedor.style.display = "none"
    pendientesContenedor.style.display = "none"
    registroContenedor.style.display = "block"
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
