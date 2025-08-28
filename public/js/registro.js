import{getUsers, postUsers, deleteUsers, putUsers} from "../services/ServicesUser.js"

const usuario = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmarPassword = document.getElementById("confirmarPassword");
const registrarse = document.getElementById("registrarse");
const seleccionador = document.getElementById("seleccionador");


registrarse.addEventListener("click", async function () {

if (password.value !== confirmarPassword.value) {
    Toastify({
        text: "Las contraseñas no coinciden",
        duration: 3000
    }).showToast();

    return;
};
    console.log(seleccionador.value);
    
    const Regis = {
        usuario:usuario.value,
        email:email.value,
        password:password.value,
        tipoUser:seleccionador.value
    };

    console.log(Regis);
    
    const respuesta = await postUsers(Regis);

    console.log(respuesta);

     Toastify({
        text: "Registro guardado con exito",
        duration: 3000
    }).showToast();

    limpiarCampos();

     setTimeout(() => {
        window.location.href = "../pages/login.html";
    }, 3000);
});

function limpiarCampos() {
    usuario.value = "";
    email.value = "";
    password.value = "";
    confirmarPassword.value = "";
    seleccionador.value = "";
};

