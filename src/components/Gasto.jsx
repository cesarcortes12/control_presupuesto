import React from 'react'
//elementos para hacer el deslizable de la edicion y eliminacion
import {LeadingActions, //efecto hacia la izquierda  
        SwipeableList,
        SwipeableListItem,
        SwipeAction,
        TrailingActions  //efecto hacia la derecha
}from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"
import {fomatearFecha, formatearPresupuesto} from '../helpers'

import IconoAhorro from'../img/icono_ahorro.svg'
import IconoCasa from'../img/icono_casa.svg'
import IconoComida from'../img/icono_comida.svg'
import IconoGastos from'../img/icono_gastos.svg'
import IconoOcio from'../img/icono_ocio.svg'
import IconoSalud from'../img/icono_salud.svg'
import IconoSuscripciones from'../img/icono_suscripciones.svg'

const diccionarioIconos={ //con este objeto relacionamos los iconos con la categoria
  Ahorro: IconoAhorro,
  Comida: IconoComida,
  Casa: IconoCasa,
  GastosVarios: IconoGastos,
  Ocio:  IconoOcio,
  Salud: IconoSalud,
  Suscripciones: IconoSuscripciones
}

const Gasto = ({gasto,setGastoEditar,eliminarGasto}) => {
  const {categoria,nombre,cantidad,id,fecha}=gasto;
  const leadingActions =() =>( //no hay llaves sino parentesis que actuan como un return
  //esta sintaxis es obligatoria
    <LeadingActions> 
        <SwipeAction onClick={()=>setGastoEditar(gasto)}>
          Editar
        </SwipeAction>
    </LeadingActions>
  )
  const trailingActions =() =>(
    <TrailingActions>
      <SwipeAction 
        onClick={()=>eliminarGasto(id)}
        destructive={true} //este prop viene con el swipe
        >
          Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra'>
            <div className='contenido-gasto'>
                <img 
                  src={diccionarioIconos[categoria]} //imprimimos el objeto segun la categoria
                  alt="Icono_Gasto" 
                />
                <div className='descripcion-gasto'>
                    <p className='categoria'>{categoria}</p>
                    <p className='nombre-gasto'>{nombre}</p>
                    <p className='fecha-gasto'>
                      Agregado el : {''}
                      <span>{fomatearFecha(fecha)}</span>
                    </p>
                </div>
            </div>
            <p className='cantidad-gasto'>{formatearPresupuesto(cantidad)}</p> 
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto