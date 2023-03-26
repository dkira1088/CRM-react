export async function obtenerClientes (){
    const url = import.meta.env.VITE_API_URL;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    return resultado;
}

export async function agregarNuevoCliente(datos){
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method:'POST',
            body:JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await respuesta.json();
    } catch (error) {
        console.log(error);
    }
}

export async function obtenerCliente(id) {
    const url = import.meta.env.VITE_API_URL+'/'+id;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    return resultado;
}

export async function editarCliente(id, datos) {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method:'PUT',
            body:JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await respuesta.json();
    } catch (error) {
        console.log(error);
    }
}

export async function eliminarCliente(id) {
   try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method:'DELETE'
    });

    await respuesta.json();
   } catch (error) {
    console.log(error);
   }
}