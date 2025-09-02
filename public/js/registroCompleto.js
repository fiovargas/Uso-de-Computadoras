const cerrar = document.getElementById("cerrar");

cerrar.addEventListener("click", () => { 

    localStorage.clear();
    
    Toastify({
        text: "Sesión cerrada",
        duration: 3000
    }).showToast();

    if (!localStorage.getItem("usuarioActual")) {
        setTimeout(() => {
            window.location.href = "../pages/login.html";
        }, 1000);
    };
});

// Evitamos que vuelva con el botón atrás y ver caché
window.history.forward();
window.onunload = () => { null };