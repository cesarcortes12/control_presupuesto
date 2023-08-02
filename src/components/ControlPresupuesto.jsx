
import { useEffect, useState } from "react"
import {formatearPresupuesto} from "../helpers/index.js"
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const ControlPresupuesto = ({ presupuesto, gastos,setGastos,setPresupuesto,setIsValidPresupuesto }) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje,setPorcentaje]=useState(0)


    useEffect(() => { //reduce tomas dos valores acumulado y la instancia donde va a iterar
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)//esto es un acumulador
        const totalDisponible = presupuesto - totalGastado
        //hacemos los calculos del porcentaje gastados
        const nuevoPorcentaje =(((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2);
       
        setGastado(totalGastado)
        setDisponible(totalDisponible)

        //alargamos un poco la animacion
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje) 
        }, 1500);
    }, [gastos])



    /*const formatearPresupuesto= (cantidad) => {
        return cantidad.toLocaleString('en-US' ,{
            style: 'currency',
            currency: 'USD'
        })
    }
*/

    const handleReset=(()=>{
        const pregunta = confirm('Deseas reiniciar todos los valores ?')

        if (pregunta){  //reiniciamos valores
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)

        }
    })

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                    styles={buildStyles({
                        pathColor: porcentaje>100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#B2A180',
                        textColor: porcentaje>100 ? '#DC2626' : '#3B82F6'
                    })}
                      
                />
            </div>

            <div className='contenido-presupuesto'>
                <button 
                    className="reset-app"
                    type="button"
                    onClick={handleReset}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto $</span> {formatearPresupuesto(presupuesto)}
                </p>
                <p className={`${disponible <0 ? 'negativo' : '' } `}>
                    <span>Disponible $</span> {formatearPresupuesto(disponible)}
                </p>
                <p>
                    <span>Gastado </span> {formatearPresupuesto(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto