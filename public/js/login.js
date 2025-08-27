const urlUsuarios = "http://localhost:3000/usuarios";


document.getElementById("ingresar").addEventListener("click", async () => {
    const correo = document.getElementById("id").value.trim();
    const password = document.getElementById("contraseña").value.trim();

    if (!correo || !password) {
        alert("Debes completar todos los campos.");
        return;
    }

    try {
        // Consulta al servidor
        const response = await fetch(`${urlUsuarios}?correo=${correo}&password=${password}`);
        const usuarios = await response.json();

        // Verfica si hay concidencias 
        if (usuarios.length > 0) {
            const usuario = usuarios[0];
            
        // Guarda en el local storage
            localStorage.setItem("usuarioCorreo", usuario.correo);
            
        // Redirige a la página principal
            window.location.href = "formulario.html";
        } else {
            Toastify({
                text: "This is a toast",
                duration: 3000
            }).showToast();
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
        Toastify({
            text: "Error con las credenciales",
            duration: 3000
        }).showToast();
    }
});

