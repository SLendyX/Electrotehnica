import React from "react";

export default function({label, name, type}){
    return (
        <>
            <label>
                {label}
                <input id={name} placeholder={name} type={type}/>
            </label>
        </>
    )
}