import { getUsers } from "../services/ServicesUser.js";

const correo = document.getElementById("correo");
const contraseña = document.getElementById("contraseña");
const ingresar = document.getElementById("ingresar");

ingresar.addEventListener("click", async function () {
    const email = correo.value.trim();
    const pass = contraseña.value.trim();

    if (!email || !pass) { // Validar campos vacíos
        Toastify({
            text: "Debes completar todos los espacios vacios.",
            duration: 3000
        }).showToast();
        return;
    }

    try {
        // Obtener todos los usuarios
        const usuarios = await getUsers();

        // Verificar si hay coincidencia
        const usuario = usuarios.find(user => user.email === email && user.password === pass);

        if (usuario) {
            // Guardar datos del usuario en localStorage
            localStorage.setItem("id_usuario", usuario.id);
            localStorage.setItem("nombre_usuario", usuario.usuario);
            localStorage.setItem("typeUser", usuario.typeUser);

            Toastify({
                text: "Ingreso exitoso",
                duration: 3000
            }).showToast();

            limpiarCampos();

           setTimeout(() => { // no puedo pasarlo a admin
                if (usuario.typeUser === "admin") {
                    window.location.href = "../pages/administracion.html";

                } else if (usuario.typeUser === "estudiante") {
                    window.location.href = "../pages/formulario.html";
                    
                }
            }, 1500);

} else {
    Toastify({
        text: "Correo o contraseña incorrectos.",
        duration: 3000
    }).showToast();
}
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        Toastify({
            text: "No se pudo conectar al servidor.",
            duration: 3000
        }).showToast();
    }
});

function limpiarCampos() {
    correo.value = "";
    contraseña.value = "";
};
