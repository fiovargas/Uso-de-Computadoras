async function postSolicitudes(Solicitudes) { //Función para Post
    
    try {
        
        const response = await fetch('http://localhost:3001/Solicitudes', {
            method: 'POST',
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(Solicitudes)
                    
        })

        const Solicitudes = await response.json()

        return Solicitudes    
        
    } catch (error) {

        console.error("Existe un error al crear la solicitud", error)
        throw error
        
    }
}

export{postSolicitudes}