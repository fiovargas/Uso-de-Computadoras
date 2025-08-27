export { getUsers, postUsers, deleteUsers, putUsers };


async function getUsers() { //Función para Get
    
    try {
        
        const response = await fetch('http://localhost:3001/Usuarios', {
            method: 'GET',
            headers :{
                'Content-Type': 'application/json'
            }    
        })

        const users = await response.json();

        return users    
        
    } catch (error) {

        console.error("Existe un error al obtener los usuarios", error)
        throw error
    }
}


async function postUsers(Usuarios) { //Función para Post
    
    try {
        
        const response = await fetch('http://localhost:3001/Usuarios', {
            method: 'POST',
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(Usuarios)     
        });

        const users = await response.json();

        return users    
        
    } catch (error) {

        console.error("Existe un error al crear los usuarios", error)
        throw error
    }
}


async function deleteUsers(id) { //Función para Delete
    
    try {
        
        const response = await fetch('http://localhost:3001/Usuarios/'+id, {
            method: 'DELETE',
            headers :{
                'Content-Type': 'application/json'
            },   
        });

        const users = await response.json();

        return users    
        
    } catch (error) {

        console.error("Existe un error al eliminar los usuarios", error)
        throw error
    }
}


async function putUsers(Usuarios,id) { //Función para put
    
    try {
        
        const response = await fetch('http://localhost:3001/Usuarios/'+id, {
            method: 'PUT',
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(Usuarios)    
        });

        const users = await response.json();

        return users    
        
    } catch (error) {

        console.error("Existe un error al editar los usuarios", error)
        throw error
    }
}

