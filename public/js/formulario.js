const siguiente = document.getElementById("Siguente");
const id = document.getElementById("id");
const sede = document.getElementById("sede");
const salida = document.getElementById("salida");
const regreso = document.getElementById("regreso");
const codigo = document.getElementById("codigo");

siguiente.addEventListener("click", function() {

    const valorID = id.value.trim();
    const valorSede = sede.value;
    const valorSalida = salida.value;
    const valorRegreso = regreso.value;
    const valorCodigo = codigo.value.trim();

    if (valorID && valorSede && valorSalida && valorRegreso && valorCodigo) {
        Toastify({
            text: "Formulario guardado con exito",
            duration: 3000
        }).showToast();

        limpiarCampos();

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
    id.value = "";
    sede.value = "";
    salida.value = "";
    regreso.value = "";
    codigo.value = "";
};