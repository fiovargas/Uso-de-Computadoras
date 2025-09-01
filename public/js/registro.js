// Importamos las funciones desde el archivo de servicios.
import{getUsers, postUsers, deleteUsers, putUsers} from "../services/ServicesUser.js"

const usuario = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmarPassword = document.getElementById("confirmarPassword");
const registrarse = document.getElementById("registrarse");

registrarse.addEventListener("click", async function () {

    // Verificamos si las contraseñas coinciden.
if (password.value !== confirmarPassword.value) {

    Toastify({
        text: "Las contraseñas no coinciden",
        duration: 3000
    }).showToast();
    return; // Si no coinciden, detenemos el registro.
};

 // Verificamos si el email ya está registrado.
const usuariosExistentes = await getUsers();
const emailExistente = usuariosExistentes.find(user => user.email === email.value);

    if (emailExistente) {
        Toastify({
            text: "Este correo ya está registrado",
            duration: 3000,
        }).showToast();
        return;
    }

// Verificamos si el nombre de usuario ya está registrado.        
const nombreUsuarioExistente = usuariosExistentes.find(user => user.usuario === usuario.value);
    if (nombreUsuarioExistente) {
        Toastify({
            text: "Este nombre de usuario ya está registrado",
            duration: 3000
        }).showToast();
        return;
    }

    if (usuario.value === "" || email.value === "" ||  password.value === "") {
        console.log("Los datos están incompletos");

        Toastify({
            text: "Los datos están incompletos",
            duration: 3000
        }).showToast();
        return;
        
    } else{
        // El botón se deshabilita después de validaciones correctas.
        registrarse.disabled = true;
        registrarse.textContent = "Registrando...";

        // Creamos un objeto con los datos ingresados.
        const Regis = {
            usuario:usuario.value,
            email:email.value,
            password:password.value,
            typeUser: "estudiante"
        };

        console.log(Regis); // Podemos ver en consola los datos a enviar

     setTimeout(() => {
        window.location.href = "../pages/login.html";
    }, 1000);

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

    }
});


// Función para limpiar los campos del formulario después del registro.
function limpiarCampos() {
    usuario.value = "";
    email.value = "";
    password.value = "";
    confirmarPassword.value = "";
};

