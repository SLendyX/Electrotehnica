import React from "react";

export default function({label, name, type, value=0, onChange=() => {}}){
    return (
        <>
            <label htmlFor={name}>
                {label}
            </label>
            <input id={name} placeholder={name} type={type} value={value} onChange={onChange}
            />
        </>
    )
}