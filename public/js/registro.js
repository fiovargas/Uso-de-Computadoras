// Importamos las funciones desde el archivo de servicios.
import{getUsers, postUsers, deleteUsers, putUsers} from "../services/ServicesUser.js"

const usuario = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmarPassword = document.getElementById("confirmarPassword");
const registrarse = document.getElementById("registrarse");
const seleccionador = document.getElementById("seleccionador");


registrarse.addEventListener("click", async function () {

    // Verificamos si las contraseñas coinciden.
if (password.value !== confirmarPassword.value) {
    Toastify({
        text: "Las contraseñas no coinciden",
        duration: 3000
    }).showToast();

    return; // Si no coinciden, detenemos el registro.
};
    console.log(seleccionador.value);
    
    // Creamos un objeto con los datos ingresados.
    const Regis = {
        usuario:usuario.value,
        email:email.value,
        password:password.value,
        tipoUser:seleccionador.value
    };

    console.log(Regis); // Podemos ver en consola los datos a enviar
    
     // Enviamos los datos al backend usando la función postUsers().
    const respuesta = await postUsers(Regis);

    console.log(respuesta); // Mostramos la respuesta del servidor.

    // Mostramos un mensaje de éxito.
     Toastify({
        text: "Registro guardado con exito",
        duration: 3000
    }).showToast();

    limpiarCampos(); // Limpiamos los campos del formulario

    setTimeout(() => {
        window.location.href = "../pages/login.html";
    }, 1000);
});

// Función para limpiar los campos del formulario después del registro.
function limpiarCampos() {
    usuario.value = "";
    email.value = "";
    password.value = "";
    confirmarPassword.value = "";
    seleccionador.value = "";
};