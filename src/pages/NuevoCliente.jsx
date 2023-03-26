import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Error from "../components/Error";
import Formulario from "../components/Formulario";
import { agregarNuevoCliente } from "../api/clientes";

export async function action({ request }) {
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

  await agregarNuevoCliente(data);

  return redirect('/');
}

const NuevoCliente = () => {
  const navigate = useNavigate();
  const errores = useActionData();
  
  return (
    <div>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo cliente
      </p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white p-3 py-1"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10">
        {errores?.length && errores.map((error, i)=> (<Error key={i}>{error}</Error>) )}
        <Form method="post" noValidate>
          <Formulario />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Registrar nuevo cliente"
          />
        </Form>
      </div>
    </div>
  );
};

export default NuevoCliente;
