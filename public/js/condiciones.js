const aceptacion = document.getElementById("aceptacion");
const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", function () {
    
     if (aceptacion.checked) {
         // El botón se deshabilita despues de un envío válido.
        btnEnviar.disabled = true;
        btnEnviar.textContent = "Enviando...";

            Toastify({
            text: "Formulario enviado con éxito",
            duration: 3000
        }).showToast();

        setTimeout(() => {
            window.location.href = "../pages/registroCompleto.html";
        }, 1000);

        } else {
            Toastify({
            text: "Debes aceptar las condiciones antes de enviar",
            duration: 3000
        }).showToast();
        }

        console.log(aceptacion);   
});