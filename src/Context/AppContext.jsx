import React, { useState, useContext } from "react"

const AppContext = React.createContext({})

export function useApp(){
    return useContext(AppContext)
}

export function AppProvider({ children }) {

    const [page,setPage] = useState()

    const [random, setRandom] = useState([])
    const [probs,setProbs] = useState([])

    return (
        <AppContext.Provider
            value={{
                random,
                setRandom,

                probs,setProbs,
                page,setPage,
            }}>
            {children}
        </AppContext.Provider>
    )
}