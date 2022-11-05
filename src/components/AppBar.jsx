
import React from "react";
import { useApp } from "../Context/AppContext";

export const AppBar = () => {

    const {page,setPage} = useApp()

    function CustomLink({ href, children, ...props }) {
    
        const path = window.location.pathname
        let activeStyle = ''
    
        if (page === href) activeStyle = 'bg-emerald-600'
        return (
            <button
                onClick={ ()=>setPage(href) }
                className={`px-6 text-white hover:bg-emerald-500 h-full items-center justify-center flex ${activeStyle}`}
            >
                {children}
            </button>
        )
    }

    return (
        <div className="flex flex-row bg-emerald-400 h-10 items-center w-full" >

            <CustomLink href={'Home'}>
                <p className="font-serif text-2xl">H<sup>p</sup></p> 
            </CustomLink >
            <CustomLink href={'Uniforme'}>
                Unifor
            </CustomLink >
            <CustomLink href={'Exponencial'}>
                Exponencial
            </CustomLink >
            <CustomLink href={'Bernoulli'}>
                Bernoulli
            </CustomLink >
            <CustomLink href={'Poisson'}>
                Poisson
            </CustomLink >
        </div>
    )
}
