import React from "react";
import { firebase } from "./firebase";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Formulario() {
  const [lista, setLista] = React.useState([]);
  const [nombre, setNonbre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [id, setId] = React.useState("");
  const [modoEdicion, setModoEdicion] = React.useState(false);

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("usuarios").get();
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLista(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }, []);

  const guardarDatos = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert("Ingrese Nombre");
      return;
    }
    if (!apellido.trim()) {
      alert("Ingrese Apeliido");
      return;
    }
    try {
      const db = firebase.firestore();
      const personaNueva = { nombre, apellido };
      const dato = await db.collection("usuarios").add(personaNueva);
      setLista([...lista, { ...personaNueva, id: dato.id }]);
    } catch (error) {
      console.log(error);
    }
    setApellido("");
    setNonbre("");
  };
  const eliminar = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("usuarios").doc(id).delete();
      const listaFiltrada = lista.filter((elemento) => elemento.id !== id);
      setLista(listaFiltrada);
    } catch (error) {
      console.log(error);
    }
  };

  const editar = (elemento) => {
    setModoEdicion(true);
    setNonbre(elemento.nombre);
    setApellido(elemento.apellido);
    setId(elemento.id);
  };

  const auxEditar = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert("Ingrese Nombre");
      return;
    }
    if (!apellido.trim()) {
      alert("Ingrese Apeliido");
      return;
    }
    try {
      const db = firebase.firestore();
      await db.collection("usuarios").doc(id).update({
        nombre,
        apellido,
      });
      const listaEditada = lista.map((elemento) =>
        elemento.id === id ? { id, nombre, apellido } : elemento
      );
      setLista(listaEditada);
      setModoEdicion(false);
      setNonbre("");
      setApellido("");
      setId("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">
            {modoEdicion
              ? "Editar Persona"
              : "Registro De Personas"}
          </h2>
          <form onSubmit={modoEdicion ? auxEditar : guardarDatos}>
            <input
              type="text"
              placeholder="Ingrese Nombre"
              className="form-control mb-2"
              onChange={(e) => {
                setNonbre(e.target.value);
              }}
              value={nombre}
            />
            <input
              type="text"
              placeholder="Ingrese Apellido"
              className="form-control mb-2"
              onChange={(e) => {
                setApellido(e.target.value);
              }}
              value={apellido}
            />
            <div className="d-grid gap-2">
              {modoEdicion ? (
                <button className="btn btn-dark" type="submit">
                  Editar
                </button>
              ) : (
                <button className="btn btn-primary" type="submit">
                  Agregar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <br></br>
          <br></br>
          <h2 className="text-center">
            Personas Registradas
          </h2>
          <ul className="list-group">
            {lista.map((elemento) => (
              <li className="list-group-item " key={elemento.id}>
                {elemento.nombre} - {elemento.apellido}
                <button
                  className="btn btn-warning btn-sm fs-6 float-end m-2"
                  onClick={() => editar(elemento)}
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button
                  className="btn btn-danger btn-sm fs-6 float-end m-2"
                  onClick={() => eliminar(elemento.id)}>
                 <i class="bi bi-x-circle"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Formulario;
