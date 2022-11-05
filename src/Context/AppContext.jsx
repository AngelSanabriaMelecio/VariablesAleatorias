import React, { useState, useContext } from "react"

const AppContext = React.createContext({})

export function useApp(){
    return useContext(AppContext)
}

export function AppProvider({ children }) {

    const [random, setRandom] = useState([])
    const [probs,setProbs] = useState([])

    return (
        <AppContext.Provider
            value={{
                random,
                setRandom,

                probs,setProbs,
            }}>
            {children}
        </AppContext.Provider>
    )
}