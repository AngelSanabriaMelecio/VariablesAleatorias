import React, { useEffect, useRef, useState } from "react";
import { AppBar } from "../components/AppBar";
import { RandomGenerator } from "../components/RandomGenerator";
import { useApp } from "../Context/AppContext";

export const UniformeView = () => {

    const limInfRef = useRef()
    const limSupRef = useRef()

    const [observaciones, setObservaciones] = useState([])
    const { random } = useApp()


    // useEffect(() => {
    //     limInfRef.current.value = 0;
    //     limSupRef.current.value = 0;
    // }, [])



    function calculate() {
        let p1 = Number(limInfRef.current.value)
        let p2 = Number(limSupRef.current.value)

        if (p1 >= p2) {
            alert('Limites no válidos')
            return
        }

        let newobs = []
        random.forEach((ran, i) => {
            let r = Number(ran)
            let VA = p1 + (p2 - p1) * r

            newobs.push({ index: i + 1, ri: r, VA: VA })
        })
        setObservaciones(newobs)
    }

    return (
        <>
            {/*Info*/}
            <div className="p-8">
                <h1 className="text-4xl italic font-serif">Distribución Uniforme</h1>
                <p className="font-sans text-lg mt-2">
                    La distribución uniforme es útil para describir una 
                    variable aleatoria con probabilidad constante sobre 
                    el intervalo (a,b).
                </p>
                <br />
                <hr />
            </div>
            <div className="flex flex-row width-full">
                {/****************************************     Col1    ***************************************/}
                <div className="w-1/3">
                    <RandomGenerator />
                </div>
                {/***********************************************************************************************/}
                <div className="flex flex-col w-1/3 text-center">
                    <p className="text-center text-xl my-2 font-serif">Rango de la Variable</p>
                    <div className="flex flex-row">
                        <div className="flex w-full flex-col border">
                            <input
                                onFocus={(e) => { e.target.select() }}
                                ref={limInfRef}
                                className="w-full text-center focus:outline-none transition-opacity focus:bg-gray-200" type="number" 
                                placeholder="Limite Inferior"
                                />
                        </div>
                        <div className="flex w-full flex-col border">
                            <input
                                onFocus={(e) => { e.target.select() }}
                                ref={limSupRef}
                                className=" w-full text-center focus:outline-none transition-opacity focus:bg-gray-200" type="number" 
                                placeholder="Limite Superior"
                                />
                        </div>
                    </div>
                    <button
                        onClick={calculate}
                        className='w-full p-2 font-bold text-white bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-200'>
                        Calcular
                    </button>
                </div>
                {/***********************************************************************************************/}
                <div className="w-1/3">
                    <p className="text-center text-xl my-2 font-serif">Resultado</p>
                    {observaciones.length > 0 && <table className="w-full">
                        <thead>
                            <tr className="text-center border">
                                <th>#</th>
                                <th>r<sub>i</sub></th>
                                <th>Variable A.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {observaciones.map(o => <tr className="text-center border" key={'O' + o.index}>
                                <td>
                                    {o.index}
                                </td>
                                <td>
                                    {o.ri}
                                </td>
                                <td>
                                    {(o.VA).toFixed(4)}
                                </td>
                            </tr>)}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}