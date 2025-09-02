import { postSolicitudes } from "../services/ServicesSolicitudes.js";

const Siguiente = document.getElementById("Siguiente");
const sede = document.getElementById("sede");
const salida = document.getElementById("salida");
const regreso = document.getElementById("regreso");
const codigo = document.getElementById("codigo");
const cerrar = document.getElementById("cerrar")

// 🔹 Asignar fecha de salida = hoy y regreso = mañana
const hoy = new Date();
const mañana = new Date(hoy);
mañana.setDate(hoy.getDate() + 1);

// Formatear a YYYY-MM-DD
const formatoHoy = hoy.toISOString().split("T")[0];
const formatoMañana = mañana.toISOString().split("T")[0];

// Asignar valores automáticos
salida.value = formatoHoy;
regreso.value = formatoMañana;

// Bloquear edición
salida.readOnly = true;
regreso.readOnly = true;

Toastify({
    text: "Las fechas se asignaron automáticamente",
    duration: 2000
}).showToast();


// Obtener el usuario automáticamente desde localStorage
const id_usuario_localstorage = localStorage.getItem("id_usuario");


Siguiente.addEventListener("click", async function() {
    const valorSede = sede.value;
    const valorSalida = salida.value;
    const valorRegreso = regreso.value;
    const valorCodigo = codigo.value.trim();

    if (valorSede && valorSalida && valorRegreso && valorCodigo) {

        const formu = {
            idSolicitante: id_usuario_localstorage, // viene de localStorage
            sede: valorSede,
            fecha_salida: valorSalida,
            fecha_entrada: valorRegreso,
            cod_pc: valorCodigo,
            estado: "pendiente"
        }
        
        const respuestaSoli  = await postSolicitudes(formu)

        console.log(respuestaSoli);
        
        Siguiente.disabled = true;
        Siguiente.textContent = "Enviando...";

        Toastify({
            text: "Formulario guardado con éxito",
            duration: 3000
        }).showToast();

        setTimeout(() => {
            window.location.href = "../pages/condiciones.html";
        }, 2000);

    } else {
        Toastify({
            text: "Debes completar todos los espacios vacíos",
            duration: 3000
        }).showToast();  
    }
});

function limpiarCampos() {
    usuario.value = "";
    sede.value = "";
    salida.value = "";
    regreso.value = "";
    codigo.value = "";
};

cerrar.addEventListener("click", () => { 

    localStorage.clear();
    
    Toastify({
        text: "Sesión cerrada",
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