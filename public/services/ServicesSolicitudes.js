async function postSolicitudes(Solicitudes) { //Función para Post
    
    try {
        
        const response = await fetch('http://localhost:3001/Solicitudes', {
            method: 'POST',
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(Solicitudes)
                    
        })

        const Solicitud = await response.json()

        return Solicitud   
        
    } catch (error) {

        console.error("Existe un error al crear la solicitud", error)
        throw error
        
    }
}

export{postSolicitudes}

async function getSolicitudes() { //Función para Get
    
    try {
        
        const response = await fetch('http://localhost:3001/Solicitudes', {
            method: 'GET',
            headers :{
                'Content-Type': 'application/json'
            }
        })

        const Solicitud = await response.json()

        return Solicitud    
        
    } catch (error) {

        console.error("Existe un error al obtener las Solicitudes", error)
        throw error
        
    }
}

export{getSolicitudes}

async function putSolicitudes(Solicitudes,id) { //Función para put
    
    try {
        
        const response = await fetch('http://localhost:3001/Solicitudes/'+id, {
            method: 'PUT',
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(Solicitudes)
                    
        })

        const Solicitud = await response.json()

        return Solicitud    
        
    } catch (error) {

        console.error("Existe un error al editar las Solicitudes", error)
        throw error
        
    }
}

export{putSolicitudes}

async function patchSolicitudes(Solicitudes,id) { //Función para put
    
    try {
        
        const response = await fetch('http://localhost:3001/Solicitudes/'+id, {
            method: 'PATCH',
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(Solicitudes)
                    
        })

        const Solicitud = await response.json()

        return Solicitud    
        
    } catch (error) {

        console.error("Existe un error al editar las Solicitudes", error)
        throw error
        
    }
}

export{patchSolicitudes}