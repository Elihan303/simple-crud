import { React, useState } from "react";
import { nanoid } from "nanoid";

const App = () => {
  //states
  const[tarea,setTarea]=useState('')
  const[tareas,setTareas]=useState([])
  const[modoEditar,setModoEditar]=useState(false)
  const[id,setId]=useState('')
  const[error,setError]=useState(null)


  //save data
  const saveData=(e)=>{
    e.preventDefault()
    //validar
    if(!tarea.trim()){
      setError('Escriba algo por favor')
      return
    }
    //savedata
    setTareas([...tareas,{id: nanoid(10), nombreTarea: tarea}])
    //clear 
    e.target.reset()
    setTarea('')
    setError(null)
  }

  //delete data
  const deleteData = (id) => {
    const NewArray= tareas.filter(item=> item.id!== id)
    setTareas(NewArray)
  }

  //Activate Edit
  const ActivateEdit=(item)=>{
    setModoEditar(true)
    setTarea(item.nombreTarea)
    setId(item.id) 
  }


  //updateData
  const updateData=(e)=>{
    e.preventDefault()
    //validar
    if(!tarea.trim()){
      setError('Escriba algo por favor')
      return
    }

    //edit
    const EditArray= tareas.map(
      item => item.id === id ? {id:id, nombreTarea:tarea} : item
    )
    setTareas(EditArray)

    //clear
    setModoEditar(false)
    setTarea('')
    setId('')
    setError(null) 

  }



  //HTML
  return (
    <div className="container mt-5">
      <h1 className="text-center">Simple CRUD</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-start">Lista de tareas</h4>
           <ul className="list-group">
             {
             tareas.length === 0 ?
             (<li className="list-group-item"> No hay tareas </li>):(
             tareas.map((item)=>
             <li key={item.id} className="list-group-item">
               <span className="lead fw-bold">{item.nombreTarea}</span>
               <button className="btn btn-danger btn-sm float-end mx-2"
               onClick={()=>deleteData(item.id)}
               >Eliminar</button>
               <button className="btn btn-warning btn-sm float-end mx-1"
               onClick={()=>ActivateEdit(item)}
               >Editar</button>
             </li> 
               )
              )  
             }
           </ul>
        </div>
        <div className="col-4">
          <h4 className="text-start">{
            modoEditar ? 'Editar tarea' : 'Agregar tarea'
          }</h4>
          <form onSubmit={modoEditar ? updateData : saveData}>
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <input 
            type="text" 
            placeholder="Ingrese tarea" 
            className="form-control my-2"
            onChange={(e)=> setTarea(e.target.value)}
            value={tarea} 
            />
            {modoEditar?(
              <button className="btn btn-warning btn-block" type="submit">Editar</button>
            ):(
              <button className="btn btn-dark btn-block" type="submit">Agregar</button>
            )}
          </form>


        </div>
      </div>
    </div>
  );
};

export default App;
