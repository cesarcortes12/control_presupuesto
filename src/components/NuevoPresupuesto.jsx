import React from 'react'
import { useState } from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto,setPresupuesto,setIsValidPresupuesto}) => {

    const [mensaje, setMensaje]= useState('')


    const handlePresupuesto =(e) =>{
        e.preventDefault();
        console.log("enviando presupuesto")

        if(!presupuesto || presupuesto<0){
            setMensaje('no es un presupuesto valido')

            return ;
        }

        setMensaje("")
        setIsValidPresupuesto(true)
        
    }



  return (
    <div className='contenedor-presupuesto sombra'>
        
        <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                <label>Definir Presupuesto</label>
                <input 
                    className='nuevo-presupuesto'
                    type='number'
                    placeholder='Agrega Tu Presupuesto'
                    value={presupuesto}
                    onChange={ (e) => setPresupuesto(Number(e.target.value))}
                 />
            </div>
            <input type="submit" value='Agregar' />

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            
        </form>
        
    </div>
    // en la sintaxis de arriba el && es como un ternario y tipo es un valor que se va por prop
    //al componente y alla lo tratan como una clase 
  )
}

export default NuevoPresupuesto