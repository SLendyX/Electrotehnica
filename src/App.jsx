import { useState } from 'react'
import { labInputs } from './schema_lab'
import InputEl from './InputEl'
import Rezultate from './Rezultate'

function App() {
  const [lab, setLab] = useState("trgol")
  const [labArray, setLabArray] = useState({labInputs})

  const numberRegex = /[^0-9,. ]/g

  function selectChange(e){
    setLab(e.target.value)
  }

  function updateInputs(e){
    const value = e.target.value

    if(typeof value === "string" && value.match(numberRegex) !== null){
      return
    }

    const [category, name] = e.target.id.split("_")
    
    setLabArray(oldLabArray => {
      const updatedCategory = oldLabArray.labInputs[category].map(object => {
        if(object.name === name){
          if(typeof value !== "string")
            object.value = value
          else if(value.includes("."))
            object.value = Number(value)
          else
            object.value = value.split(",").map(string => {
              if(string !== "")
                return Number(string)
            })

        }

        return object
      })
      oldLabArray[category] = [...updatedCategory]

      return {...oldLabArray}
    })
    
  }

  const inputElArray = labArray.labInputs[lab].map(object =>{
    const {name, label, type, value} = object
    return <InputEl name={`${lab}_${name}`} label={label} type={type} value={value} onChange={updateInputs}/>
  })

  // console.log(labArray.labInputs[lab])

  return (
    <>
      <h1>Program calcul Electrotehnica</h1>
      <label for="lab">Alegeti un laborator:</label>
      <select onChange={selectChange} id="lab">
        <option value="trgol">Transformator - gol și scurtcircuit</option>
        <option value="monofaz">Monofazat în sarcină</option>
        <option value="asincr">Mașină asincronă funcţionare în sarcină, reglaj turaţie</option>
        <option value="sincr">Generator sincron funcţionând pe reţea proprie</option>
      </select>
      <br/><br/>
      <div className='input-container'>
        {...inputElArray}
        <Rezultate inputArray={labArray.labInputs[lab]}/>
      </div>

    </>
  )
}
export default App
