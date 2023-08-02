import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import Filtros from './components/Filtros'
import { generarId } from './helpers'  //este viene del index.js por ser index no se le especifica carpeta
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {
  const [presupuesto, setPresupuesto] = useState(
    //si hay un presupuesto en localStorage se lo asigna sino lo inicia con 0 esto enlazado con el effect del
    //localstorage
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  //state para guardar gastos
  const [gastos, setGastos] = useState( //mirar si en LS hay algo y asignarlo de lo contrario arreglo vacio
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );
  
  const [gastoEditar, setGastoEditar] = useState({}) //un state para la edicion del gasto

  const [filtro,setFiltro]= useState('') //state para filtrar la categoria 
  const [gastosFiltrados,setGastosFiltrados]=useState([]) //state para mostrar los gastos filtrados


  useEffect(() => { //al tener ya un gasto entonces misma animacion
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }

  }, [gastoEditar])

  //este effect es para almacenar el presupuesto en el local storage
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  //este Efect es para almacenar en LS los gastos recordar que como gastos es un objeto y hay varios
  //entonces se le pasa un JSON
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos]);


  //otro effect para cuando este ya el presupuesto no lo pida de nuevo al no pasar dependencias ejecuta 1 vez
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, []);

  //un effect para escuchar los cambios en filtro
  useEffect(() => {
    if (filtro){
      const gastosFiltrados=gastos.filter((gasto)=>gasto.categoria ===filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])
  

  

  //DECLARACION FUNCIONES

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  //creamos funcion para guardar gasto
  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //actualizamos
      //funcion para identificar el registro y actuar sobre el
      const gastosActualizados = gastos.map((gastoState) => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})// limpiamos el state
    } else {
      //nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }


    //se cierra la ventana
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id) //se trae todos menos el id especificado
    setGastos(gastosActualizados) // a los gasto le lleva todos menos el id especificado y los setea
  }
  //FIN DE FUNCIONES




  return (
    //esta clase es dinamica si el modal es true entonces a la clase se le agrga la clase fijar
    <div className={modal ? 'fijar' : ""}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        //fragment <>
        <>
          <main>

            <Filtros
               filtro={filtro}
               setFiltro={setFiltro}         
            />

            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto} //funcion
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
              
            />

          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt='icono nuevo gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (

        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}//aqui estamos pasando una funcion 
          gastoEditar={gastoEditar}//cuando se le da editar el objeto va lleno al modal
          setGastoEditar={setGastoEditar} //este solo lo paamos para lompiar el state

        />

      )}

    </div>
  )
}

export default App
