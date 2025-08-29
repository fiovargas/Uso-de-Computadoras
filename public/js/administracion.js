const inicio = document.getElementById("inicio");
const historial = document.getElementById("historial");
const aprobacion = document.getElementById("aprobacion");
const registroAdmi = document.getElementById("registroAdmi");
const cerrar = document.getElementById("cerrar");

// Funciones de redirección
inicio.addEventListener("click", () => {
    window.location.href = "../pages/administracion.html";
});

historial.addEventListener("click", () => {
    window.location.href = "../pages/historial.html";
});

aprobacion.addEventListener("click", () => {
    window.location.href = "../pages/aprobacion.html";
});

registroAdmi.addEventListener("click", () => {
    window.location.href = "../pages/registroAdmi.html";
});

cerrar.addEventListener("click", () => {
    Toastify({
            text: "Cerraste la sesión",
            duration: 3000
    }).showToast();
    window.location.href = "../pages/login.html";
});