import { postSolicitudes } from "../services/ServicesSolicitudes.js";

const Siguiente = document.getElementById("Siguiente");
const sede = document.getElementById("sede");
const salida = document.getElementById("salida");
const regreso = document.getElementById("regreso");
const codigo = document.getElementById("codigo");

// Obtener el usuario automáticamente desde localStorage
const id_usuario_localstorage = localStorage.getItem("id_usuario");


Siguiente.addEventListener("click", async function() {
    const valorSede = sede.value;
    const valorSalida = salida.value;
    const valorRegreso = regreso.value;
    const valorCodigo = codigo.value.trim();

    if (valorSede && valorSalida && valorRegreso && valorCodigo) {
        
        // Validar fechas
        if (new Date(valorSalida) >= new Date(valorRegreso)) {
            Toastify({
                text: "La fecha de regreso debe ser posterior a la de salida",
                duration: 3000
            }).showToast();
            return;
        }

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
            text: "Los datos están incompletos",
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