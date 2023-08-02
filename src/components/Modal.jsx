import { useState,useEffect } from 'react'
import Mensaje from './Mensaje';
import cerrarBtn from '../img/cerrar.svg'
import { object } from 'prop-types';

const Modal = ({ setModal, animarModal, setAnimarModal,guardarGasto,gastoEditar,setGastoEditar }) => {
    /*estos hooks los sincronizamos con los label para irlos llenando con lo que el usuario le
    vaya ingresando mirar abajo en los label como se sincroniza*/
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje,setMensaje]=useState("")
    const [id,setId]=useState('')
    const [fecha,setFecha]=useState('')
    
    useEffect(()=>{ //escuchando si hay cambios en el objeto y si tiene algo le asignamos los valores 
        if(Object.keys(gastoEditar).length>0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    },[])
    
    
    const ocultarModal = () => {

        setAnimarModal(false)
        setGastoEditar({}) //al cerrar el modal se limpia el state
        setTimeout(() => {
            setModal(false)
        }, 500);

    }

    const handleSubmit=( (e) => {
        e.preventDefault()
        if([nombre,cantidad,categoria].includes("")){
            setMensaje('todos los campos son obligatorios')
            setTimeout(() => { //despues de 3 segundos el mensaje desaparece
                setMensaje("")
            }, 3000);
            return;
        }
        
        guardarGasto({nombre,cantidad,categoria,id,fecha})
    })



    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img
                    src={cerrarBtn}
                    alt="btnCerrarModal"
                    onClick={ocultarModal}
                />
            </div>

            <form
                className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
                onSubmit={handleSubmit}
            >
                <legend >
                    { gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto" }
                </legend>
                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        id='nombre'
                        type="text"
                        placeholder='Agregar Un Gasto'
                        value={nombre} //es el nombre de la variable para asociarlo al input
                        onChange={(e) => setNombre(e.target.value)} //obtenemos el valor que se escribe para que lo mande al state
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id='catidad'
                        type="number"
                        placeholder='Agregar La Cantidad Del Gasto ejemplo 300'
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">categoria</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >

                        <option value="">-- seleccione --</option>
                        <option value="Ahorro">Ahorro</option>
                        <option value="Comida">Comida</option>
                        <option value="Casa">Casa</option>
                        <option value="GastosVarios">Gasto Varios</option>
                        <option value="Ocio">Ocio</option>
                        <option value="Salud">Salud</option>
                        <option value="Suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input
                    type="submit"
                    value={gastoEditar.nombre ? "Guardar Cambios" : "Nuevo Gasto"}
                />


            </form>
        </div>
    )
}

export default Modal