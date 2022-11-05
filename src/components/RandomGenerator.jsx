import { useRef, useState } from 'react';
import { useApp } from '../Context/AppContext'
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs'

export function RandomGenerator() {

    const [randomVisible, setRandomVisible] = useState(false)
    const { random, setRandom, probs, setProbs } = useApp()
    const diasRef = useRef()


    const generateRandom = () => {
        let v = diasRef.current.value
        let newRandom = []
        for (let i = 0; i < v; i++) {
            let n = Math.random().toFixed(4)
            let d = 0;
            for (let j = 0; j < probs.length; j++) {
                if (n <= probs[j].PX) {
                    d = probs[j].dif
                    break;
                }
            }
            newRandom.push(n)
        }
        setRandom(newRandom)
    }

    function handleChange(e){
        if( Number(e.target.value) > 9999 ){
            diasRef.current.value = 9999
        }
    }

    return (
        <>
            <div className='w-full'>
                <div className=' w-full'>
                    <div>
                        <div className='text-center text-xl my-2 font-serif'>Numeros Aleatorios </div>
                        <div className='border bg-emerald-100'>
                            <div className='flex flex-row'>
                                <input
                                    onFocus={(e)=>{e.target.select()}}
                                    onChange={(e)=>{handleChange(e)}}
                                    ref={diasRef}
                                    className="w-full focus:outline-none text-center" type="number" 
                                    placeholder="Cantidad"
                                    />
                                    
                                <button
                                    onClick={ ()=>{generateRandom(); setRandomVisible(true)} } 
                                    className='w-full p-1 font-bold text-white bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-200'>
                                    Generar
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div
                onClick={() => setRandomVisible(prev => !prev)}
                className='flex items-center justify-center h-7 cursor-pointer hover:bg-gray-200 border active:bg-gray-100'>
                {!randomVisible ? <BsChevronCompactDown /> : <BsChevronCompactUp />}
            </div>
            {randomVisible && <div className='flex flex-row flex-wrap'>
                {random.map((r, i) =>
                    <div key={'R' + i} className='w-1/4 text-center border border-radius'>
                        {r}
                    </div>)}
            </div>}

        </>
    )
}