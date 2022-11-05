import React, { useEffect, useRef, useState } from "react"
import { RandomGenerator } from "../components/RandomGenerator"
import { useApp } from "../Context/AppContext"


export const BernoulliView = () => {


    const pxTrueRef = useRef()
    const pxFlaseRef = useRef()
    const PXTrueRef = useRef()
    const PXFalseRef = useRef()

    const [observaciones, setObservaciones] = useState([])
    const { random } = useApp()


    function calculate() {

        let newobs = []
        random.forEach((ran, i) => {
            let r = Number(ran)
            let VA
            if (r < PXTrueRef.current.value) VA = 0
            else VA = 1
            newobs.push({ index: i + 1, ri: r, VA: VA })
        })
        setObservaciones(newobs)

    }

    function updateProps(e) {

        if (e.target.value > 1) {
            pxTrueRef.current.value = 1
        }
        let px = Number(pxTrueRef.current.value)

        pxFlaseRef.current.value = (1 - px).toFixed(2)
        PXTrueRef.current.value = px
        PXFalseRef.current.value = 1

        console.log(px)
    }

    return (
        <>
            {/*Info*/}
            <div className="p-8">
                <h1 className="text-4xl italic font-serif">Distribución Benoulli</h1>
                <p className="font-sans text-lg mt-2">
                    Una variable aleatoria Bernoulli <strong>X</strong> se define como el resultado 
                    numérico de una prueba Bernoulli con solamente dos posibles resultados
                    mutuamente excluyente denominados éxito (E) y fracaso (F).
                </p>
                <br />
                <hr />
            </div>
            <div className="flex flex-row width-full">
                <div className="w-1/3">
                    <RandomGenerator />
                </div>
                <div className="flex flex-col w-1/3 text-center text-sm">
                    <p className='text-center text-xl my-2 font-serif'>Probabilidades</p>
                    <table className="flex flex-col w-full">
                        <thead>
                            <tr className="flex w-full border">
                                <th className="w-full ">X</th>
                                <th className="w-full ">0</th>
                                <th className="w-full ">1</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="flex w-full h-10 items-center  border">
                                <th className="w-full">p(x)</th>
                                <td className="flex h-full w-full">
                                    <input
                                        ref={pxTrueRef}
                                        onChange={(e) => updateProps(e)}
                                        className="text-center focus:outline-none w-full h-full"
                                        onFocus={(e) => e.target.select()}
                                        placeholder="prob. de fracaso"
                                        type="number" />
                                </td>
                                <td className="flex h-full w-full">
                                    <input 
                                        ref={pxFlaseRef}
                                        className="text-center focus:outline-none w-full h-full"
                                        onFocus={(e) => e.target.select()}
                                        type="number" disabled />
                                </td>
                            </tr>
                            <tr className="flex w-full h-10 items-center  border">
                                <th className="w-full">P(X)</th>
                                <td className="flex h-full w-full">
                                    <input
                                        ref={PXTrueRef}
                                        className="text-center focus:outline-none w-full h-full"
                                        onFocus={(e) => e.target.select()}
                                        type="number" disabled />

                                </td>
                                <td className="flex h-full w-full">
                                    <input
                                        ref={PXFalseRef}
                                        className="text-center focus:outline-none w-full h-full"
                                        onFocus={(e) => e.target.select()}
                                        type="number" disabled />

                                </td>
                            </tr>
                            <tr className="flex flex-row">
                                <td className="flex h-full w-full">
                                    <button
                                        onClick={calculate}
                                        className='w-full p-2 font-bold text-white bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-200'>
                                        Calcular
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="w-1/3">
                    <p className='text-center text-xl my-2 font-serif'>Resultado</p>

                    {observaciones.length > 0 && <table className="w-full">
                        <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th>r<sub>i</sub></th>
                                <th>x<sub>i</sub></th>
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
                                    {(o.VA).toFixed(0)}
                                </td>
                            </tr>)}
                        </tbody>
                    </table>}

                </div>

            </div>
        </>
    )
}