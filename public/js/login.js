import { getUsers } from "../services/ServicesUser.js";

const correo = document.getElementById("correo")
const contraseña = document.getElementById("contraseña")
const ingresar = document.getElementById("ingresar")

ingresar.addEventListener("click",async function () {
const email = correo.value.trim();
    const pass = contraseña.value.trim();

    // Validar campos vacíos
    if (!email || !pass) {
        Toastify({
            text: "Debes completar todos los campos.",
            duration: 3000
        }).showToast();
        return;
    }

    try {
        // Obtener todos los usuarios
        const usuarios = await getUsers();

        // Verificar si hay coincidencia
        const usuario = usuarios.find(u => u.correo === email && u.password === pass);

        if (usuario) {
            window.location.href = "formulario.html"; // Si hay coincidencia, redirige
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
