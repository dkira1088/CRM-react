import { useLoaderData, Form, useNavigate, redirect, useActionData } from "react-router-dom";
import { obtenerCliente, editarCliente} from "../api/clientes";
import Formulario from "../components/Formulario";
import Error from "../components/Error";

export async function loader({ params }) {
  const { id } = params;
  const cliente = await obtenerCliente(id);

  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No hay Resultados",
    });
  }

  return cliente;
}

export async function action ({request, params}){
    
    const {id} = params;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    const errores = [];
    const email = formData.get('email');
  
    if (Object.values(data).includes("")) {
      errores.push("todos los campos son obligatorios");
    }
  
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  
    if(!regex.test(email)){
      errores.push("El email no es valido");
    }
  
    if (Object.keys(errores).length > 0) {
      return errores;
    }

    await editarCliente(id, data);
    
    return redirect('/');
}

const EditarClientes = () => {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <div>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Llena todos los campos para editar un cliente</p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white p-3 py-1"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10">
        {errores?.length &&
        errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <Formulario cliente={cliente} />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Editar cliente"
          />
        </Form>
      </div>
    </div>
  );
};

export default EditarClientes;
