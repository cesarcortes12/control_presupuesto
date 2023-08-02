import React from 'react'


const Mensaje = ({children,tipo}) => {
  return (
    <div className={`alerta ${tipo}`}>{children}</div> 
    /*esta sintaxis significa que la clase tipo es una clase dinamica la alerta tiene unos estilos 
        y la de tipo segun sea de error o de confimacion tiene otra aprariencia es como si fuera 
        un constructor esta sintaxis por ejemplo le llega error y en la hoja de estilos hay una clase error
    */
  )
}

export default Mensaje