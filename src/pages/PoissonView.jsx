import { list } from "postcss"
import React, { useEffect, useRef, useState } from "react"
import { RandomGenerator } from "../components/RandomGenerator"
import { useApp } from "../Context/AppContext"


export const PoissonView = () => {
    const mediaRef = useRef()

    const [observaciones, setObservaciones] = useState([])
    const [probs, setProbs] = useState([])
    const { random } = useApp()


    // useEffect(() => {
    //     mediaRef.current.value = 0;
    // }, [])

    const [inputs, setInputs] = useState([])
    const lastRef = useRef()


    useEffect(() => {
        let newInputs = [{ value: 0 }]
        setInputs(newInputs)
    }, [])

    const handleChange = (val, i) => {
        setInputs((prev) => prev.map((inp, index) => {
            if (i === index) return { value: val }
            return inp
        }))
    }

    const handleFocus = (index) => {
        if (index === inputs.length - 1) {
            let newInputs = [...inputs, { value: 0 }]
            setInputs(newInputs)
        }
    }
    const deleteInput = (index) => {
        if (index === 0 && inputs.length === 1) return
        let newInputs = [...inputs]
        newInputs.splice(index, 1)
        setInputs(newInputs)
    }

    function FACT(x){
        let ANS  = 1;
        for( let i=2; i<=x; i++ ) ANS *=i 
        return ANS 
    }

    function updateProbs() {    
        
        let u = mediaRef.current.value 
        if( !u || u==null ){alert('Debes Ingresar la media');return;}
        if( random.length === 0 ){alert('Debes generar Aleatorios');return;}

        let newProbs = []

        inputs.forEach((inp,i) => {
            let v = inp.value
    
            let p = (Math.pow( u,v )*( Math.exp(-u) ))/FACT(v)
            let P = p 
            if( newProbs.length > 0 ) P += newProbs[i-1].PX

            newProbs.push( { value:v, px:p, PX:P } )

        })

        setProbs(newProbs)

        let newobs = []
        random.forEach((ran, i) => {
            let r = Number(ran)
            let VA = 0

            for( let j=0; j<newProbs.length; j++ ){
                let pr = newProbs[j]
                let Li = 0
                if( j ) Li = newProbs[j-1].PX
                if( Li < r && pr.PX >= r ){
                    VA = pr.value
                    break
                }
            }
          
            newobs.push({ index: i + 1, ri: r, VA: VA })
        
        })
        setObservaciones(newobs)
    }

    return (
        <>
            {/*Info*/}
            <div className="p-8">
                <h1 className="text-4xl italic font-serif">Distribución Poisson</h1>
                <p className="font-sans text-lg mt-2">
                La distribución de Poisson es una distribución de probabilidad 
                discreta que expresa, a partir de una frecuencia de ocurrencia media, 
                la probabilidad de que ocurra un determinado número de eventos durante cierto período de tiempo.
                </p>
                <br />
                <hr />
            </div>

            <div className="flex flex-row width-full">
                <div className="w-1/3">
                    <p className='text-center text-xl my-2 font-serif'>Tiempo promedio</p>
                    <div className="flex flex-row">
                        <div className="flex w-full h-full flex-col border">
                            <input
                                onFocus={(e) => { e.target.select() }}
                                ref={mediaRef}
                                placeholder="Cantidad de tiempo"
                                className="w-full h-full text-center focus:outline-none transition-opacity focus:bg-gray-200" type="number" />
                        </div>
                        
                    </div>
                    <RandomGenerator />
                </div>
                <div className="flex flex-col w-1/3 text-center">
                    <p className='text-center text-xl my-2 font-serif'>Entradas</p>
                    <div>
                        <table className=' w-full'>
                            <thead>
                                <tr className='border' >
                                    <th className="px-2">
                                        x
                                    </th>
                                    <th className="">
                                        p(x)
                                    </th>
                                    <th className="">
                                        P(X)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    inputs.map((inp, i) =>
                                        <tr className='border' key={'row' + i}>
                                            <td className="flex flex-row justify-center">
                                                <input
                                                    onFocus={(e) => { handleFocus(i); e.target.select(); }}
                                                    onChange={(e) => handleChange(Number(e.target.value), i)}
                                                    value={inp.value}
                                                    ref={lastRef}
                                                    className='w-24 focus:outline-none transition-opacity focus:bg-gray-200 text-center animate-none'
                                                    type={'number'}
                                                />
                                            </td >
                                            <td className='text-center'>
                                                {probs[i]?.px.toFixed(4) }
                                            </td>
                                            <td className="text-center">
                                                {probs[i]?.PX.toFixed(4)}
                                            </td>
                                            <td >
                                                <button
                                                    className='w-full text-center px-2 hover:bg-gray-300 active:bg-gray-200'
                                                    onClick={() => deleteInput(i)}>
                                                    x
                                                </button>
                                            </td>
                                        </tr>
                                    )}

                            </tbody>
                        </table>
                        <div className='w-full'>
                            <button
                                onClick={updateProbs}
                                className='hover:bg-emerald-300 active:bg-emerald-200 py-1 text-white w-full bg-emerald-400'>
                                Calcular
                            </button>
                        </div>
                    </div>

                </div>
                <div className="w-1/3">
                    <p className="text-center text-xl my-2 font-serif">Resultado</p>
                    {observaciones.length > 0 && <table className="w-full">
                        <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th>r<sub>i</sub></th>
                                <th>Piezas/h</th>
                            </tr>
                        </thead>
                        <tbody>
                            {observaciones.map(o => <tr className="text-center border" key={'O' + o.index}>
                                <td>
                                    { o.index }
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