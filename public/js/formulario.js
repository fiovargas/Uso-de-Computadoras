const Siguiente = document.getElementById("Siguente");
const usuario = document.getElementById("usuario");
const sede = document.getElementById("sede");
const salida = document.getElementById("salida");
const regreso = document.getElementById("regreso");
const codigo = document.getElementById("codigo");

Siguiente.addEventListener("click", function() {

    const valorusuario = usuario.value.trim();
    const valorSede = sede.value;
    const valorSalida = salida.value;
    const valorRegreso = regreso.value;
    const valorCodigo = codigosede.value.value.trim();

    if (valorusuario && valorSede && valorSalida && valorRegreso && valorCodigo) {

        const formu = {
            idSolicitante: id_usuario_localstorage,
            sede: valorSede,
            fecha_salida: valorSalida,
            fecha_entrada: valorRegreso,
            cod_pc: valorCodigo
        }

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
    usuario.value = "";
    sede.value = "";
    salida.value = "";
    regreso.value = "";
    codigo.value = "";
};