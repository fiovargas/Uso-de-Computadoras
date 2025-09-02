// Importamos las funciones desde el archivo de servicios.
import{getUsers, postUsers, deleteUsers, putUsers} from "../services/ServicesUser.js"

const usuario = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmarPassword = document.getElementById("confirmarPassword");
const registrarse = document.getElementById("registrarse");

registrarse.addEventListener("click", async function () {

    if (usuario.value === "" || email.value === "" ||  password.value === "") {
        console.log("Los datos están incompletos");

        Toastify({
            text: "Debes completar todos los espacios vacíos",
            duration: 3000
        }).showToast();
        return;
        
    };

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

    else{
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
            text: "Registro guardado con éxito",
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