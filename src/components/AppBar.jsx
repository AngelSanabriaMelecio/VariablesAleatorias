
import React from "react";

export const AppBar = () => {
    return (
        <div className="flex flex-row bg-emerald-400 h-10 items-center w-full" >

            <CustomLink href={'/home'}>
                <p className="font-serif text-2xl">H<sup>p</sup></p> 
            </CustomLink >
            <CustomLink href={'/uniforme'}>
                Unifor
            </CustomLink >
            <CustomLink href={'/Exponencial'}>
                Exponencial
            </CustomLink >
            <CustomLink href={'/Bernoulli'}>
                Bernoulli
            </CustomLink >
            <CustomLink href={'/Poisson'}>
                Poisson
            </CustomLink >
        </div>
    )
}
function CustomLink({ href, children, ...props }) {
    const path = window.location.pathname
    let activeStyle = ''

    console.log( path,href )

    if (path === href) activeStyle = 'bg-emerald-600'
    return (
        <a
            href={href}
            className={`px-6 text-white hover:bg-emerald-500 h-full items-center justify-center flex ${activeStyle}`}
        >
            {children}
        </a>
    )
}