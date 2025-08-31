//Constantes de menú
const inicio = document.getElementById("inicio");
const historial = document.getElementById("historial");
const pendientes = document.getElementById("pendientes");
const registro = document.getElementById("registro");
const cerrar = document.getElementById("cerrar")
const contenido = document.getElementById("contenido")
//Constantes de contenedores
const inicioContenedor = document.getElementById("inicioContenedor")
const historialContenedor = document.getElementById("historialContenedor")
const pendientesContenedor = document.getElementById("pendientesContenedor")
const registroContenedor = document.getElementById("registroContenedor")
//Botón de registro de nuevo administrador
const registrarse = document.getElementById("registrarse");

function ocultarTodo() {
  inicioContenedor.classList.add("oculto");
  historialContenedor.classList.add("oculto");
  pendientesContenedor.classList.add("oculto");
  registroContenedor.classList.add("oculto");
}

///////Comienza Menú Inicio///////
inicio.addEventListener("click", () => { 
  ocultarTodo();
  inicioContenedor.classList.remove("oculto");

});
///////Termina Menú Inicio///////


///////Comienza Menú historial///////
historial.addEventListener("click", () => {
    ocultarTodo();
    historialContenedor.classList.remove("oculto");

});
///////Termina Menú Historial///////


///////Comienza Menú pendientes///////
pendientes.addEventListener("click", () => { 
    ocultarTodo();
    pendientesContenedor.classList.remove("oculto");
});
///////Termina Menú Historial///////


///////Comienza Menú registro///////
registro.addEventListener("click", () => { 
    ocultarTodo();
    registroContenedor.classList.remove("oculto");
});
///////Termina Menú registro///////


///////Comienza Menú cerrar///////
cerrar.addEventListener("click", () => { 
    Toastify({
            text: "Cerraste la sesión",
            duration: 3000
    }).showToast();
    window.location.href = "../pages/login.html";
});
///////Termina Menú cerrar///////
