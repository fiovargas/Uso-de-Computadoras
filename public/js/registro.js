import{getUsers, postUsers, deleteUsers, putUsers} from "../services/ServicesUser.js"

const usuario = document.getElementById("usuario");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmarPassword = document.getElementById("confirmarPassword");
const tipoUser = document.getElementById("tipoUser");
const estudiante = document.getElementById("estudiante");
const administrador = document.getElementById("administrador");
const registrarse = document.getElementById("registrarse");


registrarse.addEventListener("click", async function () {

if (password.value !== confirmarPassword.value) {
    Toastify({
        text: "Las contraseñas no coinciden",
        duration: 3000
    }).showToast();

    return;
};

    const Regis = {
        usuario:usuario.value,
        email:email.value,
        password:password.value,
        tipoUser:tipoUser.value
    };

    console.log(Regis);
    
    const respuesta = await postUsers(Regis);

    console.log(respuesta);

     Toastify({
        text: "Registro guardado con exito",
        duration: 3000
    }).showToast();

    return;

       /*  usuario.value = "",
        email.value = "",
        password.value = "",
        tipoUser.value = "" */
});