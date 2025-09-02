import { getSolicitudes, patchSolicitudes } from "../services/ServicesSolicitudes.js";
import { getUsers, postUsers } from "../services/ServicesUser.js";

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
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmarPassword = document.getElementById("confirmarPassword");
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
                s.estado.toLowerCase().includes(texto) ||
                 s.cod_pc.toLowerCase().includes(texto)
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
    inicioContenedor.style.display = "none"
    historialContenedor.style.display = "none"
    pendientesContenedor.style.display = "none"
    registroContenedor.style.display = "block"
    
});
registrarse.addEventListener("click", async function () {
    const nombre = name.value.trim();
    const correo = email.value.trim();
    const pass = password.value.trim();
    const confirmarPass = confirmarPassword.value.trim();

    // Validar campos vacíos
    if (!nombre || !correo || !pass || !confirmarPass) {
        Toastify({ 
            text: "Debes completar todos los campos", 
            duration: 3000 
        }).showToast();
        return;
    }

     if (usuario.value.trim().length < 3) {
        Toastify({
            text: "El nombre de usuario debe tener mínimo 3 caracteres",
            duration: 3000
        }).showToast();
        return;
    };
    
    // Validación correo (contenga @ y .)
    if (!email.value.includes("@") || !email.value.includes(".")) {
        Toastify({ text: "El correo debe contener 'ej: @gmail.com'", 
            duration: 3000 
        }).showToast();
        return;
    };

    if (password.value.length < 8) {
        Toastify({
            text: "La contraseña debe tener mínimo 8 caracteres",
            duration: 3000
        }).showToast();
        return;
    };

    // Validar contraseñas iguales
    if (pass !== confirmarPass) {
        Toastify({ 
            text: "Las contraseñas no coinciden", 
            duration: 3000 
        }).showToast();
        return;
    }

    try {
        // Verificar si ya existe el correo
        const usuarios = await getUsers();
        const existente = usuarios.find(user => user.email === correo);
        if (existente) {
            Toastify({ 
                text: "El correo ya está registrado", 
                duration: 3000 
            }).showToast();
            return;
        }

        // Crear nuevo usuario admin
        const nuevoAdmin = {
            usuario: nombre,
            email: correo,
            password: pass,
            typeUser: "admin" 
        };

        await postUsers(nuevoAdmin);

        Toastify({ 
            text: "Administrador registrado con éxito", 
            duration: 3000 
        }).showToast();

        // Limpiar campos
        name.value = "";
        email.value = "";
        password.value = "";
        confirmarPassword.value = "";

    } catch (error) {
        console.error("Error al registrar admin:", error);
        Toastify({ 
            text: "No se pudo registrar el administrador", 
            duration: 3000 
        }).showToast();
    }
});

///////Termina Menú registro///////


///////Comienza Menú cerrar///////
cerrar.addEventListener("click", () => { 

    localStorage.clear();
    
    Toastify({
        text: "Cerraste la sesión",
        duration: 3000
    }).showToast();

    if (!localStorage.getItem("usuarioActual")) {
        setTimeout(() => {
            window.location.href = "../pages/login.html";
        }, 1000);
    };
});

// Evitamos que vuelva con el botón atrás y ver caché
window.history.forward();
window.onunload = () => { null };
///////Termina Menú cerrar///////
