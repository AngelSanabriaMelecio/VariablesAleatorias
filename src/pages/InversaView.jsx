import React, { useEffect, useRef, useState } from "react";
import { RandomGenerator } from "../components/RandomGenerator";
import { useApp } from "../Context/AppContext";




export const InversaView = () => {
    
    const { random, setRandom, probs, setProbs } = useApp()
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

    const updateProbs = () => {
        let mark = []
        let newProps = []

        inputs.forEach((inp, i) => {
            let v = Number(inp.value)
            if (!mark.includes(v)) {
                mark.push(v)
            }
        })
        mark.sort(function (a, b) { return a - b; })

        //if( mark[0] === 0 )mark.splice(0,1)

        mark.forEach((dif, i) => {
            let px = 0
            inputs.forEach((inp, j) => {
                if (inp.value === dif) px++;
            })
            let newpx = px / inputs.length

            newProps.push({
                dif: dif,
                px: newpx,
                PX: newpx + (i && newProps[i - 1].PX)
            })


        })

        setProbs(newProps)
    }

    return (
        <div className='flex flex-row'>
            <div className='w-full lg:w-1/3'>
                <div>
                    <table className=' w-full'>
                        <thead>
                            <tr className='border' >
                                <th className="px-2">
                                    Dia
                                </th>
                                <th className="">
                                    Cantidad
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                inputs.map((inp, i) =>
                                    <tr className='border' key={'row' + i}>
                                        <td className='text-center'>
                                            {i + 1}
                                        </td>
                                        <td>
                                            <input
                                                onFocus={(e) => { handleFocus(i); e.target.select(); }}
                                                onChange={(e) => handleChange(Number(e.target.value), i)}
                                                value={inp.value}
                                                ref={lastRef}
                                                className='w-full focus:outline-none transition-opacity focus:bg-gray-200 text-center animate-none'
                                                type={'number'}
                                            />
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
                            Generar
                        </button>
                    </div>
                </div>

                <div className='w-full lg:w-full'>
                    <table className=' w-full'>
                        <thead>
                            <tr className='border' >
                                <th className="px-2">
                                    X
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
                                probs.map((p, i) =>
                                    <tr className='border' key={'row' + i}>
                                        <td className='text-center'>
                                            {p.dif}
                                        </td>
                                        <td className='text-center'>
                                            {(p.px).toFixed(4)}
                                        </td>
                                        <td className='text-center'>
                                            {(p.PX).toFixed(4)}
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>

            </div>
            <div className='w-full lg:w-1/3 '>
                <RandomGenerator />
            </div>
            <div className='w-full lg:w-1/3 '>
                <div>
                    <table className=' w-full'>
                        <thead>
                            <tr className='border'>
                                <th>Dia</th>
                                <th>r<sub>i</sub></th>
                                <th>Demanda <br /> Diaria</th>
                            </tr>
                        </thead>
                        <tbody>
                            {random.map((r, i) => <tr className='border' key={"A" + i}>
                                <td className='text-center'>
                                    {i + 1}
                                </td>
                                <td className='text-center'>
                                    {r}
                                </td>
                                <td className='text-center'>

                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}